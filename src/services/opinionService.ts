import { config } from '../config/config';
import { opinionModel } from '../models/opinion.model';
import { CryptoService, CustomerService, CarService } from '../services';
import { UDate } from '../utils';

export class OpinionService {
  public conf = config;

  constructor(
    private cryptoService: CryptoService,
    private customerService: CustomerService,
    private carService: CarService,
    private uDate: UDate,
  ) { }

  public async getOpinions(filter?: any, resumed?: boolean): Promise<any> {
    let myFilter = filter ? filter : {};
    let res;
    
    try {
      res = await opinionModel.find(myFilter);
    } catch (error) {
      Promise.reject({ statusCode: 404 });
    }

    for (const item of res) {
      await this.customerService.getCustomers({ _id: item.customer }, true).then(user => {
        if (user[0]) {
          item.customer = user[0];
        }
      });

      await this.carService.getModels(item.model).then(model => {
        if (model[0]) {
          item.model = model[0];
        }
      }); 

      await this.carService.getBrands(item.model.brand).then(brand => {
        if (brand[0]) {
          item.model.brand = brand[0];
        }
      });

      await this.carService.getCategories(item.model.category).then(category => {
        if (category[0]) {
          item.model.category = category[0];
        }
      });
    }

    return this.customerService.returnWithCreatedAndModifierUser(res);
  }

  public async setOpinions(req: any, id?: string): Promise<Object> {
    let exists = id ? await this.getOpinions(id) : null;

    if (id && !exists) {
      return Promise.reject({ statusCode: 404 });
    }

    try {
      req.body.data = this.cryptoService.decodeJwt(req.body.data);
    } catch (error) {
      return Promise.reject({ statusCode: 401 });
    }

    let res = {};

    if (exists) {
      const modifiedPost = this.customerService.setCreatedAndModifierUser(req, exists);
      res['saved'] = await opinionModel.findByIdAndUpdate({ _id: id }, modifiedPost, { new: true }).then(savedPost => savedPost);
    } else {
      const createdPost = this.customerService.setCreatedAndModifierUser(req, exists, opinionModel);
      res['saved'] = await createdPost.save().then(savedPost => savedPost);
    }

    res['opinions'] = await this.getOpinions();

    return Promise.resolve(res);
  }

  public async deleteOpinion(id: string): Promise<Object> {
    let res = {};
    res['removed'] = await opinionModel.findByIdAndDelete({ _id: id }).then(savedPost => savedPost);
    res['opinions'] = await this.getOpinions();

    return res
      ? Promise.resolve(res)
      : Promise.reject({ statusCode: 404 });
  }

}