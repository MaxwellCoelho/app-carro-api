import { Request, Response } from 'express';
import { CustomerService, CryptoService } from '../services';

import { ResponseModule } from '../architecture/responseModule';
import { config } from '../config/config';

import { UDate, Utils } from '../utils';
import { CustomRequest } from "../architecture/definitionfile"

export class CustomerController extends ResponseModule {
  private conf = config;

  constructor(
      private customerService: CustomerService,
      public cryptoService: CryptoService,
      private uDate: UDate,
      private utils: Utils,
    ) {
      super();
  }
  
  // CUSTOMERS ---------------------------------------------------
  public async returnCustomer(req: Request, res: Response) {
    const id: string = req.params.id;
    let myFilter = id ? { _id: id } : {};

    try {
      const responseService = await this.customerService.getCustomers(myFilter);
      return this.success(res, { customers: responseService });
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.errorHandler(error, res);
    }
  }

  public async returnFilteredCustomer(req: Request, res: Response) {
    try {
      req.body.data = this.cryptoService.decodeJwt(req.body.data);
    } catch (error) {
      return Promise.reject({ statusCode: 401 });
    }

    let myFilter = req.body.data;
    let mySort = this.utils.returnSortObject(req);
    let pagination = this.utils.returnPaginationObject(req);

    if (!Object.keys(mySort).length) {
      mySort = { _id: 'desc' };
    }

    try {
      const responseService = await this.customerService.getCustomers(myFilter, false, mySort, pagination);
      return this.success(res, { customers: responseService });
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.errorHandler(error, res);
    }
  }

  public async saveCustomer(req: Request, res: Response) {
    // if (!req.isAuthenticated() || (req.isAuthenticated() && req.user['role'].level > 1)) {
    //   return this.unauthorized(res);
    // }

    const id: string = req.params.id;

    try {
      const responseService = await this.customerService.setCustomer(req, id);
      return this.success(res, responseService);
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.errorHandler(error, res);
    }
  }

  public async removeCustomer(req: CustomRequest, res: Response) {
    if (!req.isAuthenticated() || (req.isAuthenticated() && req.user['role'].level > 1)) {
      return this.unauthorized(res);
    }

    const id: string = req.params.id;

    try {
      const responseService = await this.customerService.deleteCustomer(id);
      return this.success(res, responseService);
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.errorHandler(error, res);
    }
  }

  // ROLES ---------------------------------------------------
  public async returnRole(req: Request, res: Response) {
    const id: string = req.params.id;
    let myFilter = id ? { _id: id } : {};

    try {
      const responseService = await this.customerService.getRoles(myFilter);
      return this.success(res, { roles: responseService });
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.errorHandler(error, res);
    }
  }

  public async saveRole(req: Request, res: Response) {
    // if (!req.isAuthenticated() || (req.isAuthenticated() && req.user['role'].level > 1)) {
    //   return this.unauthorized(res);
    // }

    const id: string = req.params.id;

    try {
      const responseService = await this.customerService.setRole(req, id);
      return this.success(res, responseService);
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.errorHandler(error, res);
    }
  }

  public async removeRole(req: CustomRequest, res: Response) {
    if (!req.isAuthenticated() || (req.isAuthenticated() && req.user['role'].level > 1)) {
      return this.unauthorized(res);
    }
    
    const id: string = req.params.id;

    try {
      const responseService = await this.customerService.deleteRole(id);
      return this.success(res, responseService);
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.errorHandler(error, res);
    }
  }
  
}
