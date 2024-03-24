import userService from "../services/user-service.js";

const register = async (req, res, next) => {
    try {
        const request = req.body;
        await userService.register(request);
        res.status(201).json({
            statusCode: 201,
            data: "OK"
        })
    } catch (error) {
        next(error)
    }
}

const login = async (req, res , next) => {
    try {
        const request = req.body;
        const result = await userService.login(request);
        res.status(200).json({
            statusCode: 200,
            data: {
                user: result.user,
                token: result.token
            }
        })
    } catch (error) {
        next(error)
    }
}

const get = async (req, res, next) => {
    try {
        const email = req.user.email;
        const result = await userService.get(email);
        res.status(200).json({
            statusCode: 200,
            data: result
        });
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {

    try {
        console.log(req.files);
        const profileImage = req.files['profileImage'][0].filename;
        const backgroundImage = req.files['backgroundImage'][0].filename;

        res.status(200).json({
            data: {
                name: "testUser",
                profileImage: req.protocol+ '://'+ req.hostname + '/public/uploads/profile/' +profileImage,
                backgroundImage: req.protocol+ '://'+ req.hostname+ '/public/uploads/background/' +backgroundImage,
            }
        })
    } catch (error) {
        next(error)
    }
}

export default {
    register,
    login,
    get,
    update
}