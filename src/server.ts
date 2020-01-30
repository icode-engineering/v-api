import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import * as express from 'express'
import * as morgan from 'morgan'
import { logger } from '../src/config/winston'
import { routes } from './routes'

export class VinemaApi {
  public readonly server: express.Application

  constructor() {
    this.server = express()
    this.server.use(morgan('combined', { stream: logger.stream }))
    this.server.use(bodyParser.json())
    this.server.use(bodyParser.urlencoded({ extended: true }))
    this.server.use(cookieParser('application_secret'))

    // Cors
    this.server.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS')
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Authorization, Content-Type, Accept')
      next()
    })

    // Setup routes
    this.routes()

    // catch 404 and forward to error handler
    this.server.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
      err.status = 404
      logger.error(`${err.status} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
      next(err)
    })
  }

  public init() {
    return new VinemaApi()
  }

  public routes(app?: express.Application) {
    routes(app || this.server)
  }

  get app() {
    if (!this.server) {
      this.init()
    }
    return this.server
  }
}
