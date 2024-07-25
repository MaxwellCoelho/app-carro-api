import { Request, Response } from 'express'
import { ResponseModule } from "../architecture/responseModule";
import { BestService, CryptoService } from '../services';

import { UDate } from '../utils/udate';


export class BestController extends ResponseModule {

    constructor(
        private bestService: BestService,
        private uDate: UDate,
        public cryptoService: CryptoService,
      ) {
        super();
    }

    public async returnBestModels(req: Request, res: Response) { 
      let pagination = {}; 
      if (req.query['page'] && req.query['perpage']) {
        pagination = {
            page: Number(req.query['page']),
            perpage: Number(req.query['perpage'])
        }
      }  

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
      let pagination = {}; 
      if (req.query['page'] && req.query['perpage']) {
        pagination = {
            page: Number(req.query['page']),
            perpage: Number(req.query['perpage'])
        }
      } 
  
      try {
        const responseService = await this.bestService.getBestModels(pagination, myFilter);
        return this.success(res, { bestModels: responseService });
      } catch (error) {
        this.uDate.timeConsoleLog('Erro ao chamar a api', error);
        return this.errorHandler(error, res);
      }
    }

}