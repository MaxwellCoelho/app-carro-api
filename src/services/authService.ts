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
      authorized = this.resumedAuthorized(res[0]);
    }

    return Promise.resolve(authorized);
  }

  public resumedAuthorized(res: any): any {
    return {
      _id: res['_id'],
      name: res['name'],
      email: res['email'],
      active: res['active'],
      created: res['created'],
      role: {
        _id: res['role']['_id'],
        name: res['role']['name'],
        level: res['role']['level'],
      }
    };
  }
}