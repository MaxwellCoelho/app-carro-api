import { config } from '../config/config';
import { adsModel } from '../models/ads.model';
import { CryptoService, CustomerService } from '../services';
import { Utils } from '../utils/utils';

export class AdsService {
  public conf = config;

  constructor(
    private cryptoService: CryptoService,
    private utils: Utils,
    private customerService: CustomerService,
  ) { }

  public async getAds(filter?: any, sorted?: any, myPagination?: any): Promise<any> {
    let myFilter = filter ? this.utils.convertIdToObjectId(filter) : {};
    if (myFilter.keywords && myFilter.keywords.includes('generic')) {
      myFilter.keywords = [];
    }
    let mySort = sorted ? sorted : { _id: 'desc' };
    let res;
    const offset = myPagination && myPagination.page ? (myPagination.page - 1) * myPagination.perpage : 0;
    const pageSize = myPagination && myPagination.page ? myPagination.perpage : null;
    
    try {
      res = await adsModel.find(myFilter).sort(mySort).skip(offset).limit(pageSize);
    } catch (error) {
      Promise.reject({ statusCode: 404 });
    }

    return Promise.resolve({ads: res });
  }

  public async setAd(req: any, id?: string): Promise<Object> {
    let idExists = id ? await this.getAds({ _id: id }) : null;

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
      res['saved'] = await adsModel.findByIdAndUpdate({ _id: id }, modifiedPost, { new: true });
    } else {
      const createdPost = this.customerService.setCreatedAndModifierUser(req, idExists, adsModel);
      res['saved'] = await createdPost.save();
    }

    return Promise.resolve(res);
  }

  public async deleteAd(id: string): Promise<Object> {
    let res = {};
    res['removed'] = await adsModel.findByIdAndDelete({ _id: id });
    res['ads'] = await this.getAds();

    return res
      ? Promise.resolve(res)
      : Promise.reject({ statusCode: 404 });
  }
}