import { Request, Response } from 'express';
import { AuthService, CryptoService } from '../services';

import { ResponseModule } from '../architecture/responseModule';
import { config } from '../config/config';

import { UDate } from '../utils/udate';

export class AuthController extends ResponseModule {
  private conf = config;

  constructor(
      private authService: AuthService,
      public cryptoService: CryptoService,
      private uDate: UDate,
    ) {
      super();
  }

  public authUser(req: Request, res: Response) {
    let authData;

    try {
        authData = this.cryptoService.decodeJwt(req.body.authData);
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.unauthorized(res);
    }

    try {
      const responseService = this.authService.authUser(authData);
      const responseModel = {
        "message": responseService,
        "statusCode": 200
      }
      
      return this.success(res, responseModel);

    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.internalServerError(res);
    }
  }
  
}