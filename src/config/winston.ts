import * as rootPath from 'app-root-path'
import * as winston from 'winston'

const timestamp: number = Date.now()
const options = {
  console: {
    colorize: true,
    formatter(opts) {
      return (
        winston.config.colorize(opts.level, opts.timestamp()) +
        ' ' +
        winston.config.colorize(opts.level, opts.level.toUpperCase()) +
        ' ' +
        (opts.message ? opts.message : '') +
        (opts.meta && Object.keys(opts.meta).length ? '\n\t' + JSON.stringify(opts.meta) : '')
      )
    },
    handleExceptions: true,
    json: false,
    level: 'info',
    timestamp: () => Date.now(),
  },
  file: {
    colorize: false,
    filename: `${rootPath}/logs/vinema-${timestamp}.log`,
    handleExceptions: true,
    json: true,
    level: 'info',
    maxFiles: 5,
    maxsize: 2097152, // 2MB
    timestamp: true,
  },
  timestamp: true,
}

const logger = new winston.Logger({
  exitOnError: false, // do not exit on handled exceptions
  transports: [new winston.transports.File(options.file), new winston.transports.Console(options.console)],
})

logger.stream = {
  write(message: any, encoding: any) {
    logger.info(message, encoding)
  },
}

export { logger }
