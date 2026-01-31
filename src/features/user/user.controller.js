import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";

export default class UserController {
  postSignUp(req, res) {
    const { name, email, password, type } = req.body;
    const user = UserModel.signUp(name, email, password, type);
    res.status(201).send(user);
  }

  postSignIn(req, res) {
    const result = UserModel.signIn(req.body.email, req.body.password);
    if (!result) {
      return res.status(401).send("Incorrect Credentials");
    }
    const token = jwt.sign(
      { userId: result.id, email: result.email },
      process.env.SECRET_KEY,
      {
        expiresIn: "1d",
      },
    );

    console.log(token);

    return res.status(200).send(token);
  }
}
