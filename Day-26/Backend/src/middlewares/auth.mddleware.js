const jwt = require("jsonwebtoken");
const blackListModel =  require('./../models/blacklist.model')

async function authMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
   return res.status(401).json({ message: "Invalid Crenditials" });
  }

  const isTokenBlacklisted = await  blackListModel.findOne(token)

  if(isTokenBlacklisted){
   return res.status(200).json({message:"invalid Crenditials"})
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ message: "Users Unauthorized" });
  }
}

module.exports = authMiddleware;
