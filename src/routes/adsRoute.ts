import { Request, Response } from 'express';
import { AdsController } from '../controllers';


export class AdsRoutes {

    constructor(private adsController: AdsController) {}

    public route(app) {
        app.get(['/api/ads', '/api/ads/:id'],
            async (req: Request, res: Response) => this.adsController.returnAds(req, res));

        app.post('/api/ads/filter', 
            async (req: Request, res: Response) => this.adsController.returnFilteredAds(req, res));
            
        app.post(['/api/ads', '/api/ads/:id'],
            async (req: Request, res: Response) => this.adsController.saveAd(req, res));

        app.delete('/api/ads/:id', 
            async (req: Request, res: Response) => this.adsController.removeAd(req, res));
    }
}