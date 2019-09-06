import CustomErrors from './custom-errors';
import {constants} from "./constant";

const {SUCCESSFUL} = constants;

const ErrorInstance = new CustomErrors();

interface IData {
    data?: [] | string;
    error: boolean;
    message: string
}

function respond(res, httpCode: number, data: IData) {
    const response = {
        error: data.error,
        code: httpCode,
        message: data.message,
        data: data.data
    };
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Method', '*');
    return res.status(httpCode).send(response);
}

export const success = function success(res, data, httpCode = 200) {
    const dataToSend: IData = {
        data,
        error: false,
        message: SUCCESSFUL
    };
    respond(res, httpCode, dataToSend);
};

export const failure = function failure(res, code, httpCode = 503) {
    const message = ErrorInstance.getErrorMessage(code);
    const dataToSend: IData = {
        error: true,
        message,
        data: null
    };
    respond(res, httpCode, dataToSend);
};
