import { Request } from 'express'
import { CarService } from '../services';
import { Utils } from '../utils/utils';

export class BestService {

    constructor(
        private carService: CarService,
        private utils: Utils
      ) { }

    public async getBestModels(pagination: any, filter?: any): Promise<any> {
        let apiFilter = filter ? this.utils.convertIdToObjectId(filter) : {};
        let myFilter = { review: false, active: true, val_length: { $gt: 0 }, ...apiFilter };
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