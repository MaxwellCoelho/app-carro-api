import { Request, Response, NextFunction } from 'express';
import { AuthController } from '../controllers';

export class AuthRoutes {

    constructor(private authController: AuthController) {}

    public route(app) {
            
        app.post(['/api/login'],
            async (req: Request, res: Response, next: NextFunction) => this.authController.authUser(req, res, next));

        app.post(['/api/logout'],
            async (req: Request, res: Response, next: NextFunction) => this.authController.logoutUser(req, res, next));
            
        app.post(['/api/me'],
            async (req: Request, res: Response, next: NextFunction) => this.authController.meUser(req, res, next));

    }
}
