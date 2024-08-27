import { Request, Response } from 'express';
import { CustomerService, CryptoService } from '../services';

import { ResponseModule } from '../architecture/responseModule';
import { config } from '../config/config';

import { UDate } from '../utils/udate';

export class CustomerController extends ResponseModule {
  private conf = config;

  constructor(
      private customerService: CustomerService,
      public cryptoService: CryptoService,
      private uDate: UDate,
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
    let mySort = {};
    let pagination = {}; 
    if (req.query['page'] && req.query['perpage']) {
      pagination = {
          page: Number(req.query['page']),
          perpage: Number(req.query['perpage'])
      }
    } 

    const queryArr = req.query ? Object.entries(req.query) : [];
    queryArr.forEach(param => {
      if (param[0].includes('sort.')) {
        const paramName = param[0].split('.')[1];
        mySort = {[paramName]: param[1]};
      }
    });

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

  public async removeCustomer(req: Request, res: Response) {
    // if (!req.isAuthenticated() || (req.isAuthenticated() && req.user['role'].level > 1)) {
    //   return this.unauthorized(res);
    // }

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

  public async removeRole(req: Request, res: Response) {
    // if (!req.isAuthenticated() || (req.isAuthenticated() && req.user['role'].level > 1)) {
    //   return this.unauthorized(res);
    // }
    
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
