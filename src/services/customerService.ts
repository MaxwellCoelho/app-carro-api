import { config } from '../config/config';
import { customerModel, roleModel } from '../models/customer.model';
import { categoryModel, brandModel, modelModel, versionModel } from '../models/car.model';
import { opinionCarModel, opinionBrandModel } from '../models/opinion.model';
import { CryptoService } from '../services';
import { UDate } from '../utils';
import { Utils } from '../utils/utils';

export class CustomerService {
  public conf = config;

  constructor(
    private cryptoService: CryptoService,
    private uDate: UDate,
    private utils: Utils,
  ) { }

  // CUSTOMERS ---------------------------------------------------
  public async getCustomers(filter?: any, resumed?: boolean): Promise<any> {
    let myFilter = filter ? this.utils.convertIdToObjectId(filter) : {};
    let mySort = { 'role.level': 'asc', name: 'asc' }
    let res;
    
    try {
      res = await customerModel.find(myFilter).sort(mySort);
    } catch (error) {
      Promise.reject({ statusCode: 404 });
    }

    const resumedArray: Object[] = [];

    for (let item of res) {
      if (resumed) {
        const resumedObj = {
          _id: item['_id'],
          name: item['name']
        };
        resumedArray.push(resumedObj);
      }
    }

    return resumed
      ? Promise.resolve(resumedArray)
      : Promise.resolve(res);
  }

  public async setCustomer(req: any, id?: string): Promise<Object> {
    let idExists = id ? await this.getCustomers({ _id: id }) : null;

    if (id && !idExists) {
      return Promise.reject({ statusCode: 404 });
    }

    try {
      req.body.data = this.cryptoService.decodeJwt(req.body.data);
    } catch (error) {
      return Promise.reject({ statusCode: 401 });
    }

    const emailExists = await this.getCustomers({ email: req.body.data.email });
    const notSameUser = emailExists.find(user => user._id.toString() !== id);

    if (emailExists.length && notSameUser) {
      console.log('Email já existe');
      return Promise.reject({ statusCode: 401 });
    }

    if (req.body.data['role']) {
      req.body.data['role'] = this.utils.convertIdToObjectId(req.body.data['role'])
    }

    let res = {};

    if (idExists) {
      const modifiedPost = this.setCreatedAndModifierUser(req, idExists);

      if (modifiedPost['password'] && modifiedPost['currentPassword']) {
        if (this.cryptoService.checkPassword(modifiedPost['currentPassword'], idExists[0].password)) {
          modifiedPost['password'] = this.cryptoService.encriptPassword(modifiedPost['password']);
        } else {
          console.log('Senha inválida');
          return Promise.reject({ statusCode: 401 });
        }
      }

      res['saved'] = await customerModel.findByIdAndUpdate({ _id: id }, modifiedPost, { new: true });
      // se nao for atualização de favoritos atualiza duplicações nas outras collections
      if (!req.body.data['favorites']) {
        const newCustomer = {
          _id: res['saved']._id,
          name: res['saved'].name
        };
        const modelsToUpdate = [
          roleModel, categoryModel, brandModel, modelModel, versionModel, opinionCarModel, opinionBrandModel
        ];
        modelsToUpdate.forEach(model => {
          this.updateMany(model, ['created_by', 'modified_by'], res['saved'], newCustomer);
        });
      }
    } else {
      const createdPost = this.setCreatedAndModifierUser(req, idExists, customerModel);
      createdPost.password = this.cryptoService.encriptPassword(createdPost.password);
      res['saved'] = await createdPost.save();
    }

    // if (req.user && req.user['role'] && req.user['role'].level < 2) {
    //   res['customers'] = await this.getCustomers();
    // }

    return Promise.resolve(res);
  }

  public async deleteCustomer(id: string): Promise<Object> {
    let res = {};
    res['removed'] = await customerModel.findByIdAndDelete({ _id: id });
    res['customers'] = await this.getCustomers();

    return res
      ? Promise.resolve(res)
      : Promise.reject({ statusCode: 404 });
  }

  
  // ROLES ---------------------------------------------------
  public async getRoles(filter?: any): Promise<Object> {
    let myFilter = filter ? this.utils.convertIdToObjectId(filter) : {};
    let mySort = { level: 'asc' }
    let res;

    try {
      res = await roleModel.find(myFilter).sort(mySort);
    } catch (error) {
      Promise.reject({ statusCode: 404 });
    }

    return Promise.resolve(res);
  }

  public async setRole(req: any, id?: string): Promise<Object> {
    let exists = id ? await this.getRoles({ _id: id }) : null;

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
      const modifiedPost = this.setCreatedAndModifierUser(req, exists);
      res['saved'] = await roleModel.findByIdAndUpdate({ _id: id }, modifiedPost, { new: true });
      // atualiza duplicações na collection de customers
      const newRole = {
        _id: res['saved']._id,
        name: res['saved'].name,
        level: res['saved'].level
      };
      this.updateMany(customerModel, ['role'], res['saved'], newRole);
    } else {
      const createdPost = this.setCreatedAndModifierUser(req, exists, roleModel);
      res['saved'] = await createdPost.save();
    }

    // res['roles'] = await this.getRoles();

    return Promise.resolve(res);
  }

  public async deleteRole(id: string): Promise<Object> {
    let res = {};
    res['removed'] = await roleModel.findByIdAndDelete({ _id: id });
    res['roles'] = await this.getRoles();

    return res
      ? Promise.resolve(res)
      : Promise.reject({ statusCode: 404 });
  }

  public setCreatedAndModifierUser(req, exists, model?) {
    const timeStamp = this.uDate.getCurrentDateTimeString();
    let postPayload;

    if (exists) {
      postPayload = {
        ...req.body.data,
        modified: timeStamp
      };

      if (req.user) {
        postPayload.modified_by = {_id: req.user._id, name: req.user.name};
      }
    } else {
      postPayload = new model(req.body.data);
      postPayload.created = timeStamp;
      postPayload.modified = timeStamp;

      if (req.user) {
        postPayload.created_by = {_id: req.user._id, name: req.user.name};
        postPayload.modified_by = postPayload.created_by;
      }
    }

    return postPayload;
  }

  public async updateMany(model: any, params: string[], saved: any, newObject: object): Promise<void> {
    let newParams = [];
    let newObjects = {};

    params.forEach(param => {
      newParams.push({ [param]: saved._id.toString() });
      newParams.push({ [param]: saved._id });
      newParams.push({ [`${param}._id`]: saved._id.toString() });
      newParams.push({ [`${param}._id`]: saved._id });
      newObjects[param] = newObject;
    });

    await model.updateMany({ $or: newParams }, newObjects);
  }
}