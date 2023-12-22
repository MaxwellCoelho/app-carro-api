import { Request, Response } from 'express'
import { ResponseModule } from "../architecture/responseModule";
import { BestService } from '../services';

import { UDate } from '../utils/udate';


export class BestController extends ResponseModule {

    constructor(
        private bestService: BestService,
        private uDate: UDate
      ) {
        super();
    }

    public async returnBest(req: Request, res: Response) {    
        try {
          const responseService = await this.bestService.getBest();
          return this.success(res, responseService);
        } catch (error) {
          this.uDate.timeConsoleLog('Erro ao chamar a api', error);
          return this.errorHandler(error, res);
        }
      }

}