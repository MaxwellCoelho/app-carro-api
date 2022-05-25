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
  
  // CUSTOMERS ---------------------------------------------------
  public async returnCustomer(req: Request, res: Response) {
    const id: string = req.params.id;

    try {
      const responseService = await this.customerService.getCustomers(id);
      return this.success(res, { customers: responseService });
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.internalServerError(res);
    }
  }

  public async saveCustomer(req: Request, res: Response) {
    const id: string = req.params.id;

    try {
      const responseService = await this.customerService.setCustomer(req.body, id);
      return this.success(res, { saved: responseService });
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.internalServerError(res);
    }
  }

  public async removeCustomer(req: Request, res: Response) {
    const id: string = req.params.id;

    try {
      const responseService = await this.customerService.deleteCustomer(id);
      return this.success(res, { removed: responseService });
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.notFound(res);
    }
  }

  // ROLES ---------------------------------------------------
  public async returnRole(req: Request, res: Response) {
    const id: string = req.params.id;

    try {
      const responseService = await this.customerService.getRoles(id);
      return this.success(res, { roles: responseService });
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return error.statusCode === 404 ? this.notFound(res) : this.internalServerError(res);
    }
  }

  public async saveRole(req: Request, res: Response) {
    const id: string = req.params.id;

    try {
      const responseService = await this.customerService.setRole(req.body, id);
      return this.success(res, responseService);
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return error.statusCode === 404 ? this.notFound(res) : this.internalServerError(res);
    }
  }

  public async removeRole(req: Request, res: Response) {
    const id: string = req.params.id;

    try {
      const responseService = await this.customerService.deleteRole(id);
      return this.success(res, responseService);
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.notFound(res);
    }
  }
  
}
