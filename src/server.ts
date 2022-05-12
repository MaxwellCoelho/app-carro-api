import * as bodyParser from 'body-parser';
import * as express from 'express';

import { UDate } from './utils';
import { config } from './config/config';

// Routes
import {
    TestRoutes,
} from './routes';

// Services
import {
    TestService,
} from './services';

// Controllers
import {
    TestController,
} from './controllers';

const PORT = config.PORT;

// Instancia dos serviços a serem injetados nos controllers
const uDate = new UDate();
const testService = new TestService();

// Instancia dos componentes injetáveis
const testController = new TestController(testService, uDate);

// INSTANCIA DAS ROTAS
const testRoute = new TestRoutes(testController);

const server = express();

// support application/json type post data
server.use(bodyParser.json());
// support application/x-www-form-urlencoded post data
server.use(bodyParser.urlencoded({ extended: false }));

server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'false');
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', `Origin, X-Requested-With, Content-Type, Accept, X-Access-Token`);

    next();
});

// Injeção das rotas no server
testRoute.route(server);

server.listen(PORT, () => {
    uDate.timeConsoleLog(`Server running at http://localhost:${PORT}`);
});