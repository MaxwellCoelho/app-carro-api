import { Request, Response } from 'express';
import { CustomerController } from '../controllers';
import { CustomRequest } from "../architecture/definitionfile"


export class CustomerRoutes {

    constructor(private customerController: CustomerController) {}

    public route(app) {
        // CUSTOMERS ---------------------------------------------------
        app.get(['/api/customers', '/api/customers/:id'],
            async (req: Request, res: Response) => this.customerController.returnCustomer(req, res));

        app.post('/api/customers/filter', 
            async (req: Request, res: Response) => this.customerController.returnFilteredCustomer(req, res));
            
        app.post(['/api/customers', '/api/customers/:id'],
            async (req: Request, res: Response) => this.customerController.saveCustomer(req, res));

        app.delete('/api/customers/:id', 
            async (req: CustomRequest, res: Response) => this.customerController.removeCustomer(req, res));

        // ROLES ---------------------------------------------------
        app.get(['/api/roles', '/api/roles/:id'],
            async (req: Request, res: Response) => this.customerController.returnRole(req, res));

        app.post(['/api/roles', '/api/roles/:id'], 
            async (req: Request, res: Response) => this.customerController.saveRole(req, res));

        app.delete('/api/roles/:id', 
            async (req: CustomRequest, res: Response) => this.customerController.removeRole(req, res));
    }
}
