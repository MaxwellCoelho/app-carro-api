import { config } from '../config/config';
import { customerModel, roleModel } from '../models/customer.model';

export class CustomerService {
  public conf = config;

  public async getCustomers(): Promise<Object> {
    const responseModel = await customerModel.find().then(entries => {
      return {
        "statusCode": 200,
        customers: entries
      }
    });

    return Promise.resolve(responseModel);
  }

  public async setCustomer(req: Request): Promise<Object> {
    const createdPost = new customerModel(req);
    const responseModel = await createdPost.save().then(savedPost  => {
      return {
        "statusCode": 200,
        saved: savedPost
      }
    });

    return Promise.resolve(responseModel);
  }

  public async getRoles(): Promise<Object> {
    const responseModel = await roleModel.find().then(entries => {
      return {
        "statusCode": 200,
        roles: entries
      }
    });

    return Promise.resolve(responseModel);
  }

  public async setRole(req: Request): Promise<Object> {
    const createdPost = new roleModel(req);
    const responseModel = await createdPost.save().then(savedPost  => {
      return {
        "statusCode": 200,
        saved: savedPost
      }
    });

    return Promise.resolve(responseModel);
  }
}