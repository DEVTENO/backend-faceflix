import { ResponseError } from "../exception/response-error.js";

export const errorMiddleware = async (err, req, res, next) => {
    console.log(err);
    if (!err) {
        return next()
    }

    if (err instanceof ResponseError) {
        res.status(400).json({
            errors: err.message
        })
    }
}