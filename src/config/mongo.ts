import * as bluebird from 'bluebird'
import * as mongoose from 'mongoose'
import { config } from './settings'
import * as logger from './winston'

const connectionString =
  !config.mongodb.username || !config.mongodb.password
    ? `mongodb://${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.db}`
    : `mongodb://${config.mongodb.username}:${config.mongodb.password}@${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.db}`

mongoose.Promise = bluebird

export default mongo = mongoose
  .connect(connectionString, { useNewUrlParser: true })
  .then(db => {
    logger.info('Mongo Connection Established')

    // If the Node process ends, close the Mongoose connection
    process.on('SIGINT', () => {
      logger.error('Mongoose default connection disconnected through app termination')
      process.exit(0)
    })
  })
  .catch(err => {
    logger.error(`Mongo Connection Error : ${err}`)
    process.exit(1)
  })
