import { Response } from 'express';
import { config } from '../config/config';
import { CryptoService, CustomerService } from '../services';

export class AuthService {
  public conf = config;

  constructor(
    private cryptoService: CryptoService,
    private customerService: CustomerService,
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

    const authenticated = this.cryptoService.checkPassword(authData.password, res[0].password);
    if (authenticated) {
      delete res[0]._doc.password;
      authorized = res[0];
    }

    return Promise.resolve(authorized);
  }
}