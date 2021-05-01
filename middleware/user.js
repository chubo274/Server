const UserModel = require("../models/User");
const { body } = require("express-validator/check");

module.exports = [
  body("email")
    .isEmail()
    .withMessage("Email không hợp lê.")
    .custom(async (value, { req }) => {
      try {
        let check = await UserModel.findOne({ email: value });
        if (check) {
          throw new Error("Email đã tồn tại.");
        }
      } catch (error) {
        throw new Error(error);
      }
    }),
  body("password").custom(async (value, { req }) => {
    if (value.length <= 5) {
      throw new Error("Mật khẩu phải dài hơn 6 ký tự.");
    } else if (value !== req.body.confirmPassword) {
      throw new Error("Nhập lại mật khẩu không đúng.");
    }
    return true;
  }),
];
