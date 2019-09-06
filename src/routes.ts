import * as express from 'express';
import ApiRouter from './routers/api.router';
import '../setup/env';

export const routes = (app: express.Application) => {
    app.use('/status', ApiRouter);
    // Other routes here
    return app;
};
