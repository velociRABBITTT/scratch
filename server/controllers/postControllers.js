const models = require("../models/model");
const postController = {};

postController.createPost = (req, res, next) => {
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

module.exports = postController;
