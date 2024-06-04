import * as crypto from 'crypto'; 
import { config } from '../config/config';
import { CryptoService, CustomerService } from '../services';
import { customerModel } from '../models/customer.model';
import Mail from '../architecture/mailerModule';

export class AuthService {
  public conf = config;

  constructor(
    private cryptoService: CryptoService,
    private customerService: CustomerService
  ) { }

  public async authUser(authData: any) {
    const filter = { email: authData.email };
    let res;

    try {
      res = await this.customerService.getCustomers(filter);
    } catch (err) {
      return Promise.reject({ statusCode: 401 });
    }

    let authorized;

    const authenticated = res.length ? this.cryptoService.checkPassword(authData.password, res[0].password) : false;
    if (authenticated) {
      authorized = this.resumedAuthorized(res[0]);
    }

    return Promise.resolve(authorized);
  }

  public resumedAuthorized(res: any): any {
    return {
      _id: res['_id'],
      name: res['name'],
      email: res['email'],
      favorites: res['favorites'],
      active: res['active'],
      created: res['created'],
      role: {
        _id: res['role']['_id'],
        name: res['role']['name'],
        level: res['role']['level'],
      }
    };
  }

  public async forgotPassword(email: string) {
    const filter = { email: email };
    let res;

    try {
      res = await this.customerService.getCustomers(filter);
    } catch (err) {
      return Promise.reject({ statusCode: 401 });
    }

    if (!res.length) {
      return Promise.reject({ statusCode: 404 });
    }

    try {
      const token = crypto.randomBytes(20).toString('hex');
      const now = new Date();
      now.setHours(now.getHours() + 1);
      const modifiedPost = {
        password_reset_token: token,
        password_reset_expires: now
      }

      await customerModel.findByIdAndUpdate({ _id: res[0]._id }, modifiedPost, { new: true });

      Mail.to = email;
      Mail.subject = 'Solicitação de recuperação de senha';
      Mail.message = `
        <img src="https://krro.com.br/assets/krro.png" alt="Krro.com.br"  width="100">
        <hr>
        <p>Recebemos uma solicitação de recuperação de senha para o seu email.</p>
        <p>Clique no link abaixo para redefinir sua senha. Caso você não tenha solicitado, basta ignorar esse email.</p>
        <p><a href="https://krro.com.br/recuperar-senha?token=${token}" target="_blank"></a>https://krro.com.br/recuperar-senha?token=${token}</p>
        <p>Este email foi gerado automaticamente, favor não responder.</p>
      `;

      let result = Mail.sendMail();

      Promise.resolve(result);
    } catch (err) {
      return Promise.reject({ statusCode: 400 });
    }
  }

  public async resetPassword(data: any) {
    const filter = { password_reset_token: data['token'] };
    let res;

    try {
      res = await this.customerService.getCustomers(filter);
    } catch (err) {
      return Promise.reject({ statusCode: 401 });
    }

    if (!res.length) {
      return Promise.reject({ statusCode: 404 });
    }

    const now = new Date();
    if (now > res['password_reset_expires']) {
      return Promise.reject({ statusCode: 401 });
    }

    try {
      const modifiedPost = {
        password: this.cryptoService.encriptPassword(data['password']),
        password_reset_token: null,
        password_reset_expires: null
      }

      await customerModel.findByIdAndUpdate({ _id: res[0]._id }, modifiedPost, { new: true });

      Promise.resolve();
    } catch (err) {
      return Promise.reject({ statusCode: 400 });
    }
  }
}