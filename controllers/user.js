const models = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function register(req, res) {
  models.User.findOne({ where: { email: req.body.email } })
    .then((result) => {
      if (result) {
        res.status(409).json({
          message: "User already exists",
        });
      } else {
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(req.body.password, salt, function (err, hashedPassword) {
            const user = {
              name: req.body.name,
              email: req.body.email,
              password: hashedPassword,
            };
            models.User.create(user)
              .then((result) => {
                res.status(201).json({
                  message: "User created successfully",
                  user: result,
                });
              })
              .catch((error) => {
                res.status(500).json({
                  message: "Error creating user",
                  error: error,
                });
              });
          });
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong",
        error: error,
      });
    });
}

function login(req, res) {
    models.User.findOne({ where: { email: req.body.email } })
    .then((result) => {
      if (result) {
        bcrypt.compare(req.body.password, result.password, function (err, isMatch) {
          if (isMatch) {
            const token = jwt.sign(
              { email: result.email, id: result.id },
              process.env.JWT_KEY, function(err, token) {
                res.status(200).json({
                  message: "Authentication successful",
                  token: token,
                  expiresIn: 3600,
                  userId: result.id,
                });
              }
            //   { expiresIn: "1h" }
            )
          } else {
            res.status(401).json({
              message: "Invalid credentials",
            });
          }
        });
      } else {
        res.status(404).json({
          message: "User not found",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong",
        error: error,
      });
    });
}

module.exports = {
  register: register,
  login: login,
};
