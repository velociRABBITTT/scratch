const express = require("express");
const app = express();
const path = require("path");
const userController = require("./controllers/userControllers");
const postController = require("./controllers/postControllers");
//* handle parsing request body
app.use(express.json());
//this parses url encoded body content from incomming requests ans place it in req.body....
app.use(express.urlencoded({ extended: true }));

// statically serve everything in the build folder on the route '/build'
app.use("/build", express.static(path.join(__dirname, "../build")));
// serve index.html on the route '/'
app.get("/", (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, "../index.html"));
});

//POST request for create user
app.post("/new", userController.createUser, (req, res) => {
  res.json(res.locals.user); //json to front end
});

//POST request for Login
app.post("/login", userController.verifyUser, (req, res) => {
  res.json(res.locals.result); //temp message to front end
});

//GET request for user feed
app.get("/posts", postController.getAllPosts,(req,res)=>{
  res.json(res.locals.allPosts)
})



//this catches any requests to an unknown route
app.use((req, res) => res.sendStatus(404));

//configure global error handler:
app.use((err, req, res, next) => {
  const defaultError = {
    log: "Unknown Middleware error",
    status: 400,
    message: { err: "Global Default Error Message: An error occured" },
  };
  const errObj = Object.assign(defaultError, err);
  console.log("Error Message: ", errObj.message);
  return res.status(errObj.status).json(errObj);
});

app.listen(3000); //listens on port 3000 -> http://localhost:3000/
