import { Request, Response } from 'express';
import { CarController } from '../controllers';


export class CarRoutes {

    constructor(private carController: CarController) {}

    public route(app) {
        // CATEGORIES ---------------------------------------------------
        app.get(['/cars/categories', '/cars/categories/:id'], 
            async (req: Request, res: Response) => this.carController.returnCategory(req, res));

        app.post(['/cars/categories', '/cars/categories/:id'],
            async (req: Request, res: Response) => this.carController.saveCategory(req, res));

        app.delete('/cars/categories/:id', 
            async (req: Request, res: Response) => this.carController.removeCategory(req, res));

        // BRANDS ---------------------------------------------------
        app.get(['/cars/brands', '/cars/brands/:id'], 
            async (req: Request, res: Response) => this.carController.returnBrand(req, res));

        app.post(['/cars/brands', '/cars/brands/:id'], 
            async (req: Request, res: Response) => this.carController.saveBrand(req, res));
        
        app.delete('/cars/brands/:id', 
            async (req: Request, res: Response) => this.carController.removeBrand(req, res));
        
        // MODELS ---------------------------------------------------
        app.get(['/cars/models', '/cars/models/:id'], 
            async (req: Request, res: Response) => this.carController.returnModel(req, res));

        app.post('/cars/models/filter', 
            async (req: Request, res: Response) => this.carController.returnFilteredModel(req, res));

        app.post(['/cars/models', '/cars/models/:id'], 
            async (req: Request, res: Response) => this.carController.saveModel(req, res));

        app.delete('/cars/models/:id', 
            async (req: Request, res: Response) => this.carController.removeModel(req, res));

        // VERSIONS ---------------------------------------------------
        app.get(['/cars/versions', '/cars/versions/:id'], 
        async (req: Request, res: Response) => this.carController.returnVersion(req, res));

        app.post('/cars/versions/filter', 
            async (req: Request, res: Response) => this.carController.returnFilteredVersion(req, res));

        app.post(['/cars/versions', '/cars/versions/:id'], 
            async (req: Request, res: Response) => this.carController.saveVersion(req, res));

        app.delete('/cars/versions/:id', 
            async (req: Request, res: Response) => this.carController.removeVersion(req, res));
    }
}
