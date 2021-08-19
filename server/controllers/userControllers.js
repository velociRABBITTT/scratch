const models = require("../models/model");
const bcrypt = require("bcrypt");
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

userController.verifyUser =  async (req, res, next) => {
  // console.log("req.body", req.body)
  models.User.findOne({username:req.body.username})
  .then( async (result) => {
    // console.log("this result of User.findOne: ", result);
    if (result === null) {
      res.locals.result = "User password Error";
      throw new Error(
        "It's either your password is wrong or your user name is wrong"
      );
    }
   let passwordsMatch = await bcrypt.compare(req.body.password, result.password).then((result) => result);
    if (passwordsMatch) {
      req.session.userID = result._id;
      req.session.userName = result.username;
      console.log(req.session, 'session after id and name set');
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