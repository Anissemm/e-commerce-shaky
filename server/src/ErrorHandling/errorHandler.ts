import { NextFunction, Request, Response } from "express"
import { ApiError } from "./errors"

type ErrorInstance = InstanceType<typeof ApiError | typeof Error>

const errorHandler = (err: ErrorInstance , req: Request, res: Response, next: NextFunction) => {
    console.log(err instanceof ApiError)
    if (err instanceof ApiError) {
        res.status(err.statusCode).json(err.getResponse())
    }

    next(err)
}

export default errorHandler