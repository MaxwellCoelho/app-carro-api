import { Request, Response } from 'express';
import { CarService } from '../services';

import { ResponseModule } from '../architecture/responseModule';
import { config } from '../config/config';

import { UDate } from '../utils/udate';

export class CarController extends ResponseModule {
  private conf = config;

  constructor(
      private carService: CarService,
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
      return this.internalServerError(res);
    }
  }

  public async saveCategory(req: Request, res: Response) {
    const id: string = req.params.id;

    try {
      const currentTime = this.uDate.getCurrentDateTimeString();
      const responseService = await this.carService.setCategory(req.body, currentTime, id);
      return this.success(res, { saved: responseService });
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.internalServerError(res);
    }
  }

  public async removeCategory(req: Request, res: Response) {
    const id: string = req.params.id;

    try {
      const responseService = await this.carService.deleteCategory(id);
      return this.success(res, { removed: responseService });
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.notFound(res);
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
      return this.internalServerError(res);
    }
  }

  public async saveBrand(req: Request, res: Response) {
    const id: string = req.params.id;

    try {
      const currentTime = this.uDate.getCurrentDateTimeString();
      const responseService = await this.carService.setBrand(req.body, currentTime, id);
      return this.success(res, { saved: responseService });
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.internalServerError(res);
    }
  }

  public async removeBrand(req: Request, res: Response) {
    const id: string = req.params.id;

    try {
      const responseService = await this.carService.deleteBrand(id);
      return this.success(res, { removed: responseService });
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.notFound(res);
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
      return this.internalServerError(res);
    }
  }

  public async saveModel(req: Request, res: Response) {
    const id: string = req.params.id;

    try {
      const currentTime = this.uDate.getCurrentDateTimeString();
      const responseService = await this.carService.setModel(req.body, currentTime, id);
      return this.success(res, { saved: responseService });
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.internalServerError(res);
    }
  }

  public async removeModel(req: Request, res: Response) {
    const id: string = req.params.id;

    try {
      const responseService = await this.carService.deleteModel(id);
      return this.success(res, { removed: responseService });
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.notFound(res);
    }
  }
  
}
