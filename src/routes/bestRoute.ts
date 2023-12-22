import { Request, Response } from 'express';
import { BestController } from '../controllers';


export class BestRoutes {

    constructor(private bestController: BestController) {}

    public route(app) {

        app.get(['/api/best'], 
            async (req: Request, res: Response) => this.bestController.returnBest(req, res));
    }
}