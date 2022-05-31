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

  public async setCategory(req: Request, currentTime: string, id?: string): Promise<Object> {
    let exists = id ? await this.getCategories(id) : null;

    if (id && !exists) {
      return Promise.reject({ statusCode: 404 });
    }

    let res = {};

    if (exists) {
      const modifiedPost = { ...req, modified: currentTime };
      res['saved'] = await categoryModel.findByIdAndUpdate({ _id: id }, modifiedPost, { new: true }).then(savedPost => savedPost);
    } else {
      const createdPost = new categoryModel(req);
      createdPost.created = currentTime;
      createdPost.modified = currentTime;
      res['saved'] = await createdPost.save().then(savedPost => savedPost);
    }

    res['categories'] = await this.getCategories();

    return Promise.resolve(res);
  }

  public async deleteCategory(id: string): Promise<Object> {
    let res = {};
    res['removed'] = await categoryModel.findByIdAndDelete({ _id: id }).then(savedPost => savedPost);
    res['categories'] = await this.getCategories();

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

  public async setBrand(req: Request, currentTime: string, id?: string): Promise<Object> {
    let exists = id ? await this.getBrands(id) : null;

    if (id && !exists) {
      return Promise.reject({ statusCode: 404 });
    }

    let res = {};

    if (exists) {
      const modifiedPost = { ...req, modified: currentTime };
      res['saved'] = await brandModel.findByIdAndUpdate({ _id: id }, modifiedPost, { new: true }).then(savedPost => savedPost);
    } else {
      const createdPost = new brandModel(req);
      createdPost.created = currentTime;
      createdPost.modified = currentTime;
      res['saved'] = await createdPost.save().then(savedPost => savedPost);
    }

    res['brands'] = await this.getBrands();

    return Promise.resolve(res);
  }

  public async deleteBrand(id: string): Promise<Object> {
    let res = {};
    res['removed'] = await brandModel.findByIdAndDelete({ _id: id }).then(savedPost => savedPost);
    res['brands'] = await this.getBrands();

    return res
      ? Promise.resolve(res)
      : Promise.reject({ statusCode: 404 });
  }

  // MODELS ---------------------------------------------------
  public async getModels(id?: string): Promise<Object> {
    let filter = id ? { _id: id } : {};
    const res = await modelModel.find(filter).then(entries => entries);

    for (const item of res) {
      await this.getBrands(item.brand).then(brand => {
        if (brand[0]) {
          item.brand = brand[0];
        }
      });
      
      await this.getCategories(item.category).then(category => {
        if (category[0]) {
          item.category = category[0];
        }
      }); 
    }
    
    return res.length
      ? Promise.resolve(res)
      : Promise.reject({ statusCode: 404 });
  }

  public async setModel(req: Request, currentTime: string, id?: string): Promise<Object> {
    let exists = id ? await this.getModels(id) : null;

    if (id && !exists) {
      return Promise.reject({ statusCode: 404 });
    }

    let res = {};

    if (exists) {
      const modifiedPost = { ...req, modified: currentTime };
      res['saved'] = await modelModel.findByIdAndUpdate({ _id: id }, modifiedPost, { new: true }).then(savedPost => savedPost);
    } else {
      const createdPost = new modelModel(req);
      createdPost.created = currentTime;
      createdPost.modified = currentTime;
      res['saved'] = await createdPost.save().then(savedPost => savedPost);
    }

    res['models'] = await this.getModels();

    return Promise.resolve(res);
  }

  public async deleteModel(id: string): Promise<Object> {
    let res = {};
    res['removed'] = await modelModel.findByIdAndDelete({ _id: id }).then(savedPost => savedPost);
    res['models'] = await this.getModels();

    return res
      ? Promise.resolve(res)
      : Promise.reject({ statusCode: 404 });
  }

}