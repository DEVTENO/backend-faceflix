import UserService from "../services/user-service.js";

class UserController {
  static async register(req, res, next) {
    try {
      const request = req.body;
      await UserService.register(request);
      res.status(201).json({
        statusCode: 201,
        data: "OK",
      });
    } catch (error) {
      next(error);
    }
  };
  
  static async login(req, res, next) {
    try {
      const request = req.body;
      const result = await UserService.login(request);
      res.status(200).json({
        statusCode: 200,
        data: {
          user: result.user,
          token: result.token,
        },
      });
    } catch (error) {
      next(error);
    }
  };
  
  static async get(req, res, next) {
    try {
      const email = req.user.email;
      const result = await UserService.get(email);
      res.status(200).json({
        statusCode: 200,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
  
  static async update(req, res, next) {
    try {
      const user = req.user;
      const request = {
        email: req.body.email,
        name: req.body.name,
        title: req.body.title,
        description: req.body.description,
        password: req.body.password,
      };
      for (const key in request) {
          if (request[key] === "") {
            delete request[key];
          }
        }
  
      if (req.files["profileImage"]) {
        const profileImageFile = req.files["profileImage"][0];
        request.profileImage = {
          filename: profileImageFile.filename,
          mimetype: profileImageFile.mimetype,
          size: profileImageFile.size,
        };
      }
  
      if (req.files["backgroundImage"]) {
        const backgroundImageFile = req.files["backgroundImage"][0];
        request.backgroundImage = {
          filename: backgroundImageFile.filename,
          mimetype: backgroundImageFile.mimetype,
          size: backgroundImageFile.size,
        };
      }
  
      await UserService.update(
        user,
        request,
        req.protocol,
        req.host
      );
      res.status(200).json({
        statusCode: 200,
        data: "OK",
      });
    } catch (error) {
      next(error);
    }
  };
}


export default UserController;
