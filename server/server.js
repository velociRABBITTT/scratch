const express = require("express");
const app = express();
const path = require("path");


// const mongoURI =
//   "mongodb+srv://wes:sdop@solo-project.jihog.mongodb.net/user_db?retryWrites=true&w=majority";

// mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.connection.once("open", () => {
//   console.log("Connected to Database!");
// });

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
  return res.status(errObj.status).json(errObj.message);
});

app.listen(3000); //listens on port 3000 -> http://localhost:3000/
