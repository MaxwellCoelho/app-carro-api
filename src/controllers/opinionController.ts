import { Request, Response } from 'express';
import { OpinionService, CryptoService } from '../services';

import { ResponseModule } from '../architecture/responseModule';
import { config } from '../config/config';

import { UDate } from '../utils/udate';

export class OpinionController extends ResponseModule {
  private conf = config;

  constructor(
      private opinionService: OpinionService,
      public cryptoService: CryptoService,
      private uDate: UDate,
    ) {
      super();
  }

  public async returnOpinion(req: Request, res: Response) {
    const brand: string = req.params.brand;
    const car: string = req.params.car;
    let myFilter = {};
    let pagination = {};

    if (req.query['page'] && req.query['perpage']) {
      pagination = {
          page: Number(req.query['page']),
          perpage: Number(req.query['perpage'])
      }
    }  

    if (brand) { myFilter['brand'] = brand; }
    if (brand && car) { myFilter['model'] = car; }

    try {
      const responseService = await this.opinionService.getOpinions(myFilter, false, null, pagination);
      return this.success(res, responseService);
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.errorHandler(error, res);
    }
  }

  public async saveOpinion(req: Request, res: Response) {
    // if (!req.isAuthenticated()) {
    //   return this.unauthorized(res);
    // }

    const id: string = req.params.id;

    try {
      const responseService = await this.opinionService.setOpinions(req, id);
      return this.success(res, responseService);
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.errorHandler(error, res);
    }
  }

  public async removeOpinion(req: Request, res: Response) {
    // if (!req.isAuthenticated() || (req.isAuthenticated() && req.user['role'].level > 1)) {
    //   return this.unauthorized(res);
    // }

    const id: string = req.params.id;

    try {
      const responseService = await this.opinionService.deleteOpinion(id);
      return this.success(res, responseService);
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.errorHandler(error, res);
    }
  }
  
}
