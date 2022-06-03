import { config } from '../config/config';
import { customerModel } from '../models/customer.model';
import { CryptoService } from '../services';

export class AuthService {
  public conf = config;

  constructor(
    private cryptoService: CryptoService,
  ) { }

  public async authUser(authData: any) {
    const filter = { email: authData.email };
    const res = await customerModel.find(filter).then(entries => entries);

    for (const item of res) {
        const authenticated = this.cryptoService.checkPassword(authData.password, item.password);
        console.log('autenticou: ', authenticated) ;   
    }
  }
}