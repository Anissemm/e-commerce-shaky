import { NextFunction, Request, Response } from "express"
import { ApiError, ClientError, ServerError } from "./errors"

type ErrorInstance = InstanceType<typeof ApiError | typeof ServerError | typeof ClientError | typeof Error>

const errorHandler = (err: ErrorInstance, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ClientError) {
        return res.status(err.statusCode).json(err.getResponse())
    }

    if (err instanceof ServerError) {
        console.log(err.message)
    }

   return res.status(500).json({ message: err.message, success: false })
}

export default errorHandler