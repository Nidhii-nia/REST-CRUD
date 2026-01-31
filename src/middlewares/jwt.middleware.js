import jwt from "jsonwebtoken";

const jwtAuth = (req, res, next) => {

  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  try {
    const payload = jwt.verify(
      token,
      process.env.SECRET_KEY
    );
    req.userId = payload.userId;
    next();
  } catch (e) {
    console.log(e.message);
    return res.status(401).send("Invalid Token");
  }
};

export default jwtAuth;
