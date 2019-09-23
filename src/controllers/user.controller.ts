import {failure} from '../lib/response';
import ValidatorService from '../services/validator';

export class UserController {

    /**
     * Sign Up | sign up the user
     * @param req
     * @param res
     */
    signUp(req, res) {
        const {body: {first_name, last_name, email, password}} = req;
        const inputData = {
            firstName: first_name,
            lastName: last_name,
            email, password
        };
        try {



        } catch (e) {
            console.log(e);
            return failure(res, e, e.status);
        }
    }
}
