import { Request, Response } from 'express'
import { ResponseModule } from "../architecture/responseModule";
import { BestService, CryptoService } from '../services';

import { UDate, Utils } from '../utils';


export class BestController extends ResponseModule {

    constructor(
        private bestService: BestService,
        private uDate: UDate,
        private utils: Utils,
        public cryptoService: CryptoService,
      ) {
        super();
    }

    public async returnBestModels(req: Request, res: Response) { 
      let pagination = this.utils.returnPaginationObject(req);

      try {
        const responseService = await this.bestService.getBestModels(pagination);
        return this.success(res, { bestModels: responseService });
      } catch (error) {
        this.uDate.timeConsoleLog('Erro ao chamar a api', error);
        return this.errorHandler(error, res);
      }
    }

    public async returnFilteredBestModels(req: Request, res: Response) { 
      try {
        req.body.data = this.cryptoService.decodeJwt(req.body.data);
      } catch (error) {
        return Promise.reject({ statusCode: 401 });
      }
  
      let myFilter = req.body.data;
      let pagination = this.utils.returnPaginationObject(req);
  
      try {
        const responseService = await this.bestService.getBestModels(pagination, myFilter);
        return this.success(res, { bestModels: responseService });
      } catch (error) {
        this.uDate.timeConsoleLog('Erro ao chamar a api', error);
        return this.errorHandler(error, res);
      }
    }

}