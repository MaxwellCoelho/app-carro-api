import * as passport from 'passport'; 
import * as LocalStrategy from 'passport-local';
import { customerModel, roleModel } from '../models/customer.model';

passport.use(new LocalStrategy.Strategy(() => {}));

passport.serializeUser((user: any, done) => {
    done(null, user);
});

passport.deserializeUser(async (id: string, done: any) => {
    try {
        const user = await customerModel.findById(id);
        user.role = await roleModel.findById(user.role);

        done(null, user);
    } catch (error) {
        done(error);
    }
});

export default passport;