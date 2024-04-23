import { Request, Response } from 'express';
import { CustomerController } from '../controllers';


export class CustomerRoutes {

    constructor(private customerController: CustomerController) {}

    public route(app) {
        // CUSTOMERS ---------------------------------------------------
        app.get(['/customers', '/customers/:id'],
            async (req: Request, res: Response) => this.customerController.returnCustomer(req, res));
            
        app.post(['/customers', '/customers/:id'],
            async (req: Request, res: Response) => this.customerController.saveCustomer(req, res));

        app.delete('/customers/:id', 
            async (req: Request, res: Response) => this.customerController.removeCustomer(req, res));

        // ROLES ---------------------------------------------------
        app.get(['/roles', '/roles/:id'],
            async (req: Request, res: Response) => this.customerController.returnRole(req, res));

        app.post(['/roles', '/roles/:id'], 
            async (req: Request, res: Response) => this.customerController.saveRole(req, res));

        app.delete('/roles/:id', 
            async (req: Request, res: Response) => this.customerController.removeRole(req, res));
    }
}
