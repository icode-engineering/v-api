import * as request from 'request-promise';

class Http {

    /**
     * Http Service Constructor
     */
    constructor() {
    }

    /**
     * POST | Sends Http POST request
     * @param uri
     * @param body
     * @param options
     */
    post(uri: string, body = {}, options: any = {}) {
        options = {...options, body, json: true, uri, method: 'POST'};
        return request(options);
    };

    /**
     * GET | Sends Http GET request
     * @param uri
     * @param options
     */
    get(uri: string, options: any = {}) {
        options = {...options, uri, method: 'GET'};
        return request(options);
    }
}

export default new Http();
