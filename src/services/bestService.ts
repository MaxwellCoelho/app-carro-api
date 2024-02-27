import { Request } from 'express'
import { CarService } from '../services';

export class BestService {

    constructor(
        private carService: CarService,
      ) { }

    public async getBestModels(req: Request): Promise<any> {
        let sort = { average: 'desc' };
        let pagination = {};

        if (req.query['page'] && req.query['perpage']) {
            pagination = {
                page: Number(req.query['page']),
                perpage: Number(req.query['perpage'])
            }
        }

        return await this.carService.getModels(null, true, sort, pagination);
    }
}