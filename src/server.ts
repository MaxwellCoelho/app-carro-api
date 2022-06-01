import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as mongoose from 'mongoose';
import "dotenv/config";

import { UDate } from './utils';
import { config } from './config/config';

// Routes
import {
    TestRoutes,
    CustomerRoutes,
    CarRoutes,
} from './routes';

// Services
import {
    TestService,
    CustomerService,
    CarService,
} from './services';

// Controllers
import {
    TestController,
    CustomerController,
    CarController,
} from './controllers';

// Conexão com base de dados
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to database'))
    .catch(err => console.log(err));

const PORT = config.PORT;

// Instancia dos serviços a serem injetados nos controllers
const uDate = new UDate();
const testService = new TestService();
const customerService = new CustomerService();
const carService = new CarService();

// Instancia dos componentes injetáveis
const testController = new TestController(testService, uDate);
const customerController = new CustomerController(customerService, uDate);
const carController = new CarController(carService, uDate);

// INSTANCIA DAS ROTAS
const testRoute = new TestRoutes(testController);
const customerRoute = new CustomerRoutes(customerController);
const carRoute = new CarRoutes(carController);

const server = express();

// support application/json type post data
server.use(bodyParser.json());
// support application/x-www-form-urlencoded post data
server.use(bodyParser.urlencoded({ extended: false }));

server.use((req, res, next) => {
    req.setTimeout(20000, function(){ next(); });

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

server.listen(PORT, () => {
    uDate.timeConsoleLog(`Server running at http://localhost:${PORT}`);
});
