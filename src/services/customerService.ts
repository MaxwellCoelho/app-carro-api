import { config } from '../config/config';
import { customerModel, roleModel } from '../models/customer.model';
import { CryptoService } from '../services';

export class CustomerService {
  public conf = config;

  constructor(
    private cryptoService: CryptoService,
  ) { }

  // CUSTOMERS ---------------------------------------------------
  public async getCustomers(filter?: any): Promise<Object> {
    let myFilter = filter ? filter : {};
    const res = await customerModel.find(myFilter).then(entries => entries);
    
    if (!res.length) {
      Promise.reject({ statusCode: 404 });
    }

    for (const item of res) {
      await this.getRoles(item.role).then(role => {
        if (role[0]) {
          item.role = role[0];
        }
      });
    }

    return res.length
      ? Promise.resolve(res)
      : Promise.reject({ statusCode: 404 });
  }

  public async setCustomer(req: Request, currentTime: string, id?: string): Promise<Object> {
    let exists = id ? await this.getCustomers({ _id: id }) : null;

    if (id && !exists) {
      return Promise.reject({ statusCode: 404 });
    }

    let res = {};

    if (exists) {
      const modifiedPost = { ...req, modified: currentTime };

      if (modifiedPost['password'] !== exists[0].password) {
        modifiedPost['password'] = this.cryptoService.encriptPassword(modifiedPost['password']);
      }

      res['saved'] = await customerModel.findByIdAndUpdate({ _id: id }, modifiedPost, { new: true }).then(savedPost => savedPost);
    } else {
      const createdPost = new customerModel(req);
      createdPost.password = this.cryptoService.encriptPassword(createdPost.password);
      createdPost.created = currentTime;
      createdPost.modified = currentTime;
      res['saved'] = await createdPost.save().then(savedPost => savedPost);
    }

    res['customers'] = await this.getCustomers();

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
  public async getRoles(id?: string): Promise<Object> {
    const filter = id ? { _id: id } : {};
    const res = await roleModel.find(filter).then(entries => entries);

    return res.length
      ? Promise.resolve(res)
      : Promise.reject({ statusCode: 404 });
  }

  public async setRole(req: Request, currentTime: string, id?: string): Promise<Object> {
    let exists = id ? await this.getRoles(id) : null;

    if (id && !exists) {
      return Promise.reject({ statusCode: 404 });
    }

    let res = {};

    if (exists) {
      const modifiedPost = { ...req, modified: currentTime };
      res['saved'] = await roleModel.findByIdAndUpdate({ _id: id }, modifiedPost, { new: true }).then(savedPost => savedPost);
    } else {
      const createdPost = new roleModel(req);
      createdPost.created = currentTime;
      createdPost.modified = currentTime;
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
}