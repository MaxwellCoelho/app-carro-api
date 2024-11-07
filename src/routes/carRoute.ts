import { Request, Response } from 'express';
import { CarController } from '../controllers';
import { CustomRequest } from "../architecture/definitionfile"


export class CarRoutes {

    constructor(private carController: CarController) {}

    public route(app) {
        // CATEGORIES ---------------------------------------------------
        app.get(['/api/cars/categories', '/api/cars/categories/:id'], 
            async (req: Request, res: Response) => this.carController.returnCategory(req, res));

        app.post(['/api/cars/categories', '/api/cars/categories/:id'],
            async (req: CustomRequest, res: Response) => this.carController.saveCategory(req, res));

        app.delete('/api/cars/categories/:id', 
            async (req: CustomRequest, res: Response) => this.carController.removeCategory(req, res));

        // BRANDS ---------------------------------------------------
        app.get(['/api/cars/brands', '/api/cars/brands/:id'], 
            async (req: Request, res: Response) => this.carController.returnBrand(req, res));

        app.post(['/api/cars/brands/filter'], 
            async (req: Request, res: Response) => this.carController.returnFilteredBrand(req, res));

        app.post(['/api/cars/brands', '/api/cars/brands/:id'], 
            async (req: Request, res: Response) => this.carController.saveBrand(req, res));
        
        app.delete('/api/cars/brands/:id', 
            async (req: CustomRequest, res: Response) => this.carController.removeBrand(req, res));
        
        // MODELS ---------------------------------------------------
        app.get(['/api/cars/models', '/api/cars/models/:id'], 
            async (req: Request, res: Response) => this.carController.returnModel(req, res));

        app.post('/api/cars/models/filter', 
            async (req: Request, res: Response) => this.carController.returnFilteredModel(req, res));

        app.post(['/api/cars/models', '/api/cars/models/:id'], 
            async (req: Request, res: Response) => this.carController.saveModel(req, res));

        app.delete('/api/cars/models/:id', 
            async (req: CustomRequest, res: Response) => this.carController.removeModel(req, res));

        // VERSIONS ---------------------------------------------------
        app.get(['/api/cars/versions', '/api/cars/versions/:id'], 
        async (req: Request, res: Response) => this.carController.returnVersion(req, res));

        app.post('/api/cars/versions/filter', 
            async (req: Request, res: Response) => this.carController.returnFilteredVersion(req, res));

        app.post(['/api/cars/versions', '/api/cars/versions/:id'], 
            async (req: Request, res: Response) => this.carController.saveVersion(req, res));

        app.delete('/api/cars/versions/:id', 
            async (req: CustomRequest, res: Response) => this.carController.removeVersion(req, res));
    }
}
