import { Request } from 'express'
import { CarService } from '../services';

export class BestService {

    constructor(
        private carService: CarService,
      ) { }

    public async getBestModels(pagination: any): Promise<any> {
        let myFilter = { review: false, active: true, val_length: { $gt: 0 } };
        let mySort = { average: 'desc', _id: 'desc' };
        let res;

        try {
            res = await this.carService.getModels(myFilter, true, mySort, pagination);
        } catch (error) {
            return Promise.reject({ statusCode: 401 });
        }

        return Promise.resolve(res);
    }
}