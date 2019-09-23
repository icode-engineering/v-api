import * as express from 'express';
import ApiRouter from './routers/api.router';
import UserRouter from './routers/user.router';
import '../setup/env';

export const routes = (app: express.Application) => {
    app.use('/status', ApiRouter);
    app.use('/users', UserRouter);
    // Other routes here
    // Handle 404s here too
    return app;
};
