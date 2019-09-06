/** Module dependencies. */
import * as http from 'http';
import * as fs from 'fs';
import * as rootPath from 'app-root-path';
import './env';
import {VenimaApi} from '../src/server';
import {NODE_ENV, PORT} from '../src/lib/constant';
import logger from '../src/config/winston';

/** Create log file */
try {
    fs.mkdir(`${rootPath}/logs/`, (error) => {
        if (!error || error.code == 'EEXIST' || error.errno == -17) {
            fs.open(`${rootPath}/logs/${logger.transports.file.filename}`, 'w', (err, fd) => {
                if (fd) {
                    fs.close(fd, (e: any) => {
                        if (!e) {
                            logger.info(`Log file ${fd} created successfully`);
                        }
                    });
                }
            });
        }
    });
} catch (e) {
    logger.error('Error occurred in creating log file:: ', e);
}

/** Normalize a port into a number, string, or false. */
const normalizePort = (val) => {
    const connPort = parseInt(val, 10);
    return connPort >= 0 ? connPort : isNaN(connPort) ? val : false;
};

/** Event listener for HTTP server "error" event. */
let onError = (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? `Pipe ${port}`
        : `Port ${port}`;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            logger.error(`${error.code}: ${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            logger.error(`${error.code}: ${bind} is already in use`);
            process.exit(1);
            break;
        default:
            logger.error(`${error.code}: not sure what happened here`);
            throw error;
    }
};

/** Event listener for HTTP server "listening" event. */
let onListening = () => {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? `pipe ${addr}`
        : `port ${addr.port}`;
    logger.info(`Listening on ${bind} in ${node_env} environment`);
};

const node_env = NODE_ENV;
const port = normalizePort(PORT || '3030');


/** Initialize api service */
const api = new VenimaApi();
const app = api.app;

app.set('port', port);

/** Create HTTP server. */
const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
