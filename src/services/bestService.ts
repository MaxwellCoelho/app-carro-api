
import { OpinionService } from '../services';

export class BestService {

    constructor(
        private opinionService: OpinionService,
      ) { }

    public async getBest(): Promise<any> {
        const opinions = this.opinionService.getOpinions(null, true);
        return opinions;
    }
}