const models = require("../models/model");
const userController = {};

userController.createUser = (req, res, next) => {
  console.log("from frontend: ", req.body)
  const newUser = new models.User(req.body);

  newUser
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
