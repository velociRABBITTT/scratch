const models = require("../models/model");
const postController = {};

postController.createPost = (req, res, next) => {
  const newPost = new models.Post(req.body);

  newPost
    .save()
    .then((data) => {
      res.locals.post = data;
      console.log(data)
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
    // console.log('allposts', allPosts)
    res.locals.allPosts = allPosts;
    return next()
  })
  .catch((err) =>
    next({ message: `postController.getAllPost: Error: ${err}` })
  );
  
}

postController.editPost=(req,res,next)=>{
  console.log("This req.body :", req.body)
   models.Post.findOne({_id: req.body.id})
   .then((post)=>{
     post.title= req.body.title,
     post.goal= req.body.goal,
     post.method= req.body.method,
     post.duration= req.body.duration,
     post.results= req.body.results
     post.created =req.body.created

     post.save()
     .then((post)=res.json(post))
     .catch((err) => res.status(400).json("Error :" + err));
   })
   .catch((err)=>res.status(400).json("error,student not found : " +err));
}
postController.deletePost=(req,res,next)=>{

  models.Post.findOneAndDelete({_id: req.body.id})
  .then(()=>{ 
res.json("POST DELETED FOREVER!");
  })
  .catch((err)=>res.status(400).json("Error, Post not found: " + err));
}





// title: { type: String, required:true},
// goal: { type: String, required: true },
// method: { type: String },
// duration: { type: String },
// results: { type: String },
// author: { type: String },
// created: { type: String }


module.exports = postController;
