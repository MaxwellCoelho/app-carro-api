import { Request, Response } from 'express';
import { AuthController } from '../controllers';


export class AuthRoutes {

    constructor(private authController: AuthController) {}

    public route(app) {
            
        app.post(['/api/auth'],
            async (req: Request, res: Response) => this.authController.authUser(req, res));

    }
}
