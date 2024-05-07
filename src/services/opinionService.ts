import { config } from '../config/config';
import { opinionCarModel, opinionBrandModel } from '../models/opinion.model';
import { CryptoService, CustomerService, CarService } from '../services';
import { Utils } from '../utils/utils';

export class OpinionService {
  public conf = config;
  public sum = {
    car: {
      inside: 0,
      outside: 0,
      confort: 0,
      safety: 0,
      consumption: 0,
      durability: 0,
      worth: 0,
      average: 0
    },
    brand: {
      services: 0,
      people: 0,
      prices: 0,
      credibility: 0,
      satisfaction: 0,
      average: 0
    }
  }

  constructor(
    private cryptoService: CryptoService,
    private customerService: CustomerService,
    private carService: CarService,
    private utils: Utils,
  ) { }

  public clearSum() {
    for (const key of Object.keys(this.sum.car)) {
      this.sum.car[key] = 0
    }

    for (const key of Object.keys(this.sum.brand)) {
      this.sum.brand[key] = 0
    }
  }

  // BRAND ---------------------------------------------------
  public async getBrandOpinions(filter?: any, resumed?: boolean, sorted?: any, myPagination?: any): Promise<any> {
    let myFilter = filter ? this.utils.convertIdToObjectId(filter) : {};
    
    let mySort = sorted ? sorted : { _id: 'desc' };
    let res;
    const offset = myPagination && myPagination.page ? (myPagination.page - 1) * myPagination.perpage : 0;
    const pageSize = myPagination && myPagination.page ? myPagination.perpage : null;

    try {
      res = await opinionBrandModel.find(myFilter).sort(mySort).skip(offset).limit(pageSize);
    } catch (error) {
      Promise.reject({ statusCode: 404 });
    }

    this.clearSum();

    const brandKeys = Object.keys(this.sum.brand);
    const showBrandAverages = myFilter['brand._id'];
    let filteredItems: any[] = [];
    
    for (const item of res) {
      if (!showBrandAverages) {
        await this.carService.getBrands({ _id: item.brand }).then(brand => {
          if (brand[0]) {
            item.brand = brand[0];
          }
        }); 
      }

      if (showBrandAverages) {
        for (let i = 0; i < brandKeys.length; i++) {
          this.sum.brand[brandKeys[i]] += item[`brand_val_${brandKeys[i]}`];
        }
      }

      if (resumed) {
        const {_id, brand_val_average, active, created, created_by, modified, modified_by } = item;
        filteredItems.push({_id, brand_val_average, active, created, created_by, modified, modified_by });
      } 
    }
  
    const qtd = res.length;
    const response = {
      opinions: resumed ? filteredItems : res,
      qtd: qtd
    }

    if (showBrandAverages) {
      for (let i = 0; i < brandKeys.length; i++) {
        this.sum.brand[brandKeys[i]] = parseFloat((this.sum.brand[brandKeys[i]] / qtd).toFixed(20));
      }

      response['averages'] = this.sum.brand;
      response['brand'] = res[0].brand;
    }

    return Promise.resolve(response);
  }

  public async setBrandOpinions(req: any, id?: string): Promise<Object> {
    let exists = id ? await this.getBrandOpinions({ _id: id }) : null;

    if (id && !exists) {
      return Promise.reject({ statusCode: 404 });
    }

    try {
      req.body.data = this.cryptoService.decodeJwt(req.body.data);
    } catch (error) {
      return Promise.reject({ statusCode: 401 });
    }

    let res = {};

    const dataReq = await this.setBrandDataPayload(req);
    req = dataReq;
    let operation;

    if (exists) {
      const currentStatus = exists.opinions[0]['active'];
      const newStatus = req.body.data['active'];
      const modifiedPost = this.customerService.setCreatedAndModifierUser(req, exists);
      res['saved'] = await opinionBrandModel.findByIdAndUpdate({ _id: id }, modifiedPost, { new: true });

      if (newStatus !== currentStatus) {
        operation = currentStatus === false ? 'set' : 'delete';
      }
    } else {
      const createdPost = this.customerService.setCreatedAndModifierUser(req, exists, opinionBrandModel);
      res['saved'] = await createdPost.save();
      operation = 'set';
    }

    const currentOpinions = await this.getBrandOpinions({ ['brand._id']: res['saved']['brand']['_id'] }, true);
    this.carService.updateBrandAverage(res['saved'], operation, currentOpinions);

    // if (req.user && req.user['role'] && req.user['role'].level < 2) {
    //   const result = await this.getBrandOpinions();
    //   res['opinions'] = result['opinions'];
    // }

    return Promise.resolve(res);
  }

  public async deleteBrandOpinion(id: string): Promise<Object> {
    let res = {};
    res['removed'] = await opinionBrandModel.findByIdAndDelete({ _id: id });
    this.carService.updateBrandAverage(res['removed'], 'delete');
    const result = await this.getBrandOpinions();
    res['opinions'] = result['opinions'];

    return res
      ? Promise.resolve(res)
      : Promise.reject({ statusCode: 404 });
  }

  // MODEL ---------------------------------------------------
  public async getModelOpinions(filter?: any, resumed?: boolean, sorted?: any, myPagination?: any): Promise<any> {
    let myFilter = filter ? this.utils.convertIdToObjectId(filter) : {};
    let mySort = sorted ? sorted : { _id: 'desc' };
    let res;
    const offset = myPagination && myPagination.page ? (myPagination.page - 1) * myPagination.perpage : 0;
    const pageSize = myPagination && myPagination.page ? myPagination.perpage : null;

    try {
      res = await opinionCarModel.find(myFilter).sort(mySort).skip(offset).limit(pageSize);
    } catch (error) {
      Promise.reject({ statusCode: 404 });
    }

    this.clearSum();

    const carKeys = Object.keys(this.sum.car);
    const showCarAverages = myFilter['brand._id'] && myFilter['model._id'];
    let filteredItems: any[] = [];
    
    for (const item of res) {
      if (showCarAverages) {
        for (let i = 0; i < carKeys.length; i++) {
          this.sum.car[carKeys[i]] += item[`car_val_${carKeys[i]}`];
        }
      }

      if (resumed) {
        const {_id, model, car_val_average, active, created, created_by, modified, modified_by } = item;
        filteredItems.push({_id, model, car_val_average, active, created, created_by, modified, modified_by });
      }
    }
  
    const qtd = res.length;
    const response = {
      opinions: resumed ? filteredItems : res,
      qtd: qtd
    }

    if (showCarAverages) {
      for (let i = 0; i < carKeys.length; i++) {
        this.sum.car[carKeys[i]] = parseFloat((this.sum.car[carKeys[i]] / qtd).toFixed(20));
      }

      response['averages'] = this.sum.car;
      // response['model'] = {...res[0].model, ...res[0].brand};
    }

    return Promise.resolve(response);
  }

  public async setModelOpinions(req: any, id?: string): Promise<Object> {
    let exists = id ? await this.getModelOpinions({ _id: id }) : null;

    if (id && !exists) {
      return Promise.reject({ statusCode: 404 });
    }

    try {
      req.body.data = this.cryptoService.decodeJwt(req.body.data);
    } catch (error) {
      return Promise.reject({ statusCode: 401 });
    }

    let res = {};

    const dataReq = await this.setModelDataPayload(req);
    req = dataReq;
    let operation;

    if (exists) {
      const currentStatus = exists.opinions[0]['active'];
      const newStatus = req.body.data['active'];
      const modifiedPost = this.customerService.setCreatedAndModifierUser(req, exists);
      res['saved'] = await opinionCarModel.findByIdAndUpdate({ _id: id }, modifiedPost, { new: true });

      if (newStatus !== currentStatus) {
        operation = currentStatus === false ? 'set' : 'delete';
      }
    } else {
      const createdPost = this.customerService.setCreatedAndModifierUser(req, exists, opinionCarModel);
      res['saved'] = await createdPost.save();
      operation = 'set';
    }

    const currentOpinions = await this.getModelOpinions({ ['model._id']: res['saved']['model']['_id'] }, true);
    this.carService.updateModelAverage(res['saved'], operation, currentOpinions);

    // if (req.user && req.user['role'] && req.user['role'].level < 2) {
    //   const result = await this.getModelOpinions();
    //   res['opinions'] = result['opinions'];
    // }

    return Promise.resolve(res);
  }

  public async deleteModelOpinion(id: string): Promise<Object> {
    let res = {};
    res['removed'] = await opinionCarModel.findByIdAndDelete({ _id: id });
    this.carService.updateModelAverage(res['removed'], 'delete');
    const result = await this.getModelOpinions();
    res['opinions'] = result['opinions'];

    return res
      ? Promise.resolve(res)
      : Promise.reject({ statusCode: 404 });
  }

  public async setBrandDataPayload(req) {
    const brand = req.body.data.aboutBrand;
    const user = req.body.data.userInfo;
    let customerId;

    if (req.isAuthenticated()) {
      customerId = req.user.id;
    } else {
      let foundUser;

      await this.customerService.getCustomers({ email: user.email }, true).then(user => {
        if (user[0]) {
          foundUser = user[0];
        }
      });

      if (foundUser) {
        customerId = foundUser['id'];
      } else {
        let newUserPayload = await this.setNewUserPayload(user); 
        const createdUser = await this.customerService.setCustomer(newUserPayload);

        customerId = createdUser['saved']['_id'];
      }

      req['user'] = {
        id: customerId
      }
    }

    const payload = {
      brand: brand.carBrand,
      brand_title: brand.finalWords.title,
      brand_positive: brand.finalWords.positive,
      brand_negative: brand.finalWords.negative,
      active: req.body.data.active,
    }

    if (brand.valuation) {
      const brandAverage = this.getAverage(brand.valuation);
      for (const key of Object.keys(this.sum.brand)) {
        payload[`brand_val_${key}`] = key === 'average'
          ? brandAverage
          : brand.valuation[key];
      }
    }

    req.body.data = payload;
    return req;
  }

  public async setModelDataPayload(req) {
    const car = req.body.data.aboutCar;
    const user = req.body.data.userInfo;
    let customerId;

    if (req.isAuthenticated()) {
      customerId = req.user.id;
    } else {
      let foundUser;

      await this.customerService.getCustomers({ email: user.email }, true).then(user => {
        if (user[0]) {
          foundUser = user[0];
        }
      });

      if (foundUser) {
        customerId = foundUser['id'];
      } else {
        let newUserPayload = await this.setNewUserPayload(user); 
        const createdUser = await this.customerService.setCustomer(newUserPayload);

        customerId = createdUser['saved']['_id'];
      }

      req['user'] = {
        id: customerId
      }
    }

    const payload = {
      brand: car.carBrand,
      model: car.carModel,
      year_model: car.yearModel,
      version: car.carVersion,
      year_bought: car.yearBought,
      kept_period: car.keptPeriod,
      km_bought: car.kmBought,
      car_title: car.finalWords.title,
      car_positive: car.finalWords.positive,
      car_negative: car.finalWords.negative,
      active: req.body.data.active,
    }

    if (car.valuation) {
      const carAverage = this.getAverage(car.valuation);
      for (const key of Object.keys(this.sum.car)) {
        payload[`car_val_${key}`] = key === 'average'
          ? carAverage
          : car.valuation[key];
      }
    }

    req.body.data = payload;
    return req;
  }

  public async setNewUserPayload(user) {
    const randomPassword = this.cryptoService.randomPasswordGenerator();
    // console.log('password gerado: '+randomPassword); senha aleatoria
    let roleId;
    
    await this.customerService.getRoles({ level: 3 }).then(role => {
      if (role[0]) {
        roleId = role[0]['_id'];
      }
    });

    const data = {
      name: user.name,
      email: user.email,
      role: roleId,
      password: randomPassword,
      active: true
    };

    const encodedData = this.cryptoService.encondeJwt(data);

    const payload = {
      body: {
        data: encodedData
      },
      user: {
        id: 'itself'
      }
    };

    return payload;
  }

  public getAverage(data: object): number {
    const values = Object.values(data);
    let sum = 0;

    for (const value of values) {
      sum += value;
    }

    return sum / values.length;
  }

}