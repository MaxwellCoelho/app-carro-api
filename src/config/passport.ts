import * as passport from "passport";
import * as passportLocal from "passport-local";
import { customerModel, roleModel } from '../models/customer.model';
import { Request, Response, NextFunction } from "express";

const PassportLocal = passportLocal.Strategy
const bcrypt = require('bcrypt');

passport.deserializeUser(async (id, done) => {    
    try {
        const user = await customerModel.find({ _id: id });
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

passport.use(new PassportLocal({
        usernameField: 'email',
        passwordField: 'password'
    },
    async (email, password, done) => {
        try {
            const user = await customerModel.find({ email: email });

            // usuário inexistente
            if (!user[0]) { return done(null, false) }

            // comparando as senhas
            const isValid = bcrypt.compareSync(password, user[0].password);
            if (!isValid) return done(null, false);

            return done(null, user[0]);
        } catch (err) {
            done(err, false);
        }
    }
));
