import { constants } from './constants'
import CustomErrors from './custom-errors'

const { SUCCESSFUL } = constants

const ErrorInstance = new CustomErrors()

interface IData {
  data?: [] | string
  error: boolean
  message: string
}

function respond(res, httpCode: number, data: IData) {
  const response = {
    code: httpCode,
    data: data.data,
    error: data.error,
    message: data.message,
  }
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Method', '*')
  return res.status(httpCode).send(response)
}

export const success = (res, data, httpCode = 200) => {
  const dataToSend: IData = {
    data,
    error: false,
    message: SUCCESSFUL,
  }
  respond(res, httpCode, dataToSend)
}

export const failure = (res, code, httpCode = 503) => {
  const message = ErrorInstance.getErrorMessage(code)
  const dataToSend: IData = {
    data: null,
    error: true,
    message,
  }
  respond(res, httpCode, dataToSend)
}
