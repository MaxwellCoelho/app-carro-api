import { Request, Response } from 'express';
import { CustomerService } from '../services';

import { ResponseModule } from '../architecture/responseModule';
import { config } from '../config/config';

import { UDate } from '../utils/udate';

export class CustomerController extends ResponseModule {
  private conf = config;

  constructor(
      private customerService: CustomerService,
      private uDate: UDate,
    ) {
      super();
  }

  public async returnCustomers(req: Request, res: Response) {
    try {
      const responseService = await this.customerService.getCustomers();
      return this.success(res, responseService);
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.internalServerError(res);
    }
  }

  public async saveCustomer(req: Request, res: Response) {
    try {
      const responseService = await this.customerService.setCustomer(req.body);
      return this.success(res, responseService);
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.internalServerError(res);
    }
  }

  public async returnRoles(req: Request, res: Response) {
    try {
      const responseService = await this.customerService.getRoles();
      return this.success(res, responseService);
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.internalServerError(res);
    }
  }

  public async saveRole(req: Request, res: Response) {
    try {
      const responseService = await this.customerService.setRole(req.body);
      return this.success(res, responseService);
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.internalServerError(res);
    }
  }
  
}
