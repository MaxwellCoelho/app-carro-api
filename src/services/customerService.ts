import { config } from '../config/config';
import { customerModel, roleModel } from '../models/customer.model';

export class CustomerService {
  public conf = config;

  // CUSTOMERS ---------------------------------------------------
  public async getCustomers(id?: string): Promise<Object> {
    let filter = id ? { _id: id } : {};
    const res = await customerModel.find(filter).then(entries => entries);

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

  public async setCustomer(req: Request, id?: string): Promise<Object> {
    let exists = id ? await this.getCustomers(id) : null;

    if (id && !exists) {
      return Promise.reject({ statusCode: 404 });
    }

    let res = {};

    if (exists) {
      res['saved'] = await customerModel.findByIdAndUpdate({ _id: id }, req, { new: true }).then(savedPost => savedPost);
    } else {
      const createdPost = new customerModel(req);
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

  public async setRole(req: Request, id?: string): Promise<Object> {
    let exists = id ? await this.getRoles(id) : null;

    if (id && !exists) {
      return Promise.reject({ statusCode: 404 });
    }

    let res = {};

    if (exists) {
      res['saved'] = await roleModel.findByIdAndUpdate({ _id: id }, req, { new: true }).then(savedPost => savedPost);
    } else {
      const createdPost = new roleModel(req);
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