import { Response } from 'express';
import { statusCode as statusCodeIds, errorMessages } from '../domain';

interface IControllerResponse {
    success(res: Response, model: any): void;
    internalServerError(res: Response, model: any): void;
    unauthorized(res: Response, model: any): void;
    forbidden(res: Response, model: any): void;
    genericMessage(res: Response, code: any, model: any): void;
}

export abstract class ResponseModule implements IControllerResponse {

    private buildModel = (statusCode, message, model) => ({message, ...model, statusCode});

    public success(res: Response, model: any = {}) {
        const defaultModel = this.buildModel(statusCodeIds.success, errorMessages.success, model);
        return res.status(statusCodeIds.success).send(defaultModel);
    }

    public internalServerError(res: Response, model: any = {}) {
        const defaultModel = this.buildModel(statusCodeIds.server_error, errorMessages.internalServerError, model);
        return res.status(statusCodeIds.server_error).send(defaultModel);
    }

    public unauthorized(res: Response, model: any = {}) {
        const defaultModel = this.buildModel(statusCodeIds.unauthorized, errorMessages.acesso_negado, model);
        return res.status(statusCodeIds.unauthorized).send(defaultModel);
    }

    public forbidden(res: Response, model: any = {}) {
        const defaultModel = this.buildModel(statusCodeIds.forbidden, errorMessages.proibido, model);
        return res.status(statusCodeIds.forbidden).send(defaultModel);
    }

    public badRequest(res: Response, model: any = {}) {
        const defaultModel = this.buildModel(statusCodeIds.bad_request, errorMessages.badrequest, model);
        return res.status(statusCodeIds.bad_request).send(defaultModel);
    }

    public notFound(res: Response, model: any = {}) {
        const defaultModel = this.buildModel(statusCodeIds.not_found, errorMessages.notfound, model);
        return res.status(statusCodeIds.not_found).send(defaultModel);
    }

    public conflict(res: Response, model: any = {}) {
      const defaultModel = this.buildModel(statusCodeIds.not_found, errorMessages.conflict, model);
      return res.status(statusCodeIds.conflict).send(defaultModel);
  }

    public genericMessage(res: Response, code: any, model: any) {
        return res.status(code).send(model);
    }

    public errorHandler(error, res): any {
        switch (error.statusCode) {
          case statusCodeIds.unauthorized:
            return this.unauthorized(res);
          case statusCodeIds.forbidden:
            return this.forbidden(res);
          case statusCodeIds.bad_request:
            return this.badRequest(res);
          case statusCodeIds.not_found: 
            return this.notFound(res);
          case statusCodeIds.conflict: 
            return this.conflict(res);
          default:
            return this.internalServerError(res);
        }
      }

}
