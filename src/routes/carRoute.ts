import { Request, Response } from 'express';
import { CarController } from '../controllers';


export class CarRoutes {

    constructor(private carController: CarController) {}

    public route(app) {
        app.get('/api/cars/categories', 
            async (req: Request, res: Response) => this.carController.returnCategories(req, res));

        app.get('/api/cars/brands', 
            async (req: Request, res: Response) => this.carController.returnBrands(req, res));
        
        app.get('/api/cars/models', 
            async (req: Request, res: Response) => this.carController.returnModels(req, res));
    }
}
