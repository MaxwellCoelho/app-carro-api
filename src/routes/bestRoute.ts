import { Request, Response } from 'express';
import { BestController } from '../controllers';


export class BestRoutes {

    constructor(private bestController: BestController) {}

    public route(app) {

        app.get(['/api/best/models'], 
            async (req: Request, res: Response) => this.bestController.returnBestModels(req, res));

        app.post('/api/best/models/filter', 
            async (req: Request, res: Response) => this.bestController.returnFilteredBestModels(req, res));
    }
}