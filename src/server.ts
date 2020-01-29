import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as morgan from 'morgan';
import logger from '../src/config/winston';
import {routes} from './routes';

export class VinemaApi {
    readonly _app: express.Application;

    constructor() {

        this._app = express();
        this._app.use(morgan('combined', {stream: logger.stream}));
        this._app.use(bodyParser.json());
        this._app.use(bodyParser.urlencoded({extended: true}));
        this._app.use(cookieParser('application_secret'));

        // Cors
        this._app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Authorization, Content-Type, Accept');
            next();
        });

        // Setup routes
        this.routes();

        // catch 404 and forward to error handler
        this._app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            err.status = 404;
            logger.error(`${err.status} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            next(err);
        });

    }

    init() {
        return new VinemaApi();
    }

    routes(app?: express.Application) {
        routes(app || this._app);
    }

    get app() {
        if (!this._app) {
            this.init();
        }
        return this._app;
    }
}
