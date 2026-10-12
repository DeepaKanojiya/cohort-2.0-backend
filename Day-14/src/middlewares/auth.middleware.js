const jwt = require("jsonwebtoken");

async function identifyer(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ message: "token not provide. , unthorized Users" });
  }

  let decoded = null;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    res.status(401).json({ message: "Users unThorized" });
  }

  req.user = decoded;
  next();
}

module.exports = identifyer
