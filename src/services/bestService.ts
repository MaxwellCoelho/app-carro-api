
import { CarService } from '../services';

export class BestService {

    constructor(
        private carService: CarService,
      ) { }

    public async getBestModels(): Promise<any> {
        const models = await this.carService.getModels(null, true);
        const sorted = models.sort((a, b) => parseFloat(b['average']) - parseFloat(a['average']));
        
        return sorted;
    }
}