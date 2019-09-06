import {success} from '../lib/response';

export class ApiController {

    /**
     * Status | return the status of the service
     * @param req
     * @param res
     */
    status(req, res) {
        const response = {
            service: 'Venima API',
            state: 'Up'
        };
        success(res, response);
    }
}
