import { config } from '../config/config';
import { categoryModel, brandModel, modelModel } from '../models/car.model';

export class CarService {
  public conf = config;

  public async getCategories(): Promise<Object> {
    const responseModel = await categoryModel.find().then(entries => {
      return {
        "statusCode": 200,
        categories: entries
      }
    });

    return Promise.resolve(responseModel);
  }

  public async setCategory(req: Request): Promise<Object> {
    const createdPost = new categoryModel(req);
    const responseModel = await createdPost.save().then(savedPost  => {
      return {
        "statusCode": 200,
        saved: savedPost
      }
    });

    return Promise.resolve(responseModel);
  }

  public async getBrands(): Promise<Object> {
    const responseModel = await brandModel.find().then(entries => {
      return {
        "statusCode": 200,
        brands: entries
      }
    });

    return Promise.resolve(responseModel);
  }

  public async setBrand(req: Request): Promise<Object> {
    const createdPost = new brandModel(req);
    const responseModel = await createdPost.save().then(savedPost  => {
      return {
        "statusCode": 200,
        saved: savedPost
      }
    });

    return Promise.resolve(responseModel);
  }

  public async getModels(): Promise<Object> {
    const responseModel = await modelModel.find().then(entries => {
      return {
        "statusCode": 200,
        models: entries
      }
    });

    return Promise.resolve(responseModel);
  }

  public async setModel(req: Request): Promise<Object> {
    const createdPost = new modelModel(req);
    const responseModel = await createdPost.save().then(savedPost  => {
      return {
        "statusCode": 200,
        saved: savedPost
      }
    });

    return Promise.resolve(responseModel);
  }
}