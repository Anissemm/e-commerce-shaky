import { getStatusText, StatusCodes } from 'readable-http-codes'

interface ErrorResponse {
    success: boolean
    message: string
    status: string
    statusCode: StatusCodes
}

export class ApiError extends Error {
    statusCode: StatusCodes
    constructor(statusCode: StatusCodes, message: string) {
        super(message)
        this.statusCode = statusCode
    }

    getResponse(): ErrorResponse {
        return {
            success: false,
            message: this.message,
            status: getStatusText(this.statusCode, true),
            statusCode: this.statusCode
        }
    }
}

type ServerStatusCodes = 500 | 501 | 502 | 503 | 504 | 505 | 506 | 507 | 508 | 510 | 511

interface ServerErrorResponse {
    success: boolean
    message: string
    status: string
    statusCode: ServerStatusCodes
}

export class ServerError extends ApiError {
    statusCode: ServerStatusCodes
    constructor(statusCode: ServerStatusCodes, message: string) {
        super(statusCode, message)
        this.statusCode = statusCode
    }

    getResponse(): ServerErrorResponse {
        return {
            success: false,
            message: this.message,
            status: getStatusText(this.statusCode, true),
            statusCode: this.statusCode
        }
    }
}

type ClientStatusCodes = 400 | 401 | 402 | 403 | 404 | 405 | 406 | 407 | 408 | 409 | 410 | 
411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 421 | 422 | 423 | 424 | 425 | 426 | 428 | 429 | 431 | 451

interface ClientErrorResponse {
    success: boolean
    message: string
    status: string
    statusCode: ClientStatusCodes
}

export class ClientError extends ApiError {
    statusCode: ClientStatusCodes
    constructor(statusCode: ClientStatusCodes, message: string) {
        super(statusCode, message)
        this.statusCode = statusCode
    }

    getResponse(): ClientErrorResponse {
        return {
            success: false,
            message: this.message,
            status: getStatusText(this.statusCode, true),
            statusCode: this.statusCode
        }
    }
}