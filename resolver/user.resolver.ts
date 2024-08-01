import { generateRandomString } from "../helpers/generate.helper";
import User from "../model/user.model";
import md5 from "md5";

export const resolversUser = {

  Mutation: {
    registerUser: async (_, agrs) => {
      const { user } = agrs;

      const existEmail = await User.findOne({
        email: user.email,
        deleted: false
      });
      if (existEmail) {
        return {
          code: 400,
          message: "Email đã tồn tại!"
        };
      }
      user.password = md5(user.password);
      user.token = generateRandomString(25);

      const newUser = new User(user);
      const data = await newUser.save();

      return {
        code: 200,
        message: "Thành công",
        id: data._id,
        fullName: data.fullName,
        email: data.email,
        token: data.token
      };
    },
    loginUser: async (_, agrs) => {
      const { email, password } = agrs.user;

      const infoUser = await User.findOne({
        email: email,
        deleted: false
      });

      if (!infoUser) {
        return {
          code: 400,
          message: "Email Không tồn tại!"
        }
      }
      if (md5(password) !== infoUser.password) {
        return {
          code: 400,
          message: "Password không đúng"
        }
      }

      return {
        code: 200,
        message: "Success",
        id: infoUser._id,
        fullName: infoUser.fullName,
        email: infoUser.email,
        token: infoUser.token
      }
    }
  }
}