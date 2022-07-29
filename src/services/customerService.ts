import { config } from '../config/config';
import { customerModel, roleModel } from '../models/customer.model';
import { CryptoService } from '../services';
import { UDate } from '../utils';

export class CustomerService {
  public conf = config;

  constructor(
    private cryptoService: CryptoService,
    private uDate: UDate,
  ) { }

  // CUSTOMERS ---------------------------------------------------
  public async getCustomers(filter?: any, resumed?: boolean): Promise<any> {
    let myFilter = filter ? filter : {};
    let res;
    
    try {
      res = await customerModel.find(myFilter);
    } catch (error) {
      Promise.reject({ statusCode: 404 });
    }

    const resumedArray: Object[] = [];

    for (let item of res) {
      if (resumed) {
        const resumedObj = {
          id: item['_id'],
          name: item['name']
        };
        resumedArray.push(resumedObj);
      } else {
        await this.getRoles({ _id: item.role }).then(role => {
          if (role[0]) {
            item.role = role[0];
          }
        });
      }
    }

    return resumed
      ? Promise.resolve(resumedArray)
      : this.returnWithCreatedAndModifierUser(res);
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

    let res = {};

    if (idExists) {
      const modifiedPost = this.setCreatedAndModifierUser(req, idExists);

      if (modifiedPost['password'] !== idExists[0].password) {
        modifiedPost['password'] = this.cryptoService.encriptPassword(modifiedPost['password']);
      }

      res['saved'] = await customerModel.findByIdAndUpdate({ _id: id }, modifiedPost, { new: true }).then(savedPost => savedPost);
    } else {
      const createdPost = this.setCreatedAndModifierUser(req, idExists, customerModel);
      createdPost.password = this.cryptoService.encriptPassword(createdPost.password);
      res['saved'] = await createdPost.save().then(savedPost => savedPost);
    }

    if (req.user && req.user['role'] && req.user['role'].level < 2) {
      res['customers'] = await this.getCustomers();
    }

    return Promise.resolve(res);
  }

  public async deleteCustomer(id: string): Promise<Object> {
    let res = {};
    res['removed'] = await customerModel.findByIdAndDelete({ _id: id }).then(savedPost => savedPost);
    res['customers'] = await this.getCustomers();

    return res
      ? Promise.resolve(res)
      : Promise.reject({ statusCode: 404 });
  }

  
  // ROLES ---------------------------------------------------
  public async getRoles(filter?: any): Promise<Object> {
    let myFilter = filter ? filter : {};
    const res = await roleModel.find(myFilter);

    if (!res.length) {
      Promise.reject({ statusCode: 404 });
    }

    return this.returnWithCreatedAndModifierUser(res);
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
      res['saved'] = await roleModel.findByIdAndUpdate({ _id: id }, modifiedPost, { new: true }).then(savedPost => savedPost);
    } else {
      const createdPost = this.setCreatedAndModifierUser(req, exists, roleModel);
      res['saved'] = await createdPost.save().then(savedPost => savedPost);
    }

    res['roles'] = await this.getRoles();

    return Promise.resolve(res);
  }

  public async deleteRole(id: string): Promise<Object> {
    let res = {};
    res['removed'] = await roleModel.findByIdAndDelete({ _id: id }).then(savedPost => savedPost);
    res['roles'] = await this.getRoles();

    return res
      ? Promise.resolve(res)
      : Promise.reject({ statusCode: 404 });
  }

  public async returnWithCreatedAndModifierUser(res) {
    for (const item of res) {
      if (item.created_by !== 'itself') {
        await this.getCustomers({ _id: item.created_by }, true).then(user => {
          if (user[0]) {
            item.created_by = user[0];
          }
        });
      }

      if (item.modified_by !== 'itself' && item.modified_by !== item.created_by) {
        await this.getCustomers({ _id: item.modified_by }, true).then(user => {
          if (user[0]) {
            item.modified_by = user[0];
          }
        });
      } else {
        item.modified_by = item.created_by;
      }
    }

    return Promise.resolve(res);
  }

  public setCreatedAndModifierUser(req, exists, model?) {
    const timeStamp = this.uDate.getCurrentDateTimeString();
    let postPayload;

    if (exists) {
      postPayload = {
        ...req.body.data,
        modified: timeStamp,
        modified_by: req.user.id
      };
    } else {
      postPayload = new model(req.body.data);
      postPayload.created = timeStamp;
      postPayload.created_by = req.user.id;
      postPayload.modified = timeStamp;
      postPayload.modified_by = req.user.id;
    }

    return postPayload;
  }
}