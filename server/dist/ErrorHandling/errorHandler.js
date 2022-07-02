const errorHandler = (err, req, res, next) => {
    if (err === null || err === void 0 ? void 0 : err.statusCode) {
        res.status(err.statusCode).json(err.getResponse());
    }
    next(err);
};
export default errorHandler;
