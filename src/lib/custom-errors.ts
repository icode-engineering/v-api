export default class CustomErrors {
    static NO_USER = 'E001';

    private messages = {
        'E001': 'User not found'
    };

    getErrorMessage(code) {
        return this.messages[code] ? this.messages[code] : 'Fatal Error';
    }
}
