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

    public async returnBestModels(req: Request, res: Response) {    
        try {
          const responseService = await this.bestService.getBestModels();
          return this.success(res, { bestModels: responseService });
        } catch (error) {
          this.uDate.timeConsoleLog('Erro ao chamar a api', error);
          return this.errorHandler(error, res);
        }
      }

}