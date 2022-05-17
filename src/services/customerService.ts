import { config } from '../config/config';
import { customerModel, roleModel } from '../models/customer.model';

export class CustomerService {
  public conf = config;

  // CUSTOMERS ---------------------------------------------------
  public async getCustomers(id?: string): Promise<Object> {
    let filter = id ? { _id: id } : {};
    const res = await customerModel.find(filter).then(entries => entries);

    return res.length
      ? Promise.resolve(res)
      : Promise.reject({ statusCode: 404 });
  }

  public async setCustomer(req: Request, id?: string): Promise<Object> {
    let exists = id ? await this.getCustomers(id) : null;

    if (id && !exists) {
      return Promise.reject({ statusCode: 404 });
    }

    let res;

    if (exists) {
      res = await customerModel.findByIdAndUpdate({ _id: id }, req, { new: true }).then(savedPost => savedPost);
    } else {
      const createdPost = new customerModel(req);
      res = await createdPost.save().then(savedPost => savedPost);
    }

    return Promise.resolve(res);
  }

  public async deleteCustomer(id: string): Promise<Object> {
    const res = await customerModel.findByIdAndDelete({ _id: id }).then(savedPost => savedPost);

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

    let res;

    if (exists) {
      res = await roleModel.findByIdAndUpdate({ _id: id }, req, { new: true }).then(savedPost => savedPost);
    } else {
      const createdPost = new roleModel(req);
      res = await createdPost.save().then(savedPost => savedPost);
    }

    return Promise.resolve(res);
  }

  public async deleteRole(id: string): Promise<Object> {
    const res = await roleModel.findByIdAndDelete({ _id: id }).then(savedPost => savedPost);

    return res
      ? Promise.resolve(res)
      : Promise.reject({ statusCode: 404 });
  }
}