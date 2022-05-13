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

  public async returnCategories(req: Request, res: Response) {
    try {
      const responseService = await this.carService.getCategories();
      return this.success(res, responseService);
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.internalServerError(res);
    }
  }

  public async saveCategory(req: Request, res: Response) {
    try {
      const responseService = await this.carService.setCategory(req.body);
      return this.success(res, responseService);
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.internalServerError(res);
    }
  }

  public async returnBrands(req: Request, res: Response) {
    try {
      const responseService = await this.carService.getBrands();
      return this.success(res, responseService);
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.internalServerError(res);
    }
  }

  public async saveBrand(req: Request, res: Response) {
    try {
      const responseService = await this.carService.setBrand(req.body);
      return this.success(res, responseService);
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.internalServerError(res);
    }
  }

  public async returnModels(req: Request, res: Response) {
    try {
      const responseService = await this.carService.getModels();
      return this.success(res, responseService);
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.internalServerError(res);
    }
  }

  public async saveModel(req: Request, res: Response) {
    try {
      const responseService = await this.carService.setModel(req.body);
      return this.success(res, responseService);
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.internalServerError(res);
    }
  }
  
}
