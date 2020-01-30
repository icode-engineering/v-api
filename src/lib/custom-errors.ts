export default class CustomErrors {
  public static NO_USER = 'E001'

  private messages = {
    E001: 'User not found',
  }

  public getErrorMessage(code) {
    return this.messages[code] ? this.messages[code] : 'Fatal Error'
  }
}
