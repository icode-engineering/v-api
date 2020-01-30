import { success } from '../lib/response'

export class ApiController {
  /**
   * Status | return the status of the service
   * @param req
   * @param res
   */
  public status(req, res) {
    const response = {
      service: 'Vinema API',
      state: 'Up',
    }
    success(res, response)
  }
}
