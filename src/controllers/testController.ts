import { Request, Response } from 'express';
import { TestService } from '../services';

import { ResponseModule } from '../architecture/responseModule';
import { config } from '../config/config';

import { UDate } from '../utils/udate';

export class TestController extends ResponseModule {
  private conf = config;

  constructor(
      private testService: TestService,
      private uDate: UDate,
    ) {
      super();
  }

  public createTest(req: Request, res: Response) {
    try {
      const currentTime = this.uDate.getCurrentDateTimeString();
      const responseService = this.testService.getTest(currentTime);
      const responseModel = {
        "message": responseService,
        "statusCode": 200
      }
      
      return this.success(res, responseModel);

    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.internalServerError(res);
    }
  }
  
}
