import { logger } from '../config/winston'
import { failure } from '../lib/response'

export class UserController {
  /**
   * Sign Up | sign up the user
   * @param req
   * @param res
   */
  public signUp(req, res) {
    const {
      body: { first_name, last_name, email, password },
    } = req
    const inputData = {
      email,
      firstName: first_name,
      lastName: last_name,
      password,
    }
    try {
      //
      logger.info(inputData)
    } catch (e) {
      logger.info(e)
      return failure(res, e, e.status)
    }
  }
}
