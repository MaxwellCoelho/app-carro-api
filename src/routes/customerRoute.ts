import { Request, Response } from 'express';
import { CustomerController } from '../controllers';


export class CustomerRoutes {

    constructor(private customerController: CustomerController) {}

    public route(app) {
        app.get('/api/customers', 
            async (req: Request, res: Response) => this.customerController.returnCustomers(req, res));

        app.get('/api/customers/roles', 
            async (req: Request, res: Response) => this.customerController.returnRoles(req, res));
    }
}
