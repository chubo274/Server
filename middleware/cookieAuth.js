const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");

module.exports = async (req, res, next) => {
  let token = req.cookies["app-token"];
  if (!token) {
    res.json({
      code: 400,
      message: "Không thể xác thực yêu cầu",
    });
  }
  let decodeToken = jwt.verify(token, "secret_key");
  let { _id, baseToken } = decodeToken;
  let user = await UserModel.findById(_id);
  if (baseToken !== user.baseToken) {
    res.json({
      code: 400,
      message: "Token đã hết hạn",
    });
  }
  req.user = user;
  next();
};
