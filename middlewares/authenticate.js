import jwt from "jsonwebtoken";

let authenticate = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1]; //extracting token from client's request
    }

    if (!token) {
      res.status(401).json({ msg: "User unauthorized" });
    }

    let verifiedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY); //Veryfying client's token with JWT secret key

    req.user = verifiedToken.user;// This req.user has the payload that we had created while logging in
    //console.log(`Printing -> ${req.user}`);
    
    next();

  } catch (err) {
    //console.log(err);
    res.status(500).json({ msg: "Invalid token" });
  }
};

export default authenticate;
