const jwt = require("jsonwebtoken");

class Jwt {
  static async verify(token) {
    return jwt.verify(token, process.env.SECRET_KEY);
  }
}

exports.Jwt = Jwt;
