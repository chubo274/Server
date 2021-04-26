const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

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
    let decodeToken = jwt.decode(token, "secret_key_admin");
    let { _id, baseToken } = decodeToken;
    let admin = await Admin.findById(_id);
    if (admin) {
      if (baseToken !== admin.baseToken) {
        res.status(400).json({
          message: "Token đã hết hạn",
        });
      }
      req.admin = admin;
    }
  }
  next();
};
