import { Request, Response, NextFunction } from 'express';
import * as session from "express-session";

const MongoStore = require('connect-mongo');
const mongoUri = `mongodb://${process.env.MONGO_USER}:${encodeURIComponent(process.env.MONGO_PWD)}@${process.env.MONGO_IP}:27017/appcarrodb?${process.env.MONGO_PARAMS}`;

const sessionMiddleware = (req: Request, res: Response, next: NextFunction) => {
    return session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: mongoUri
        }),
        cookie: { 
            maxAge: 30 * 60 * 60 * 60 * 1000
        }
    })(req, res, next);
}

export default sessionMiddleware;