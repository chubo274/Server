const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = async (req, res, next) => {
  let requestHeader = req.get("Authorization");
  if (!requestHeader || requestHeader.split(" ")[0] !== "Token") {
    res.status(400).json({
      message: "Yêu cầu không thể xác thực",
    });
    return;
  }
  if (!!requestHeader) {
    let token = requestHeader.split(" ")[1];
    let decodeToken = jwt.decode(token, "secret_key");
    let { _id, baseToken } = decodeToken;
    let user = await User.findById(_id);
    if (user) {
      if (baseToken !== user.baseToken) {
        res.status(400).json({
          message: "Token đã hết hạn",
        });
      }
      req.user = user;
    }
  }
  next();
};
