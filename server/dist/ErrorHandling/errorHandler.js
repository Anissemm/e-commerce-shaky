import { ApiError } from "./errors.js";
const errorHandler = (err, req, res, next) => {
    console.log(err instanceof ApiError);
    if (err instanceof ApiError) {
        res.status(err.statusCode).json(err.getResponse());
    }
    next(err);
};
export default errorHandler;
