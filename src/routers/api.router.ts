import * as express from 'express'
import { ApiController } from '../controllers/api.controller'

const api = new ApiController()

export default express.Router().get('/', api.status)
