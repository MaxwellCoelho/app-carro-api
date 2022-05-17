import { config } from '../config/config';
import { categoryModel, brandModel, modelModel } from '../models/car.model';

export class CarService {
  public conf = config;

  // CATEGORIES ---------------------------------------------------
  public async getCategories(id?: string): Promise<Object> {
    let filter = id ? { _id: id } : {};
    const res = await categoryModel.find(filter).then(entries => entries);
  
    return res.length
      ? Promise.resolve(res)
      : Promise.reject({ statusCode: 404 });
  }

  public async setCategory(req: Request, id?: string): Promise<Object> {
    let exists = id ? await this.getCategories(id) : null;

    if (id && !exists) {
      return Promise.reject({ statusCode: 404 });
    }

    let res;

    if (exists) {
      res = await categoryModel.findByIdAndUpdate({ _id: id }, req, { new: true }).then(savedPost => savedPost);
    } else {
      const createdPost = new categoryModel(req);
      res = await createdPost.save().then(savedPost => savedPost);
    }

    return Promise.resolve(res);
  }

  public async deleteCategory(id: string): Promise<Object> {
    const res = await categoryModel.findByIdAndDelete({ _id: id }).then(savedPost => savedPost);

    return res
      ? Promise.resolve(res)
      : Promise.reject({ statusCode: 404 });
  }

  // BRANDS ---------------------------------------------------
  public async getBrands(id?: string): Promise<Object> {
    let filter = id ? { _id: id } : {};
    const res = await brandModel.find(filter).then(entries => entries);
    
    return res.length
      ? Promise.resolve(res)
      : Promise.reject({ statusCode: 404 });
  }

  public async setBrand(req: Request, id?: string): Promise<Object> {
    let exists = id ? await this.getBrands(id) : null;

    if (id && !exists) {
      return Promise.reject({ statusCode: 404 });
    }

    let res;

    if (exists) {
      res = await brandModel.findByIdAndUpdate({ _id: id }, req, { new: true }).then(savedPost => savedPost);
    } else {
      const createdPost = new brandModel(req);
      res = await createdPost.save().then(savedPost => savedPost);
    }

    return Promise.resolve(res);
  }

  public async deleteBrand(id: string): Promise<Object> {
    const res = await brandModel.findByIdAndDelete({ _id: id }).then(savedPost => savedPost);

    return res
      ? Promise.resolve(res)
      : Promise.reject({ statusCode: 404 });
  }

  // MODELS ---------------------------------------------------
  public async getModels(id?: string): Promise<Object> {
    let filter = id ? { _id: id } : {};
    const res = await modelModel.find(filter).then(entries => entries);
    
    return res.length
      ? Promise.resolve(res)
      : Promise.reject({ statusCode: 404 });
  }

  public async setModel(req: Request, id?: string): Promise<Object> {
    let exists = id ? await this.getBrands(id) : null;

    if (id && !exists) {
      return Promise.reject({ statusCode: 404 });
    }

    let res;

    if (exists) {
      res = await modelModel.findByIdAndUpdate({ _id: id }, req, { new: true }).then(savedPost => savedPost);
    } else {
      const createdPost = new modelModel(req);
      res = await createdPost.save().then(savedPost => savedPost);
    }

    return Promise.resolve(res);
  }

  public async deleteModel(id: string): Promise<Object> {
    const res = await modelModel.findByIdAndDelete({ _id: id }).then(savedPost => savedPost);

    return res
      ? Promise.resolve(res)
      : Promise.reject({ statusCode: 404 });
  }

}