import { Request, Response } from 'express';
import { TestController } from '../controllers';

export class TestRoutes {

    constructor(private testController: TestController) {}

    public route(app) {
        app.get('/api/test', 
            async (req: Request, res: Response) => this.testController.createTest(req, res));
    }
}
