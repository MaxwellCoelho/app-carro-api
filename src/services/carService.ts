import { config } from '../config/config';
import { categoryModel, brandModel, modelModel } from '../models/car.model';
import { CryptoService, CustomerService } from '../services';
import { Utils } from '../utils/utils';

export class CarService {
  public conf = config;

  constructor(
    private cryptoService: CryptoService,
    private customerService: CustomerService,
    private utils: Utils,
  ) { }

  // CATEGORIES ---------------------------------------------------
  public async getCategories(id?: string): Promise<Object> {
    let filter = id ? { _id: id } : {};
    const res = await categoryModel.find(filter).then(entries => entries);

    if (!res.length) {
      Promise.reject({ statusCode: 404 });
    }
  
    return this.customerService.returnWithCreatedAndModifierUser(res);
  }

  public async setCategory(req: any, id?: string): Promise<Object> {
    let exists = id ? await this.getCategories(id) : null;

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
      const modifiedPost = this.customerService.setCreatedAndModifierUser(req, exists);
      res['saved'] = await categoryModel.findByIdAndUpdate({ _id: id }, modifiedPost, { new: true }).then(savedPost => savedPost);
    } else {
      const createdPost = this.customerService.setCreatedAndModifierUser(req, exists, categoryModel);
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
  public async getBrands(filter?: any): Promise<Object> {
    let myFilter = filter ? filter : {};
    const res = await brandModel.find(myFilter).then(entries => entries);
    
    if (!res.length) {
      Promise.reject({ statusCode: 404 });
    }
  
    return this.customerService.returnWithCreatedAndModifierUser(res);
  }

  public async setBrand(req: any, id?: string): Promise<Object> {
    let exists = id ? await this.getBrands({ _id: id }) : null;

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
      let modifiedPost = this.customerService.setCreatedAndModifierUser(req, exists);
      modifiedPost['url'] = this.utils.sanitizeText(modifiedPost.name);
      res['saved'] = await brandModel.findByIdAndUpdate({ _id: id }, modifiedPost, { new: true }).then(savedPost => savedPost);
    } else {
      let createdPost = this.customerService.setCreatedAndModifierUser(req, exists, brandModel);
      createdPost['url'] = this.utils.sanitizeText(createdPost.name);
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
  public async getModels(filter?: any): Promise<Object> {
    let myFilter = filter ? filter : {};
    const res = await modelModel.find(myFilter).then(entries => entries);

    if (!res.length) {
      Promise.reject({ statusCode: 404 });
    }

    for (const item of res) {
      await this.getBrands({ _id: item.brand }).then(brand => {
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
    
    return this.customerService.returnWithCreatedAndModifierUser(res);
  }

  public async setModel(req: any, id?: string): Promise<Object> {
    let exists = id ? await this.getModels({ _id: id }) : null;

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
      let modifiedPost = this.customerService.setCreatedAndModifierUser(req, exists);
      modifiedPost['url'] = this.utils.sanitizeText(modifiedPost.name);
      res['saved'] = await modelModel.findByIdAndUpdate({ _id: id }, modifiedPost, { new: true }).then(savedPost => savedPost);
    } else {
      let createdPost = this.customerService.setCreatedAndModifierUser(req, exists, modelModel);
      createdPost['url'] = this.utils.sanitizeText(createdPost.name);
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