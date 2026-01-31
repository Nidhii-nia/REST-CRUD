import UserModel from "../features/user/user.model.js";

export const basicAuth = (req, res, next) => {
  //1. check for auth header
  const authHeader = req.headers["authorization"];
  console.log(authHeader);

  if (!authHeader) {
    res.status(401).send("No credentials found");
  }

  //2. Extract Credentials
  const base64Credentials = authHeader.replace("Basic", "");
  console.log(base64Credentials);

  //3. Decode Credentials
  const decodedCredentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
  console.log(decodedCredentials);

  const credentials = decodedCredentials.split(':');
  const [email,password] = credentials

  const user = UserModel.getAll().find(user => user.email == email && user.password == password );

  if(user){
    next();
  }else{
    return res.status(401).send("Incorrect Credentials");
  }
  
};
