import { Request, Response } from 'express';
import { CarService, CryptoService } from '../services';

import { ResponseModule } from '../architecture/responseModule';
import { config } from '../config/config';

import { UDate, Utils } from '../utils';
import { CustomRequest } from "../architecture/definitionfile"

export class CarController extends ResponseModule {
  private conf = config;

  constructor(
      private carService: CarService,
      public cryptoService: CryptoService,
      private uDate: UDate,
      private utils: Utils,
    ) {
      super();
  }

  // CATEGORIES ---------------------------------------------------
  public async returnCategory(req: Request, res: Response) {
    const id: string = req.params.id;

    try {
      const responseService = await this.carService.getCategories(id);
      return this.success(res, { categories: responseService });
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.errorHandler(error, res);
    }
  }

  public async saveCategory(req: CustomRequest, res: Response) {
    if (!req.isAuthenticated()) {
      return this.unauthorized(res);
    }

    const id: string = req.params.id;

    try {
      const responseService = await this.carService.setCategory(req, id);
      return this.success(res, responseService);
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.errorHandler(error, res);
    }
  }

  public async removeCategory(req: CustomRequest, res: Response) {
    if (!req.isAuthenticated() || (req.isAuthenticated() && req.user['role'].level > 1)) {
      return this.unauthorized(res);
    }

    const id: string = req.params.id;

    try {
      const responseService = await this.carService.deleteCategory(id);
      return this.success(res, responseService);
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.errorHandler(error, res);
    }
  }

  // BRANDS ---------------------------------------------------
  public async returnBrand(req: Request, res: Response) {
    const id: string = req.params.id;
    let myFilter = id ? { _id: id } : {};

    try {
      const responseService = await this.carService.getBrands(myFilter);
      return this.success(res, { brands: responseService });
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.errorHandler(error, res);
    }
  }

  public async returnFilteredBrand(req: Request, res: Response) { 
    try {
      req.body.data = this.cryptoService.decodeJwt(req.body.data);
    } catch (error) {
      return Promise.reject({ statusCode: 401 });
    }

    let myFilter = req.body.data;
    let mySort = this.utils.returnSortObject(req);
    let pagination = this.utils.returnPaginationObject(req);

    try {
      const responseService = await this.carService.getBrands(myFilter, mySort, pagination);
      return this.success(res, { brands: responseService });
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.errorHandler(error, res);
    }
  }

  public async saveBrand(req: Request, res: Response) {
    const id: string = req.params.id;

    try {
      const responseService = await this.carService.setBrand(req, id);
      return this.success(res, responseService);
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.errorHandler(error, res);
    }
  }

  public async removeBrand(req: CustomRequest, res: Response) {
    if (!req.isAuthenticated() || (req.isAuthenticated() && req.user['role'].level > 1)) {
      return this.unauthorized(res);
    }

    const id: string = req.params.id;

    try {
      const responseService = await this.carService.deleteBrand(id);
      return this.success(res, responseService);
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.errorHandler(error, res);
    }
  }

  // MODELS ---------------------------------------------------
  public async returnModel(req: Request, res: Response) {
    const id: string = req.params.id;
    let myFilter = id ? { _id: id } : {};

    try {
      const responseService = await this.carService.getModels(myFilter);
      return this.success(res, { models: responseService });
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.errorHandler(error, res);
    }
  }

  public async returnFilteredModel(req: Request, res: Response) { 
    try {
      req.body.data = this.cryptoService.decodeJwt(req.body.data);
    } catch (error) {
      return Promise.reject({ statusCode: 401 });
    }

    let myFilter = req.body.data;
    let mySort = this.utils.returnSortObject(req);
    let pagination = this.utils.returnPaginationObject(req);

    try {
      const responseService = await this.carService.getModels(myFilter, false, mySort, pagination);
      return this.success(res, { models: responseService });
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.errorHandler(error, res);
    }
  }

  public async saveModel(req: Request, res: Response) {
    const id: string = req.params.id;
    
    try {
      const responseService = await this.carService.setModel(req, id);
      return this.success(res, responseService);
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.errorHandler(error, res);
    }
  }

  public async removeModel(req: CustomRequest, res: Response) {
    if (!req.isAuthenticated() || (req.isAuthenticated() && req.user['role'].level > 1)) {
      return this.unauthorized(res);
    }
    
    const id: string = req.params.id;

    try {
      const responseService = await this.carService.deleteModel(id);
      return this.success(res, responseService);
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.errorHandler(error, res);
    }
  }
  
  // VERSIONS ---------------------------------------------------
  public async returnVersion(req: Request, res: Response) {
    const id: string = req.params.id;
    let myFilter = id ? { _id: id } : {};

    try {
      const responseService = await this.carService.getVersion(myFilter);
      return this.success(res, { versions: responseService });
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.errorHandler(error, res);
    }
  }

  public async returnFilteredVersion(req: Request, res: Response) { 
    try {
      req.body.data = this.cryptoService.decodeJwt(req.body.data);
    } catch (error) {
      return Promise.reject({ statusCode: 401 });
    }

    let myFilter = req.body.data;
    let mySort = this.utils.returnSortObject(req);
    let pagination = this.utils.returnPaginationObject(req);

    try {
      const responseService = await this.carService.getVersion(myFilter, false, mySort, pagination);
      return this.success(res, { versions: responseService });
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.errorHandler(error, res);
    }
  }

  public async saveVersion(req: Request, res: Response) {
    const id: string = req.params.id;
    
    try {
      const responseService = await this.carService.setVersion(req, id);
      return this.success(res, responseService);
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.errorHandler(error, res);
    }
  }

  public async removeVersion(req: CustomRequest, res: Response) {
    if (!req.isAuthenticated() || (req.isAuthenticated() && req.user['role'].level > 1)) {
      return this.unauthorized(res);
    }
    
    const id: string = req.params.id;

    try {
      const responseService = await this.carService.deleteVersion(id);
      return this.success(res, responseService);
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.errorHandler(error, res);
    }
  }
}
