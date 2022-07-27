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

      await this.carService.getModels({ _id: item.model }).then(model => {
        if (model[0]) {
          item.model = model[0];
        }
      }); 

      // await this.carService.getBrands(item.model.brand).then(brand => {
      //   if (brand[0]) {
      //     item.model.brand = brand[0];
      //   }
      // });

      // await this.carService.getCategories(item.model.category).then(category => {
      //   if (category[0]) {
      //     item.model.category = category[0];
      //   }
      // });
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
      console.log('ta autenticado, usa o id: '+req.user.id+' do '+req.user.email);
    } else {
      let foundUser;

      await this.customerService.getCustomers({ email: user.email }, true).then(user => {
        if (user[0]) {
          foundUser = user[0];
        }
      });

      if (foundUser) {
        console.log(foundUser);
        customerId = foundUser['id'];
        console.log('NAO ta autenticado, mas achou email. usa o id: '+foundUser['id']+' do '+foundUser['name']);
      } else {
        let newUserPayload = await this.setNewUserPayload(user); 
        const createdUser = await this.customerService.setCustomer(newUserPayload);

        customerId = createdUser['_id'];
        console.log('NAO ta autenticado, e NAO achou email. cria o id: '+createdUser['_id']+' do '+createdUser['email']);
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
      car_val_inside: car.valuation.interior,
      car_val_outside: car.valuation.exterior,
      car_val_confort: car.valuation.conforto,
      car_val_safety: car.valuation.seguranca,
      car_val_consumption: car.valuation.consumo,
      car_val_durability: car.valuation.durabilidade,
      car_val_worth: car.valuation.custobeneficio,
      car_title: car.finalWords.title,
      car_positive: car.finalWords.positive,
      car_negative: car.finalWords.negative,
      brand_val_services: brand.valuation.interior,
      brand_val_people: brand.valuation.atendimento,
      brand_val_prices: brand.valuation.precos,
      brand_val_credibility: brand.valuation.credibilidade,
      brand_val_satisfaction: brand.valuation.satisfacao,
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

}