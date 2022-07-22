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
    const id: string = req.params.id;

    try {
      const responseService = await this.opinionService.getOpinions(id);
      return this.success(res, { opinions: responseService });
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
