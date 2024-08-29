import { Request, Response } from 'express';
import { OpinionService, CryptoService } from '../services';

import { ResponseModule } from '../architecture/responseModule';
import { config } from '../config/config';

import { UDate, Utils } from '../utils';
import { CustomRequest } from "../architecture/definitionfile"

export class OpinionController extends ResponseModule {
  private conf = config;

  constructor(
      private opinionService: OpinionService,
      public cryptoService: CryptoService,
      private uDate: UDate,
      private utils: Utils,
    ) {
      super();
  }

  // BRAND ---------------------------------------------------
  public async returnBrandOpinion(req: Request, res: Response) {
    const brand: string = req.params.brand;
    let myFilter = {};
    let pagination = this.utils.returnPaginationObject(req);

    if (brand) {
      myFilter['brand._id'] = brand;
      myFilter['active'] = true;
    }

    try {
      const responseService = await this.opinionService.getBrandOpinions(myFilter, false, null, pagination);
      return this.success(res, responseService);
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.errorHandler(error, res);
    }
  }

  public async returnFilteredBrandOpinion(req: Request, res: Response) { 
    try {
      req.body.data = this.cryptoService.decodeJwt(req.body.data);
    } catch (error) {
      return Promise.reject({ statusCode: 401 });
    }

    let myFilter = req.body.data;
    let mySort = this.utils.returnSortObject(req);
    let pagination = this.utils.returnPaginationObject(req);

    try {
      const responseService = await this.opinionService.getBrandOpinions(myFilter, false, mySort, pagination);
      return this.success(res, responseService);
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.errorHandler(error, res);
    }
  }

  public async saveBrandOpinion(req: Request, res: Response) {
    // if (!req.isAuthenticated()) {
    //   return this.unauthorized(res);
    // }

    const id: string = req.params.id;

    try {
      const responseService = await this.opinionService.setBrandOpinions(req, id);
      return this.success(res, responseService);
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.errorHandler(error, res);
    }
  }

  public async removeBrandOpinion(req: CustomRequest, res: Response) {
    if (!req.isAuthenticated() || (req.isAuthenticated() && req.user['role'].level > 1)) {
      return this.unauthorized(res);
    }

    const id: string = req.params.id;

    try {
      const responseService = await this.opinionService.deleteBrandOpinion(id);
      return this.success(res, responseService);
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.errorHandler(error, res);
    }
  }

  // MODEL ---------------------------------------------------
  public async returnModelOpinion(req: Request, res: Response) {
    const brand: string = req.params.brand;
    const car: string = req.params.car;
    let myFilter = {};
    let pagination = this.utils.returnPaginationObject(req);

    if (brand && car) {
      myFilter['model.brand._id'] = brand;
      myFilter['model._id'] = car;
      myFilter['active'] = true;
    }

    try {
      let mySort = { _id: 'desc' };
      const responseService = await this.opinionService.getModelOpinions(myFilter, false, mySort, pagination);
      return this.success(res, responseService);
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.errorHandler(error, res);
    }
  }

  public async returnFilteredModelOpinion(req: Request, res: Response) { 
    try {
      req.body.data = this.cryptoService.decodeJwt(req.body.data);
    } catch (error) {
      return Promise.reject({ statusCode: 401 });
    }

    let myFilter = req.body.data;
    let mySort = this.utils.returnSortObject(req);
    let pagination = this.utils.returnPaginationObject(req);

    try {
      const responseService = await this.opinionService.getModelOpinions(myFilter, false, mySort, pagination);
      return this.success(res, responseService);
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.errorHandler(error, res);
    }
  }

  public async saveModelOpinion(req: Request, res: Response) {
    // if (!req.isAuthenticated()) {
    //   return this.unauthorized(res);
    // }

    const id: string = req.params.id;

    try {
      const responseService = await this.opinionService.setModelOpinions(req, id);
      return this.success(res, responseService);
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.errorHandler(error, res);
    }
  }

  public async removeModelOpinion(req: CustomRequest, res: Response) {
    if (!req.isAuthenticated() || (req.isAuthenticated() && req.user['role'].level > 1)) {
      return this.unauthorized(res);
    }

    const id: string = req.params.id;

    try {
      const responseService = await this.opinionService.deleteModelOpinion(id);
      return this.success(res, responseService);
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.errorHandler(error, res);
    }
  }
}
