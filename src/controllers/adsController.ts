import { Request, Response } from 'express';
import { AdsService, CryptoService } from '../services';

import { ResponseModule } from '../architecture/responseModule';
import { config } from '../config/config';

import { UDate, Utils } from '../utils';

export class AdsController extends ResponseModule {
  private conf = config;

  constructor(
      private adsService: AdsService,
      public cryptoService: CryptoService,
      private uDate: UDate,
      private utils: Utils,
    ) {
      super();
  }

  public async returnAds(req: Request, res: Response) {
    const id: string = req.params.id;
    let myFilter = id ? { _id: id } : {};

    try {
      const responseService = await this.adsService.getAds(myFilter);
      return this.success(res, responseService);
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.errorHandler(error, res);
    }
  }

  public async returnFilteredAds(req: Request, res: Response) { 
    try {
      req.body.data = this.cryptoService.decodeJwt(req.body.data);
    } catch (error) {
      return Promise.reject({ statusCode: 401 });
    }

    let myFilter = req.body.data;
    let mySort = this.utils.returnSortObject(req);
    let pagination = this.utils.returnPaginationObject(req);

    try {
      const responseService = await this.adsService.getAds(myFilter, mySort, pagination);
      return this.success(res, responseService);
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.errorHandler(error, res);
    }
  }

  public async saveAd(req: Request, res: Response) {
    const id: string = req.params.id;

    try {
      const responseService = await this.adsService.setAd(req, id);
      return this.success(res, responseService);
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.errorHandler(error, res);
    }
  }

  public async removeAd(req: Request, res: Response) {
    // if (!req.isAuthenticated() || (req.isAuthenticated() && req.user['role'].level > 1)) {
    //   return this.unauthorized(res);
    // }

    const id: string = req.params.id;

    try {
      const responseService = await this.adsService.deleteAd(id);
      return this.success(res, responseService);
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.errorHandler(error, res);
    }
  }
  
}
