import axios from 'axios'

class Http {
  private axiosInstance
  /**
   * Http Service Constructor
   */
  constructor(baseUrl: string) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
    })
  }

  /**
   * POST | Sends Http POST request
   * @param uri
   * @param body
   */
  public post(uri: string, body = {}, options?: any) {
    return this.axiosInstance.post(uri, body, options)
  }

  /**
   * GET | Sends Http GET request
   * @param uri
   * @param options
   */
  public get(uri: string, options?: any) {
    return this.axiosInstance.get(uri, options)
  }
}

export default Http
