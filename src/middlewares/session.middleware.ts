import { Request, Response, NextFunction } from 'express';
import * as session from "express-session";

const MongoStore = require('connect-mongo');
const mongoose = require("mongoose");

const sessionMiddleware = (req: Request, res: Response, next: NextFunction) => {
    return session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            client: mongoose.connection.getClient(),
            dbName: 'appcarrodb',
            collectionName: "sessions",
            stringify: false,
            autoRemove: "interval",
            autoRemoveInterval: 1
        }),
        cookie: { 
            maxAge: 2 * 60 * 60 * 60 * 1000
        }
    })(req, res, next);
}

export default sessionMiddleware;