import { Request } from 'express'
import { CarService } from '../services';

export class BestService {

    constructor(
        private carService: CarService,
      ) { }

    public async getBestModels(pagination: any): Promise<any> {
        let sort = { average: 'desc' };
        let res;

        try {
            res = await this.carService.getModels(null, true, sort, pagination);
        } catch (error) {
            return Promise.reject({ statusCode: 401 });
        }

        return Promise.resolve(res);
    }
}