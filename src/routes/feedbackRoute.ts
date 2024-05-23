import { Request, Response } from 'express';
import { FeedbackController } from '../controllers';


export class FeedbackRoutes {

    constructor(private feedbackController: FeedbackController) {}

    public route(app) {
        app.get(['/api/feedback', '/api/feedback/:id'],
            async (req: Request, res: Response) => this.feedbackController.returnFeedback(req, res));
            
        app.post(['/api/feedback', '/api/feedback/:id'],
            async (req: Request, res: Response) => this.feedbackController.saveFeedback(req, res));

        app.delete('/api/feedback/:id', 
            async (req: Request, res: Response) => this.feedbackController.removeFeedback(req, res));
    }
}