import { getStatusText } from 'readable-http-codes';
export class ApiError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
    getResponse() {
        return {
            success: false,
            message: this.message,
            status: getStatusText(this.statusCode, true),
            statusCode: this.statusCode
        };
    }
}
export class ServerError extends ApiError {
    constructor(statusCode, message) {
        super(statusCode, message);
        this.statusCode = statusCode;
    }
    getResponse() {
        return {
            success: false,
            message: this.message,
            status: getStatusText(this.statusCode, true),
            statusCode: this.statusCode
        };
    }
}
export class ClientError extends ApiError {
    constructor(statusCode, message) {
        super(statusCode, message);
        this.statusCode = statusCode;
    }
    getResponse() {
        return {
            success: false,
            message: this.message,
            status: getStatusText(this.statusCode, true),
            statusCode: this.statusCode
        };
    }
}
