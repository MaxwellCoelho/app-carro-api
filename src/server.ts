import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as path from 'path';
import * as mongoose from 'mongoose';
import "dotenv/config";

import { UDate, Utils } from './utils';
import { config } from './config/config';

import sessionMiddleware from './middlewares/session.middleware';
import passport from './middlewares/passport.middleware';

// Routes
import {
    TestRoutes,
    CustomerRoutes,
    CarRoutes,
    OpinionRoutes,
    AuthRoutes,
    BestRoutes
} from './routes';

// Services
import {
    TestService,
    CustomerService,
    CarService,
    CryptoService,
    OpinionService,
    AuthService,
    BestService
} from './services';

// Controllers
import {
    TestController,
    CustomerController,
    CarController,
    OpinionController,
    AuthController,
    BestController
} from './controllers';

// Conexão com base de dados
const mongoUri = `mongodb://${process.env.MONGO_USER}:${encodeURIComponent(process.env.MONGO_PWD)}@${process.env.MONGO_IP}:27017/appcarrodb?${process.env.MONGO_PARAMS}`;
mongoose.connect(mongoUri)
    .then(() => console.log('Connected to database'))
    .catch(err => console.log(err));

const PORT = config.PORT;

// Instancia dos serviços a serem injetados nos controllers
const cryptoService = new CryptoService();
const uDate = new UDate();
const utils = new Utils();
const testService = new TestService();
const customerService = new CustomerService(cryptoService, uDate);
const carService = new CarService(cryptoService, customerService, utils);
const opinionService = new OpinionService(cryptoService, customerService, carService, uDate);
const authService = new AuthService(cryptoService, customerService);
const bestService = new BestService(carService);

// Instancia dos componentes injetáveis
const testController = new TestController(testService, uDate);
const customerController = new CustomerController(customerService, cryptoService, uDate);
const carController = new CarController(carService, cryptoService, uDate);
const opinionController = new OpinionController(opinionService, cryptoService, uDate);
const authController = new AuthController(authService, cryptoService, uDate);
const bestController = new BestController(bestService, uDate);

// INSTANCIA DAS ROTAS
const testRoute = new TestRoutes(testController);
const customerRoute = new CustomerRoutes(customerController);
const carRoute = new CarRoutes(carController);
const opinionRoute = new OpinionRoutes(opinionController);
const authRoute = new AuthRoutes(authController);
const bestRoute = new BestRoutes(bestController);

const server = express();

server.use(sessionMiddleware);
server.use(passport.initialize());
server.use(passport.session());
// support application/json type post data
server.use(bodyParser.json());
// support application/x-www-form-urlencoded post data
server.use(bodyParser.urlencoded({ extended: false }));

server.use((req, res, next) => {
    req.setTimeout(20000, function(){ req.destroy(); });

    const allowedOrigins = ['http://localhost:4200', 'https://krro.com.br', 'https://www.krro.com.br'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', `Origin, X-Requested-With, Content-Type, Accept, X-Access-Token, Set-Cookie`);
    res.header('Access-Control-Expose-Headers', 'Set-Cookie');

    next();
});

// Injeção das rotas no server
testRoute.route(server);
customerRoute.route(server);
carRoute.route(server);
opinionRoute.route(server);
authRoute.route(server);
bestRoute.route(server);

// Rodar frontend buildado do projeto app-carro
// server.use(express.static('www'));

// server.get('*', (req, res) => {
//    res.sendFile(path.join(__dirname, '../www/index.html'));
// });

server.listen(PORT, () => {
    uDate.timeConsoleLog(`Server running at http://localhost:${PORT}`);
});
