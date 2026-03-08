import UserModel from "./user.model.js";
import UserRepository from "./user.repository.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async postSignUp(req, res, next) {
    try {
      let { name, email, password, type } = req.body;
      password = await bcrypt.hash(password, 12);
      const user = new UserModel(name, email, password, type);
      const result = await this.userRepository.signUp(user);
      res.status(201).send(result);
    } catch (err) {
      console.log(err);
    }
  }

  async postSignIn(req, res) {
    try {
      const result = await this.userRepository.signIn(req.body.email);
      const comparePass = await bcrypt.compare(
        req.body.password,
        result.password,
      );
      if (comparePass) {
        const token = jwt.sign(
          { userId: result._id, email: result.email },
          process.env.SECRET_KEY,
          {
            expiresIn: "1d",
          },
        );
       return res.status(200).send(token);
      }else{
        return res.status(401).send("Incorrect Credentials");
      }
    } catch (err) {
      console.log(err);
    }
  }

  // async user(req, res, next) {
  //   try {
  //     const id = req.query.id;
  //     const users = await this.userRepository.getUserById(id);
  //     res.status(200).json(users);
  //   } catch (err) {
  //     next(err);
  //   }
  // }
}
