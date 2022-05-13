import { config } from '../config/config';
import * as mongoose from 'mongoose';

export class CarService {
  public conf = config;

  // SCHEMAS
  public categorySchema = new mongoose.Schema(
    { _id: String, name: String }
  );
  public brandSchema = new mongoose.Schema(
    { _id: String, name: String, image: String }
  );
  public modelSchema = new mongoose.Schema(
    { _id: String, name: String, brand: String, category: String, image: String }
  );

  // MODELS
  public category = mongoose.model('carcategories', this.categorySchema);
  public brand = mongoose.model('carbrands', this.brandSchema);
  public model = mongoose.model('carmodels', this.modelSchema);

  public async getCategories(): Promise<Object> {
    const responseModel = await this.category.find().then(entries => {
      return {
        "statusCode": 200,
        categories: entries
      }
    });

    return Promise.resolve(responseModel);
  }

  public async getBrands(): Promise<Object> {
    const responseModel = await this.brand.find().then(entries => {
      return {
        "statusCode": 200,
        brands: entries
      }
    });

    return Promise.resolve(responseModel);
  }

  public async getModels(): Promise<Object> {
    const responseModel = await this.model.find().then(entries => {
      return {
        "statusCode": 200,
        models: entries
      }
    });

    return Promise.resolve(responseModel);
  }
}