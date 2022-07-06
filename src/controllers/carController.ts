import { Request, Response } from 'express';
import { CarService, CryptoService } from '../services';

import { ResponseModule } from '../architecture/responseModule';
import { config } from '../config/config';

import { UDate } from '../utils/udate';

export class CarController extends ResponseModule {
  private conf = config;

  constructor(
      private carService: CarService,
      public cryptoService: CryptoService,
      private uDate: UDate,
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

  public async saveCategory(req: Request, res: Response) {
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

  public async removeCategory(req: Request, res: Response) {
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

    try {
      const responseService = await this.carService.getBrands(id);
      return this.success(res, { brands: responseService });
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.errorHandler(error, res);
    }
  }

  public async saveBrand(req: Request, res: Response) {
    if (!req.isAuthenticated()) {
      return this.unauthorized(res);
    }

    const id: string = req.params.id;

    try {
      const responseService = await this.carService.setBrand(req, id);
      return this.success(res, responseService);
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.errorHandler(error, res);
    }
  }

  public async removeBrand(req: Request, res: Response) {
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
    let myFilter = req.body;
    console.log(myFilter);

    try {
      const responseService = await this.carService.getModels(myFilter);
      return this.success(res, { models: responseService });
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.errorHandler(error, res);
    }
  }

  public async saveModel(req: Request, res: Response) {
    if (!req.isAuthenticated()) {
      return this.unauthorized(res);
    }

    const id: string = req.params.id;
    
    try {
      const responseService = await this.carService.setModel(req, id);
      return this.success(res, responseService);
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.errorHandler(error, res);
    }
  }

  public async removeModel(req: Request, res: Response) {
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
  
}
