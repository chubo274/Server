const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = async (req, res, next) => {
    let requestHeader = req.get("Authorization");
    if (!requestHeader || requestHeader.split(" ")[0] !== "Bearer") {
        res.json({
            code: 400,
            message: "Yêu cầu không thể xác thực"
        })
    }
    let token = requestHeader.split(" ")[1];
    let decodeToken = jwt.verify(token, "secret_key");
    let { _id, baseToken } = decodeToken;
    let user = await User.findById(_id);
    if (baseToken !== user.baseToken) {
        res.json({
            code: 400,
            message: "Token đã hết hạn",
        })
    }
    req.user = user;
    next();
}