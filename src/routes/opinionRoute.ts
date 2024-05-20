import { Request, Response } from 'express';
import { OpinionController } from '../controllers';


export class OpinionRoutes {

    constructor(private opinionController: OpinionController) {}

    public route(app) {

        // BRAND ---------------------------------------------------
        app.get(['/api/opinion/brand', '/api/opinion/brand/:brand'], 
            async (req: Request, res: Response) => this.opinionController.returnBrandOpinion(req, res));

        app.post('/api/opinion/brand/filter', 
            async (req: Request, res: Response) => this.opinionController.returnFilteredBrandOpinion(req, res));

        app.post(['/api/opinion/brand', '/api/opinion/brand/:id'],
            async (req: Request, res: Response) => this.opinionController.saveBrandOpinion(req, res));

        app.delete('/api/opinion/brand/:id', 
            async (req: Request, res: Response) => this.opinionController.removeBrandOpinion(req, res));
        
        // MODEL ---------------------------------------------------
        app.get(['/api/opinion/model', '/api/opinion/model/:brand/:car'], 
            async (req: Request, res: Response) => this.opinionController.returnModelOpinion(req, res));

        app.post('/api/opinion/model/filter', 
            async (req: Request, res: Response) => this.opinionController.returnFilteredModelOpinion(req, res));

        app.post(['/api/opinion/model', '/api/opinion/model/:id'],
            async (req: Request, res: Response) => this.opinionController.saveModelOpinion(req, res));

        app.delete('/api/opinion/model/:id', 
            async (req: Request, res: Response) => this.opinionController.removeModelOpinion(req, res));
    }
}