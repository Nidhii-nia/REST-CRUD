import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";

export default class UserController {
  postSignUp(req, res) {
    const { name, email, password, type } = req.body;
    const user = UserModel.signUp(name, email, password, type);
    res.status(201).send(user);
  }

  postSignIn(req, res,next) {
   try{
     const result = UserModel.signIn(req.body.email, req.body.password);
    const token = jwt.sign(
      { userId: result.id, email: result.email },
      process.env.SECRET_KEY,
      {
        expiresIn: "1d",
      },
    );
    console.log(token);
    return res.status(200).send(token);
   }catch(err){
    console.log("signIn ERROR");
    next(err);
    
   }
  }
}
