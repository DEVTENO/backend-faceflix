import UserModel from "../../src/models/UserModel";
import bcrypt from "bcrypt";

class UserTest {
  static deleteAll = async () => {
    await UserModel.deleteMany({
      email: "test@gmail.com",
    });
  };
  
  static create = async () => {
    const password = await bcrypt.hash("testing", 10);
    await UserModel.create({
      email: "test@gmail.com",
      password: password,
    });
  };
  
  static get = async () => {
    const user = await UserModel.findOne({ email: "test@gmail.com" });
  
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      title: user.title,
      profileImage: user.profileImage,
      backgroundImage: user.backgroundImage,
      description: user.description,
    };
  };
}


export default UserTest;