import userService from "../services/user-service.js";

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

const login = async(req, res, next) => {
    try {
        const request = req.body;

        const user = await userService.login(request);

        const token = await user.generateToken();
                
        res.status(200).json({
            statusCode: 200,
            data: "OK",
            token: token
        });
    } catch (error) {
        next(error);
    }
}

export default {
    register,
    login
}