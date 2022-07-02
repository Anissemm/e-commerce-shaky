import { NextFunction, Request, Response } from "express"
import { ApiError } from "./errors"

const errorHandler = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
    if (err?.statusCode) {
        res.status(err.statusCode).json(err.getResponse())
    }

    next(err)
}

export default errorHandler