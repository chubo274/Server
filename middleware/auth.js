const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");

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
    if (!!decodeToken) {
      let { _id, baseToken } = decodeToken;
      let user = await UserModel.findById(_id);
      if (user) {
        console.log({ user });
        if (baseToken !== user.baseToken) {
          console.log("baseToken het han");
          res.status(400).json({
            message:
              "Token đã hết hạn hoặc tài khoản đăng nhập nơi khác, vui lòng đăng nhập lại",
          });
          return;
        }
        req.user = user;
      }
    } else {
      res.status(400).json({
        message: "Token đã hết hạn, vui lòng đăng nhập lại",
      });
      return;
    }
  }
  next();
};
