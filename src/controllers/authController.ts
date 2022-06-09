import { NextFunction } from 'express';
import { Request, Response } from 'express';
import * as passport from 'passport'; 
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

  public async authUser(req: Request, res: Response, next: NextFunction) {
    let authData;
    let authorized;

    try {
        authData = this.cryptoService.decodeJwt(req.body.authData);
        authorized = await this.authService.authUser(authData); 
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.notFound(res);
    }
  
    if (!authorized) {
      return this.notFound(res);
    }

    if (authorized && !authorized.active) {
      return this.unauthorized(res);
    }

    passport.authenticate('local', () => {
      req.login(authorized, (err) => {
        if (err) { throw err; }
        
        return this.success(res, { authorized: authorized });
      })
    })(req, res, next)
  }

  public async logoutUser(req: Request, res: Response, next: NextFunction) {
    req.logOut((err) => {
      if (err) { throw err; }
        
      req['session'].destroy(() => {
        res.clearCookie('connect.sid');
        return this.success(res, { message: 'logged out'});
      });
    });

   
  }

  public async meUser(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
      return this.success(res, { authorized: req.user });
    } else {
      return this.unauthorized(res);
    }
  }
  
}