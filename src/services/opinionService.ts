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

    let sum = {
      car: {
        val_inside: 0,
        val_outside: 0,
        val_confort: 0,
        val_safety: 0,
        val_consumption: 0,
        val_durability: 0,
        val_worth: 0,
        val_average: 0
      },
      brand: {
        val_services: 0,
        val_people: 0,
        val_prices: 0,
        val_credibility: 0,
        val_satisfaction: 0,
        val_average: 0
      }
    }

    const carKeys = Object.keys(sum.car);
    const brandKeys = Object.keys(sum.brand);
    const showCarAverages = myFilter.brand && myFilter.model;
    const showBrandAverages = myFilter.brand && !myFilter.model;
    const carModel = showCarAverages ? await this.carService.getModels({ _id: myFilter.model }) : [];
    const carBrand = showBrandAverages ? await this.carService.getBrands({ _id: myFilter.brand }) : [];

    for (const item of res) {
      await this.customerService.getCustomers({ _id: item.customer }, true).then(user => {
        if (user[0]) {
          item.customer = user[0];
        }
      }); 

      if (!showCarAverages && !showBrandAverages) {
        await this.carService.getModels({ _id: item.model }).then(model => {
          if (model[0]) {
            item.model = model[0];
          }
        }); 
      }

      if (showCarAverages) {
        for (let i = 0; i < carKeys.length; i++) {
          sum.car[carKeys[i]] += item[`car_${carKeys[i]}`];
        }
      }

      if (showBrandAverages) {
        for (let i = 0; i < brandKeys.length; i++) {
          sum.brand[brandKeys[i]] += item[`brand_${brandKeys[i]}`];
        }
      }
    }

    const qtd = res.length;
    const response = {
      opinions: await this.customerService.returnWithCreatedAndModifierUser(res),
      length: qtd
    }

    if (showCarAverages) {
      for (let i = 0; i < carKeys.length; i++) {
        sum.car[carKeys[i]] = parseFloat((sum.car[carKeys[i]] / qtd).toFixed(1));
      }

      response['averages'] = sum.car;
      response['model'] = carModel[0];
    }

    if (showBrandAverages) {
      for (let i = 0; i < brandKeys.length; i++) {
        sum.brand[brandKeys[i]] = parseFloat((sum.brand[brandKeys[i]] / qtd).toFixed(1));
      }

      response['averages'] = sum.brand;
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
      console.log(createdPost);
      res['saved'] = await createdPost.save().then(savedPost => savedPost);
    }

    if (req.user && req.user['role'].level < 2) {
      res['opinions'] = await this.getOpinions();
    }

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

    const carAverage = this.getAverage(car.valuation);
    const brandAverage = this.getAverage(brand.valuation);

    const payload = {
      customer: customerId,
      model: car.carModel,
      year_model: car.yearModel,
      fuel: car.fuel,
      engine: car.engine,
      year_bought: car.yearBought,
      kept_period: car.keptPeriod,
      km_bought: car.kmBought,
      car_val_inside: car.valuation.interior,
      car_val_outside: car.valuation.exterior,
      car_val_confort: car.valuation.conforto,
      car_val_safety: car.valuation.seguranca,
      car_val_consumption: car.valuation.consumo,
      car_val_durability: car.valuation.durabilidade,
      car_val_worth: car.valuation.custobeneficio,
      car_val_average: carAverage.toFixed(1),
      car_title: car.finalWords.title,
      car_positive: car.finalWords.positive,
      car_negative: car.finalWords.negative,
      brand: brand.carBrand,
      brand_val_services: brand.valuation.servicos,
      brand_val_people: brand.valuation.atendimento,
      brand_val_prices: brand.valuation.precos,
      brand_val_credibility: brand.valuation.credibilidade,
      brand_val_satisfaction: brand.valuation.satisfacao,
      brand_val_average: brandAverage.toFixed(1),
      brand_title: brand.finalWords.title,
      brand_positive: brand.finalWords.positive,
      brand_negative: brand.finalWords.negative,
      active: true,
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