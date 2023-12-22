import { config } from '../config/config';
import { opinionModel } from '../models/opinion.model';
import { CryptoService, CustomerService, CarService } from '../services';
import { UDate } from '../utils';

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
    private uDate: UDate,
  ) { }

  public clearSum() {
    for (const key of Object.keys(this.sum.car)) {
      this.sum.car[key] = 0
    }

    for (const key of Object.keys(this.sum.brand)) {
      this.sum.brand[key] = 0
    }
  }

  public async getOpinions(filter?: any, resumed?: boolean): Promise<any> {
    let myFilter = filter ? filter : {};
    let res;
    
    try {
      res = await opinionModel.find(myFilter);
    } catch (error) {
      Promise.reject({ statusCode: 404 });
    }

    this.clearSum();

    const carKeys = Object.keys(this.sum.car);
    const brandKeys = Object.keys(this.sum.brand);
    const showCarAverages = myFilter.brand && myFilter.model;
    const showBrandAverages = myFilter.brand && !myFilter.model;
    const carModel = showCarAverages ? await this.carService.getModels({ _id: myFilter.model }) : [];
    const carBrand = showBrandAverages ? await this.carService.getBrands({ _id: myFilter.brand }) : [];
    let filteredItems: any[] = [];

    for (const item of res) {
      if (!resumed) {
        await this.customerService.getCustomers({ _id: item.customer }, true).then(user => {
          if (user[0]) {
            item.customer = user[0];
          }
        });
      }

      if (!showCarAverages && !showBrandAverages) {
        await this.carService.getModels({ _id: item.model }).then(model => {
          if (model[0]) {
            item.model = model[0];
          }
        }); 
      }

      if (showCarAverages) {
        for (let i = 0; i < carKeys.length; i++) {
          this.sum.car[carKeys[i]] += item[`car_val_${carKeys[i]}`];
        }
      }

      if (showBrandAverages) {
        for (let i = 0; i < brandKeys.length; i++) {
          this.sum.brand[brandKeys[i]] += item[`brand_val_${brandKeys[i]}`];
        }
      }

      if (resumed) {
        const {_id, model, car_val_average, brand_val_average, active, created, created_by, modified, modified_by } = item;
        filteredItems.push({_id, model, car_val_average, brand_val_average, active, created, created_by, modified, modified_by });
      }
    }
  
    const qtd = res.length;
    const response = {
      opinions: await this.customerService.returnWithCreatedAndModifierUser(resumed ? filteredItems : res),
      qtd: qtd
    }

    if (showCarAverages) {
      for (let i = 0; i < carKeys.length; i++) {
        this.sum.car[carKeys[i]] = parseFloat((this.sum.car[carKeys[i]] / qtd).toFixed(1));
      }

      response['averages'] = this.sum.car;
      response['model'] = carModel[0];
    }

    if (showBrandAverages) {
      for (let i = 0; i < brandKeys.length; i++) {
        this.sum.brand[brandKeys[i]] = parseFloat((this.sum.brand[brandKeys[i]] / qtd).toFixed(1));
      }

      response['averages'] = this.sum.brand;
      response['brand'] = carBrand[0];
    }

    return response;
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

    const dataReq = await this.setDataPayload(req);
    req = dataReq;

    if (exists) {
      const modifiedPost = this.customerService.setCreatedAndModifierUser(req, exists);
      res['saved'] = await opinionModel.findByIdAndUpdate({ _id: id }, modifiedPost, { new: true }).then(savedPost => savedPost);
    } else {
      const createdPost = this.customerService.setCreatedAndModifierUser(req, exists, opinionModel);
      res['saved'] = await createdPost.save().then(savedPost => savedPost);
      this.carService.updateAverage(res['saved'], 'set');
    }

    if (req.user && req.user['role'] && req.user['role'].level < 2) {
      res['opinions'] = await this.getOpinions();
    }

    return Promise.resolve(res);
  }

  public async deleteOpinion(id: string): Promise<Object> {
    let res = {};
    res['removed'] = await opinionModel.findByIdAndDelete({ _id: id }).then(savedPost => savedPost);
    this.carService.updateAverage(res['removed'], 'delete');
    res['opinions'] = await this.getOpinions();

    return res
      ? Promise.resolve(res)
      : Promise.reject({ statusCode: 404 });
  }

  public async setDataPayload(req) {
    const car = req.body.data.aboutCar;
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

        customerId = createdUser['_id'];
      }

      req['user'] = {
        id: customerId
      }
    }

    const payload = {
      customer: customerId,
      model: car.carModel,
      year_model: car.yearModel,
      fuel: car.fuel,
      engine: car.engine,
      year_bought: car.yearBought,
      kept_period: car.keptPeriod,
      km_bought: car.kmBought,
      car_title: car.finalWords.title,
      car_positive: car.finalWords.positive,
      car_negative: car.finalWords.negative,
      brand: brand.carBrand,
      brand_title: brand.finalWords.title,
      brand_positive: brand.finalWords.positive,
      brand_negative: brand.finalWords.negative,
      active: true,
    }

    const carAverage = this.getAverage(car.valuation);
    const brandAverage = this.getAverage(brand.valuation);

    for (const key of Object.keys(this.sum.car)) {
      payload[`car_val_${key}`] = key === 'average'
        ? carAverage
        : car.valuation[key];
    }

    for (const key of Object.keys(this.sum.brand)) {
      payload[`brand_val_${key}`] = key === 'average'
        ? brandAverage
        : brand.valuation[key];
    }

    req.body.data = payload;
    return req;
  }

  public async setNewUserPayload(user) {
    const randomPassword = this.cryptoService.randomPasswordGenerator();
    console.log('password gerado: '+randomPassword);
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