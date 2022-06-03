import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as session from "express-session";
import * as mongoose from 'mongoose';
import * as passport from 'passport';  
import "dotenv/config";

import { UDate } from './utils';
import { config } from './config/config';

// Routes
import {
    TestRoutes,
    CustomerRoutes,
    CarRoutes,
    AuthRoutes
} from './routes';

// Services
import {
    TestService,
    CustomerService,
    CarService,
    CryptoService,
    AuthService
} from './services';

// Controllers
import {
    TestController,
    CustomerController,
    CarController,
    AuthController
} from './controllers';

// Conexão com base de dados
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to database'))
    .catch(err => console.log(err));

const PORT = config.PORT;

// Instancia dos serviços a serem injetados nos controllers
const cryptoService = new CryptoService();
const uDate = new UDate();
const testService = new TestService();
const customerService = new CustomerService(cryptoService);
const carService = new CarService();
const authService = new AuthService(cryptoService);

// Instancia dos componentes injetáveis
const testController = new TestController(testService, uDate);
const customerController = new CustomerController(customerService, cryptoService, uDate);
const carController = new CarController(carService, cryptoService, uDate);
const authController = new AuthController(authService, cryptoService, uDate);

// INSTANCIA DAS ROTAS
const testRoute = new TestRoutes(testController);
const customerRoute = new CustomerRoutes(customerController);
const carRoute = new CarRoutes(carController);
const authRoute = new AuthRoutes(authController);

const server = express();

// const MongoStore = require('connect-mongo');

// server.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     cookie: { maxAge: 30 * 60 * 1000 },
//     store: MongoStore.create({
//         autoRemove: 'native',
//         mongooseConnection: mongoose.connection,
//         client: ,
//         mongoUrl: process.env.MONGO_CONNECTION,
//         ttl: 30 * 60 // = 30 minutos de sessão 
//     })
// }));

// server.use(passport.initialize());
// server.use(passport.session());

// support application/json type post data
server.use(bodyParser.json());
// support application/x-www-form-urlencoded post data
server.use(bodyParser.urlencoded({ extended: false }));

server.use((req, res, next) => {
    req.setTimeout(20000, function(){ req.destroy(); });

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'false');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', `Origin, X-Requested-With, Content-Type, Accept, X-Access-Token`);

    next();
});

// Injeção das rotas no server
testRoute.route(server);
customerRoute.route(server);
carRoute.route(server);
authRoute.route(server);

server.listen(PORT, () => {
    uDate.timeConsoleLog(`Server running at http://localhost:${PORT}`);
});
