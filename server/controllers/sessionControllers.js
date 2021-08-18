const models = require("../models/model");

const sessionControllers = {};


sessionControllers.authorize = (req, res, next) => {
  if (req.session.userID) {
    models.User.findOne({_id: req.session.userID})
    .then( user => res.locals.user = user)
    .then( () => next())
  } else {
    res.locals.user = {loggedIn: false}
    return next();
  }
}






module.exports = sessionControllers;