import { Request, Response } from 'express';
import { FeedbackService } from '../services';

import { ResponseModule } from '../architecture/responseModule';
import { config } from '../config/config';

import { UDate } from '../utils/udate';

export class FeedbackController extends ResponseModule {
  private conf = config;

  constructor(
      private feedbackService: FeedbackService,
      private uDate: UDate,
    ) {
      super();
  }

  public async returnFeedback(req: Request, res: Response) {
    const id: string = req.params.id;
    let myFilter = id ? { _id: id } : {};

    try {
      const responseService = await this.feedbackService.getFeedbacks(myFilter);
      return this.success(res, { feedbacks: responseService });
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.errorHandler(error, res);
    }
  }

  public async saveFeedback(req: Request, res: Response) {
    const id: string = req.params.id;

    try {
      const responseService = await this.feedbackService.setFeedback(req, id);
      return this.success(res, responseService);
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.errorHandler(error, res);
    }
  }

  public async removeFeedback(req: Request, res: Response) {
    if (!req.isAuthenticated() || (req.isAuthenticated() && req.user['role'].level > 1)) {
      return this.unauthorized(res);
    }

    const id: string = req.params.id;

    try {
      const responseService = await this.feedbackService.deleteFeedback(id);
      return this.success(res, responseService);
    } catch (error) {
      this.uDate.timeConsoleLog('Erro ao chamar a api', error);
      return this.errorHandler(error, res);
    }
  }
  
}
