const models = require("../models/model");
const userController = {};

userController.createUser = (req, res, next) => {
  // console.log("from frontend: ", req.body)
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

userController.verifyUser = (req, res, next) => {
  // console.log("req.body", req.body)
  models.User.findOne({username:req.body.username, password:req.body.password})
  .then((result) => {
    // console.log("this result of User.findOne: ", result);
    if (result === null) {
      res.locals.result = "User password Error";
      throw new Error(
        "It's either your password is wrong or your user name is wrong"
      );
    }
    if (result.password === req.body.password) {
      res.locals.result = result; //sending true back to frontend
      return next();
    }
    return next(); //dont get stuck in middleware
  })
  .catch((err) =>
    next({ message: `userController.verifyUser: Error: ${err}` })
  );

};
module.exports = userController;
// .exec((err,user)=>{
//   console.log(user)
//   return next()
// })