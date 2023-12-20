import { Request, Response } from 'express';
import { OpinionController } from '../controllers';


export class OpinionRoutes {

    constructor(private opinionController: OpinionController) {}

    public route(app) {

        app.get(['/api/opinion', '/api/opinion/:brand', '/api/opinion/:brand/:car'], 
            async (req: Request, res: Response) => this.opinionController.returnOpinion(req, res));

        app.post(['/api/opinion', '/api/opinion/:id'],
            async (req: Request, res: Response) => this.opinionController.saveOpinion(req, res));

        app.delete('/api/opinion/:id', 
            async (req: Request, res: Response) => this.opinionController.removeOpinion(req, res));
    }
}