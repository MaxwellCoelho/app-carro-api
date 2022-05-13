import { config } from '../config/config';
import * as mongoose from 'mongoose';

export class CustomerService {
  public conf = config;

  // SCHEMAS
  public customersSchema = new mongoose.Schema(
    { _id: String, name: String, role: String }
  );
  public rolesSchema = new mongoose.Schema(
    { _id: String, name: String, level: Number }
  );

  // MODELS
  public customers = mongoose.model('customers', this.customersSchema);
  public roles = mongoose.model('roles', this.rolesSchema);

  public async getCustomers(): Promise<Object> {
    const responseModel = await this.customers.find().then(entries => {
      return {
        "statusCode": 200,
        customers: entries
      }
    });

    return Promise.resolve(responseModel);
  }

  public async getRoles(): Promise<Object> {
    const responseModel = await this.roles.find().then(entries => {
      return {
        "statusCode": 200,
        roles: entries
      }
    });

    return Promise.resolve(responseModel);
  }
}