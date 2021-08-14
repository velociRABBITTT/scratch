const User = require("../models/userModel");
const userController = {};

userController.createUser = (req, res, next) => {
  const newUser = new User(req.body);
  
  User.create(newUser)
    .save()
    .then((data) => {
      res.locals.user = data;
      return next();
    })
    .catch((err) =>
      next({ message: `userController.createUser: Error: ${err}` })
    );
};

userController.verifyUser = (req, res, next) => {};
module.exports = userController;
