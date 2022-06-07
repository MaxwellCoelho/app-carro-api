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
    const res = await this.customerService.getCustomers(filter);
    let authorized;

    const authenticated = this.cryptoService.checkPassword(authData.password, res[0].password);
    if (authenticated) {
      authorized = res[0];
    }

    return Promise.resolve(authorized);
  }
}