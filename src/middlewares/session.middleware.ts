import { Request, Response, NextFunction } from 'express';
import * as session from "express-session";

const MongoStore = require('connect-mongo');

const sessionMiddleware = (req: Request, res: Response, next: NextFunction) => {
    return session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI
        }),
        cookie: { 
            maxAge: 30 * 60 * 60 * 60 * 1000
        }
    })(req, res, next);
}

export default sessionMiddleware;