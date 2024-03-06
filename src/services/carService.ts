import { config } from '../config/config';
import { categoryModel, brandModel, modelModel, versionModel } from '../models/car.model';
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
      res['saved'] = await categoryModel.findByIdAndUpdate({ _id: id }, modifiedPost, { new: true });
    } else {
      const createdPost = this.customerService.setCreatedAndModifierUser(req, exists, categoryModel);
      res['saved'] = await createdPost.save();
    }

    res['categories'] = await this.getCategories();

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
    let myFilter = filter ? filter : {};
    let res;
    const offset = myPagination && myPagination.page ? (myPagination.page - 1) * myPagination.perpage : 0;
    const pageSize = myPagination && myPagination.page ? myPagination.perpage : null;

    try {
      res = await brandModel.find(myFilter).sort(mySort).skip(offset).limit(pageSize);
    } catch (error) {
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
      res['saved'] = await brandModel.findByIdAndUpdate({ _id: id }, modifiedPost, { new: true });
    } else {
      let createdPost = this.customerService.setCreatedAndModifierUser(req, exists, brandModel);
      createdPost['url'] = this.utils.sanitizeText(createdPost.name);
      createdPost['average'] = 0;
      createdPost['val_length'] = 0;
      res['saved'] = await createdPost.save();
    }

    res['brands'] = await this.getBrands();

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
    let myFilter = filter ? filter : {};
    let res;
    const offset = myPagination && myPagination.page ? (myPagination.page - 1) * myPagination.perpage : 0;
    const pageSize = myPagination && myPagination.page ? myPagination.perpage : null;

    try {
      res = await modelModel.find(myFilter).sort(mySort).skip(offset).limit(pageSize);
    } catch (error) {
      Promise.reject({ statusCode: 404 });
    }

    const resumedArray: Object[] = [];

    for (const item of res) {
      let resumedObj = {};

      if (resumed) {
        resumedObj = {
          name: item['name'],
          image: item['image'],
          thumb: item['thumb'],
          url: item['url'],
          average: item['average'],
          val_length: item['val_length'],
        };
      }

      await this.getBrands({ _id: item.brand }).then(brand => {
        if (brand[0]) {
          if (resumed) {
            resumedObj['brand'] = {
              name: brand[0]['name'],
              image: brand[0]['image'],
              url: brand[0]['url'],
            }
          } else {
            item.brand = brand[0];
          }
        }
      });
      
      await this.getCategories(item.category).then(category => {
        if (category[0]) {
          if (resumed) {
            resumedObj['category'] = category[0]['name'];
          } else {
            item.category = category[0];
          }
        }
      });

      resumedArray.push(resumedObj);
    }
    
    return resumed
      ? Promise.resolve(resumedArray)
      : this.customerService.returnWithCreatedAndModifierUser(res);
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
      res['saved'] = await modelModel.findByIdAndUpdate({ _id: id }, modifiedPost, { new: true });
    } else {
      let createdPost = this.customerService.setCreatedAndModifierUser(req, exists, modelModel);
      createdPost['url'] = this.utils.sanitizeText(createdPost.name);
      createdPost['average'] = 0;
      createdPost['val_length'] = 0;
      res['saved'] = await createdPost.save();
    }

    res['models'] = await this.getModels();

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
    let myFilter = filter ? filter : {};
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

      await this.getModels({ _id: item.model }).then(model => {
        if (model[0]) {
          if (resumed) {
            resumedObj['model'] = {
              _id: model[0]['_id'],
              name: model[0]['name']
            }
          } else {
            item.model = model[0];
          }
        }
      });

      resumedArray.push(resumedObj);
    }
    
    return resumed
      ? Promise.resolve(resumedArray)
      : this.customerService.returnWithCreatedAndModifierUser(res);
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

    let res = {};

    if (exists) {
      let modifiedPost = this.customerService.setCreatedAndModifierUser(req, exists);
      res['saved'] = await versionModel.findByIdAndUpdate({ _id: id }, modifiedPost, { new: true });
    } else {
      let createdPost = this.customerService.setCreatedAndModifierUser(req, exists, versionModel);
      res['saved'] = await createdPost.save();
    }

    res['versions'] = await this.getModels();

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

  // AVERAGE ---------------------------------------------------
  public async updateAverage(changedOpinion: Object, operation: 'set' | 'delete', currentData?: any): Promise<void> {
    // BRAND -------------------------------------------------------------
    const brandId = changedOpinion['brand'];
    const brandAverage = changedOpinion['brand_val_average'];
    let carBrand = await this.getBrands({ _id: brandId });
    let newBrandValLenght: number;
    let newBrandAverage: number;

    // MODEL -------------------------------------------------------------
    const modelId = changedOpinion['model'];
    const modelAverage = changedOpinion['car_val_average'];
    const carModel = await this.getModels({ _id: modelId });
    let newModelValLength: number;
    let newModelAverage: number;

    // BRAND AND MODEL -------------------------------------------------------------
    switch (operation) {
      case 'set':
        newBrandValLenght = carBrand[0]['val_length'] + 1;
        newBrandAverage = ((carBrand[0]['average'] * carBrand[0]['val_length']) + brandAverage) / newBrandValLenght;

        newModelValLength = carModel[0]['val_length'] + 1;
        newModelAverage = ((carModel[0]['average'] * carModel[0]['val_length']) + modelAverage) / newModelValLength;
        break;
      case 'delete':
        newBrandValLenght = carBrand[0]['val_length'] - 1;
        newBrandAverage = ((carBrand[0]['average'] * carBrand[0]['val_length']) - brandAverage) / newBrandValLenght;

        newModelValLength = carModel[0]['val_length'] - 1;
        newModelAverage = ((carModel[0]['average'] * carModel[0]['val_length']) - modelAverage) / newModelValLength;
        break;
    }

    // Se houver inconsistencia na quantidade da média, refaz a média
    if (currentData && currentData['qtd'] != newModelValLength) {
      let brandSum = 0;
      let modelSum = 0;

      currentData.opinions.forEach(
        opinion => {
          brandSum += opinion.brand_val_average;
          modelSum += opinion.car_val_average;
        }
      );

      newBrandAverage = brandSum / currentData['qtd'];
      newBrandValLenght = currentData['qtd'];
      newModelAverage = modelSum / currentData['qtd'];
      newModelValLength = currentData['qtd'];
    }
  
    // BRAND -------------------------------------------------------------
    const updateBrandPayload = {
      name: carBrand[0]['name'],
      image: carBrand[0]['image'],
      active: carBrand[0]['active'],
      review: carBrand[0]['review'],
      average: newBrandAverage,
      val_length: newBrandValLenght
    }

    const encodedBrand = this.cryptoService.encondeJwt(updateBrandPayload);
    const userIdBrand = carBrand[0]['modified_by']['id'].toString();
    this.setBrand({body: {data: encodedBrand}, user: {id: userIdBrand}}, brandId);

    // MODEL -------------------------------------------------------------
    const updatedModelPayload = {
      name: carModel[0]['name'],
      category: carModel[0]['category']['_id'],
      brand: carModel[0]['brand']['_id'],
      image: carModel[0]['image'],
      thumb: carModel[0]['thumb'],
      active: carModel[0]['active'],
      review: carModel[0]['review'],
      average: newModelAverage,
      val_length: newModelValLength
    };

    const encodedModel = this.cryptoService.encondeJwt(updatedModelPayload);
    const userIdModel = carModel[0]['modified_by']['id'].toString();
    this.setModel({body: {data: encodedModel}, user: {id: userIdModel}}, modelId);
  }

}