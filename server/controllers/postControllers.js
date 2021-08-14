const models = require("../models/model");
const postController = {};

postController.createPost = (req, res, next) => {
  const newPost = new models.Post(req.body);

  newPost
    .save()
    .then((data) => {
      res.locals.user = data;
      return next();
    })
    .catch((err) =>
      next({ message: `userController.createUser: Error: ${err}` })
    );
};


postController.getAllPosts= (req,res,next) =>{
  console.log('in postcontoller')
  models.Post.find({})
  .then(allPosts=>{
    console.log('allposts', allPosts)
    res.locals.allPosts = allPosts;
    return next()
  })
  .catch((err) =>
    next({ message: `postController.getAllPost: Error: ${err}` })
  );
  
}


module.exports = postController;
