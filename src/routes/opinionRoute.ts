import { Request, Response } from 'express';
import { OpinionController } from '../controllers';


export class OpinionRoutes {

    constructor(private opinionController: OpinionController) {}

    public route(app) {

        // BRAND ---------------------------------------------------
        app.get(['/opinion/brand', '/opinion/brand/:brand'], 
            async (req: Request, res: Response) => this.opinionController.returnBrandOpinion(req, res));

        app.post(['/opinion/brand', '/opinion/brand/:id'],
            async (req: Request, res: Response) => this.opinionController.saveBrandOpinion(req, res));

        app.delete('/opinion/brand/:id', 
            async (req: Request, res: Response) => this.opinionController.removeBrandOpinion(req, res));
        
        // MODEL ---------------------------------------------------
        app.get(['/opinion/model', '/opinion/model/:brand/:car'], 
            async (req: Request, res: Response) => this.opinionController.returnModelOpinion(req, res));

        app.post(['/opinion/model', '/opinion/model/:id'],
            async (req: Request, res: Response) => this.opinionController.saveModelOpinion(req, res));

        app.delete('/opinion/model/:id', 
            async (req: Request, res: Response) => this.opinionController.removeModelOpinion(req, res));
    }
}