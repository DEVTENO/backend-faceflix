import userService from "../services/user-service";

const register = async (req, res, next) => {
    try {
        const request = req.body;
        await userService.register(request)
        res.status(201).json({
            statusCode: 201,
            data: "OK"
        })
    } catch (error) {
        next(error)
    }
}

export default {
    register
}