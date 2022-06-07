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
      return error.statusCode === 404 ? this.notFound(res) : this.internalServerError(res);
    }
  }

  public async saveCategory(req: Request, res: Response) {
    if (!req.isAuthenticated()) {
      return this.unauthorized(res);
    }

    const id: string = req.params.id;
    let categoryData;

    try {
      categoryData = this.cryptoService.decodeJwt(req.body.categoryData);
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.unauthorized(res);
    }

    try {
      const currentTime = this.uDate.getCurrentDateTimeString();
      const responseService = await this.carService.setCategory(categoryData, currentTime, id);
      return this.success(res, responseService);
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return error.statusCode === 404 ? this.notFound(res) : this.internalServerError(res);
    }
  }

  public async removeCategory(req: Request, res: Response) {
    if (!req.isAuthenticated()) {
      return this.unauthorized(res);
    }

    const id: string = req.params.id;

    try {
      const responseService = await this.carService.deleteCategory(id);
      return this.success(res, responseService);
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return error.statusCode === 404 ? this.notFound(res) : this.internalServerError(res);
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
      return error.statusCode === 404 ? this.notFound(res) : this.internalServerError(res);
    }
  }

  public async saveBrand(req: Request, res: Response) {
    if (!req.isAuthenticated()) {
      return this.unauthorized(res);
    }

    const id: string = req.params.id;
    let brandData;

    try {
      brandData = this.cryptoService.decodeJwt(req.body.brandData);
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.unauthorized(res);
    }

    try {
      const currentTime = this.uDate.getCurrentDateTimeString();
      const responseService = await this.carService.setBrand(brandData, currentTime, id);
      return this.success(res, responseService);
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return error.statusCode === 404 ? this.notFound(res) : this.internalServerError(res);
    }
  }

  public async removeBrand(req: Request, res: Response) {
    if (!req.isAuthenticated()) {
      return this.unauthorized(res);
    }

    const id: string = req.params.id;

    try {
      const responseService = await this.carService.deleteBrand(id);
      return this.success(res, responseService);
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return error.statusCode === 404 ? this.notFound(res) : this.internalServerError(res);
    }
  }

  // MODELS ---------------------------------------------------
  public async returnModel(req: Request, res: Response) {
    const id: string = req.params.id;

    try {
      const responseService = await this.carService.getModels(id);
      return this.success(res, { models: responseService });
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return error.statusCode === 404 ? this.notFound(res) : this.internalServerError(res);
    }
  }

  public async saveModel(req: Request, res: Response) {
    if (!req.isAuthenticated()) {
      return this.unauthorized(res);
    }

    const id: string = req.params.id;
    let modelData;

    try {
      modelData = this.cryptoService.decodeJwt(req.body.modelData);
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.unauthorized(res);
    }

    try {
      const currentTime = this.uDate.getCurrentDateTimeString();
      const responseService = await this.carService.setModel(modelData, currentTime, id);
      return this.success(res, responseService);
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return error.statusCode === 404 ? this.notFound(res) : this.internalServerError(res);
    }
  }

  public async removeModel(req: Request, res: Response) {
    if (!req.isAuthenticated()) {
      return this.unauthorized(res);
    }
    
    const id: string = req.params.id;

    try {
      const responseService = await this.carService.deleteModel(id);
      return this.success(res, responseService);
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return error.statusCode === 404 ? this.notFound(res) : this.internalServerError(res);
    }
  }
  
}
