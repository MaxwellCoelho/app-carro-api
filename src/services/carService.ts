import { config } from '../config/config';
import { categoryModel, brandModel, modelModel, versionModel } from '../models/car.model';
import { opinionBrandModel, opinionCarModel } from '../models/opinion.model';
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
    let res;

    try {
      res = await categoryModel.find(filter);
    } catch (error) {
      return Promise.reject({ statusCode: 401 });
    }
  
    return Promise.resolve(res);
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
      res['saved'] = await categoryModel.findByIdAndUpdate({ _id: id }, modifiedPost, { new: true });
      // atualiza duplicações na collection de modelos
      const newCategory = {
        _id: res['saved']._id,
        name: res['saved'].name,
        active: res['saved'].active
      };
      this.customerService.updateMany(modelModel, ['category'], res['saved'], newCategory);
    } else {
      const createdPost = this.customerService.setCreatedAndModifierUser(req, exists, categoryModel);
      res['saved'] = await createdPost.save();
    } 

    return Promise.resolve(res);
  }

  public async deleteCategory(id: string): Promise<Object> {
    let res = {};
    res['removed'] = await categoryModel.findByIdAndDelete({ _id: id });
    res['categories'] = await this.getCategories();

    return res
      ? Promise.resolve(res)
      : Promise.reject({ statusCode: 404 });
  }

  // BRANDS ---------------------------------------------------
  public async getBrands(filter?: any, mySort?: any, myPagination?: any): Promise<Object> {
    let myFilter = filter ? this.utils.convertIdToObjectId(filter) : {};
    let sorted = mySort ? mySort : { name: 'asc' };
    let res;
    const offset = myPagination && myPagination.page ? (myPagination.page - 1) * myPagination.perpage : 0;
    const pageSize = myPagination && myPagination.page ? myPagination.perpage : null;

    try {
      res = await brandModel.find(myFilter).sort(sorted).skip(offset).limit(pageSize);
    } catch (error) {
      Promise.reject({ statusCode: 404 });
    }
  
    return Promise.resolve(res);
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
      res['saved'] = await brandModel.findByIdAndUpdate({ _id: id }, modifiedPost, { new: true });
      // atualiza duplicações na collection de modelos
      const newBrand = {
        _id: res['saved']._id,
        name: res['saved'].name,
        url: res['saved'].url,
        active: res['saved'].active,
        review: res['saved'].review
      };
      this.customerService.updateMany(modelModel, ['brand'], res['saved'], newBrand);
      // atualiza duplicações na collection de opinion cars
      this.customerService.updateMany(opinionCarModel, ['brand'], res['saved'], newBrand);
      // atualiza duplicações na collection de opinion brand
      this.customerService.updateMany(opinionBrandModel, ['brand'], res['saved'], newBrand);
    } else {
      let createdPost = this.customerService.setCreatedAndModifierUser(req, exists, brandModel);
      createdPost['url'] = this.utils.sanitizeText(createdPost.name);
      createdPost['average'] = 0;
      createdPost['val_length'] = 0;
      res['saved'] = await createdPost.save();
    }

    

    return Promise.resolve(res);
  }

  public async deleteBrand(id: string): Promise<Object> {
    let res = {};
    res['removed'] = await brandModel.findByIdAndDelete({ _id: id });
    res['brands'] = await this.getBrands();

    return res
      ? Promise.resolve(res)
      : Promise.reject({ statusCode: 404 });
  }

  // MODELS ---------------------------------------------------
  public async getModels(filter?: any, resumed?: boolean, mySort?: any, myPagination?: any): Promise<any> {
    let myFilter = filter ? this.utils.convertIdToObjectId(filter) : {};
    let sorted = mySort ? mySort : { name: 'asc' };
    let res;
    const offset = myPagination && myPagination.page ? (myPagination.page - 1) * myPagination.perpage : 0;
    const pageSize = myPagination && myPagination.page ? myPagination.perpage : null;

    try {
      res = await modelModel.find(myFilter).sort(sorted).skip(offset).limit(pageSize);
    } catch (error) {
      Promise.reject({ statusCode: 404 });
    }

    const resumedArray: Object[] = [];

    for (const item of res) {
      let resumedObj = {};

      if (resumed) {
        resumedObj = {
          _id: item['_id'],
          name: item['name'],
          brand: item['brand'],
          category: item['category'],
          url: item['url'],
          average: item['average'],
          val_length: item['val_length'],
          active: item['active'],
          review: item['review']
        };
      }

      resumedArray.push(resumedObj);
    }
    
    return resumed
      ? Promise.resolve(resumedArray)
      : Promise.resolve(res);
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

    if (req.body.data['brand']) {
      req.body.data['brand'] = this.utils.convertIdToObjectId(req.body.data['brand'])
    }

    if (req.body.data['category']) {
      req.body.data['category'] = this.utils.convertIdToObjectId(req.body.data['category'])
    }

    let res = {};

    if (exists) {
      let modifiedPost = this.customerService.setCreatedAndModifierUser(req, exists);
      modifiedPost['url'] = this.utils.sanitizeText(modifiedPost.name);
      res['saved'] = await modelModel.findByIdAndUpdate({ _id: id }, modifiedPost, { new: true });
      // atualiza duplicações na collection de versoes
      const newModel = {
        _id: res['saved']._id,
        name: res['saved'].name,
        url: res['saved'].url,
        active: res['saved'].active,
        review: res['saved'].review
      };
      this.customerService.updateMany(versionModel, ['model'], res['saved'], newModel);
      // atualiza duplicações na collection de opinioes de carros
      this.customerService.updateMany(opinionCarModel, ['model'], res['saved'], newModel);
    } else {
      let createdPost = this.customerService.setCreatedAndModifierUser(req, exists, modelModel);
      createdPost['url'] = this.utils.sanitizeText(createdPost.name);
      createdPost['average'] = 0;
      createdPost['val_length'] = 0;
      res['saved'] = await createdPost.save();
    }

    // res['models'] = await this.getModels();

    return Promise.resolve(res);
  }

  public async deleteModel(id: string): Promise<Object> {
    let res = {};
    res['removed'] = await modelModel.findByIdAndDelete({ _id: id });
    res['models'] = await this.getModels();

    return res
      ? Promise.resolve(res)
      : Promise.reject({ statusCode: 404 });
  }

  // VERSIONS ---------------------------------------------------
  public async getVersion(filter?: any, resumed?: boolean, mySort?: any, myPagination?: any): Promise<any> {
    let myFilter = filter ? this.utils.convertIdToObjectId(filter) : {};
    let res;
    const offset = myPagination && myPagination.page ? (myPagination.page - 1) * myPagination.perpage : 0;
    const pageSize = myPagination && myPagination.page ? myPagination.perpage : null;

    try {
      res = await versionModel.find(myFilter).sort(mySort).skip(offset).limit(pageSize);
    } catch (error) {
      Promise.reject({ statusCode: 404 });
    }

    const resumedArray: Object[] = [];

    for (const item of res) {
      let resumedObj = {};

      if (resumed) {
        resumedObj = {
          _id: item['_id'],
          name: item['name']
        };
      }

      resumedArray.push(resumedObj);
    }
    
    return resumed
      ? Promise.resolve(resumedArray)
      : Promise.resolve(res);
  }

  public async setVersion(req: any, id?: string): Promise<Object> {
    let exists = id ? await this.getVersion({ _id: id }) : null;

    if (id && !exists) {
      return Promise.reject({ statusCode: 404 });
    }

    try {
      req.body.data = this.cryptoService.decodeJwt(req.body.data);
    } catch (error) {
      return Promise.reject({ statusCode: 401 });
    }

    if (req.body.data['model']) {
      req.body.data['model'] = this.utils.convertIdToObjectId(req.body.data['model'])
    }

    let res = {};

    const choosenYear = parseInt(req.body.data.year);
    delete req.body.data.year;

    if (exists) {
      if (choosenYear) {
        if (!exists[0].years || !exists[0].years.length) {
          req.body.data['years'] = [choosenYear];
        } else if (exists[0].years.indexOf(choosenYear) < 0) {
          req.body.data['years'] = [...new Set([...exists[0].years, ...[choosenYear]])];
        } else {
          req.body.data['years'] = exists[0].years || [];
        }
      }
      let modifiedPost = this.customerService.setCreatedAndModifierUser(req, exists);
      res['saved'] = await versionModel.findByIdAndUpdate({ _id: id }, modifiedPost, { new: true });
      // atualiza duplicações na collection de opinioes de carros
      const newVersion = {
        _id: res['saved']._id,
        engine: res['saved'].engine,
        fuel: res['saved'].fuel,
        gearbox: res['saved'].gearbox,
        years: res['saved'].years,
        complement: res['saved'].complement,
        image: res['saved'].image,
        thumb: res['saved'].thumb,
        active: res['saved'].active,
        review: res['saved'].review
      };
      this.customerService.updateMany(opinionCarModel, ['version'], res['saved'], newVersion);
    } else {
      if (choosenYear) {
        req.body.data['years'] = [choosenYear];
      }
      let createdPost = this.customerService.setCreatedAndModifierUser(req, exists, versionModel);
      delete createdPost.year;
      res['saved'] = await createdPost.save();
    }

    // res['versions'] = await this.getVersion();

    return Promise.resolve(res);
  }

  public async deleteVersion(id: string): Promise<Object> {
    let res = {};
    res['removed'] = await versionModel.findByIdAndDelete({ _id: id });
    res['versions'] = await this.getVersion();

    return res
      ? Promise.resolve(res)
      : Promise.reject({ statusCode: 404 });
  }

  // AVERAGE BRAND ---------------------------------------------------
  public async updateBrandAverage(changedOpinion: Object, operation: 'set' | 'delete', currentData?: any): Promise<void> {
    const brandId = changedOpinion['brand']['_id'];
    const brandAverage = changedOpinion['brand_val_average'];
    let carBrand = await this.getBrands({ _id: brandId });
    let newBrandValLenght: number;
    let newBrandAverage: number;

    switch (operation) {
      case 'set':
        newBrandValLenght = carBrand[0]['val_length'] + 1;
        newBrandAverage = ((carBrand[0]['average'] * carBrand[0]['val_length']) + brandAverage) / newBrandValLenght;
        break;
      case 'delete':
        newBrandValLenght = carBrand[0]['val_length'] - 1;
        newBrandAverage = ((carBrand[0]['average'] * carBrand[0]['val_length']) - brandAverage) / newBrandValLenght;
        break;
    }

    // Se houver inconsistencia na quantidade da média, refaz a média
    if (currentData && currentData['qtd'] != newBrandValLenght) {
      let brandSum = 0;

      currentData.opinions.forEach(
        opinion => {
          brandSum += opinion.brand_val_average;
        }
      );

      newBrandAverage = brandSum / currentData['qtd'];
      newBrandValLenght = currentData['qtd'];
    }
  
    const updateBrandPayload = {
      name: carBrand[0]['name'],
      image: carBrand[0]['image'],
      active: carBrand[0]['active'],
      review: carBrand[0]['review'],
      average: newBrandAverage,
      val_length: newBrandValLenght
    }

    const encodedBrand = this.cryptoService.encondeJwt(updateBrandPayload);
    const userIdBrand = carBrand[0]['modified_by'] ? carBrand[0]['modified_by']['_id'].toString() : null;
    const brandPayload = {body: {data: encodedBrand}};
    if (userIdBrand) {
      brandPayload['user'] = {_id: userIdBrand};
    }
    this.setBrand(brandPayload, brandId);
  }

  // AVERAGE MODEL ---------------------------------------------------
  public async updateModelAverage(changedOpinion: Object, operation: 'set' | 'delete', currentData?: any): Promise<void> {
    const modelId = changedOpinion['model']['_id'];
    const modelAverage = changedOpinion['car_val_average'];
    const carModel = await this.getModels({ _id: modelId });
    let newModelValLength: number;
    let newModelAverage: number;

    switch (operation) {
      case 'set':
        newModelValLength = carModel[0]['val_length'] + 1;
        newModelAverage = ((carModel[0]['average'] * carModel[0]['val_length']) + modelAverage) / newModelValLength;
        break;
      case 'delete':
        newModelValLength = carModel[0]['val_length'] - 1;
        newModelAverage = ((carModel[0]['average'] * carModel[0]['val_length']) - modelAverage) / newModelValLength;
        break;
    }

    // Se houver inconsistencia na quantidade da média, refaz a média
    if (currentData && currentData['qtd'] != newModelValLength) {
      let modelSum = 0;

      currentData.opinions.forEach(
        opinion => {
          modelSum += opinion.car_val_average;
        }
      );

      newModelAverage = modelSum / currentData['qtd'];
      newModelValLength = currentData['qtd'];
    }
  
    const updatedModelPayload = {
      name: carModel[0]['name'],
      brand: carModel[0]['brand']['_id'],
      image: carModel[0]['image'],
      thumb: carModel[0]['thumb'],
      active: carModel[0]['active'],
      review: carModel[0]['review'],
      average: newModelAverage,
      val_length: newModelValLength
    };

    if (carModel[0]['category']) {
      updatedModelPayload['category'] = carModel[0]['category']['_id'];
    }

    const encodedModel = this.cryptoService.encondeJwt(updatedModelPayload);
    const userIdModel = carModel[0]['modified_by'] ? carModel[0]['modified_by']['_id'].toString() : null;
    const modelPayload = {body: {data: encodedModel}};
    if (userIdModel) {
      modelPayload['user'] = {_id: userIdModel};
    }
    this.setModel(modelPayload, modelId);
  }
}