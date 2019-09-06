import * as express from 'express';
import {ApiController} from '../controllers/api.controller';

let api = new ApiController();

export default express.Router()
    .get('/', api.status);
