import { config } from '../config/config';
import { feedbackModel } from '../models/feedback.model';
import { CryptoService, CustomerService } from '../services';
import { Utils } from '../utils/utils';

export class FeedbackService {
  public conf = config;

  constructor(
    private cryptoService: CryptoService,
    private utils: Utils,
    private customerService: CustomerService,
  ) { }

  public async getFeedbacks(filter?: any): Promise<any> {
    let myFilter = filter ? this.utils.convertIdToObjectId(filter) : {};
    let res;
    
    try {
      res = await feedbackModel.find(myFilter).sort({ _id: 'desc' });
    } catch (error) {
      Promise.reject({ statusCode: 404 });
    }

    return Promise.resolve(res);
  }

  public async setFeedback(req: any, id?: string): Promise<Object> {
    let idExists = id ? await this.getFeedbacks({ _id: id }) : null;

    if (id && !idExists) {
      return Promise.reject({ statusCode: 404 });
    }

    try {
      req.body.data = this.cryptoService.decodeJwt(req.body.data);
    } catch (error) {
      return Promise.reject({ statusCode: 401 });
    }

    let res = {};

    if (idExists) {
      const modifiedPost = this.customerService.setCreatedAndModifierUser(req, idExists);
      res['saved'] = await feedbackModel.findByIdAndUpdate({ _id: id }, modifiedPost, { new: true });
    } else {
      const createdPost = this.customerService.setCreatedAndModifierUser(req, idExists, feedbackModel);
      res['saved'] = await createdPost.save();
    }

    return Promise.resolve(res);
  }

  public async deleteFeedback(id: string): Promise<Object> {
    let res = {};
    res['removed'] = await feedbackModel.findByIdAndDelete({ _id: id });
    res['feedbacks'] = await this.getFeedbacks();

    return res
      ? Promise.resolve(res)
      : Promise.reject({ statusCode: 404 });
  }
}