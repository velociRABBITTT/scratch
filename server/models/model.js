const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://admin:admin@jared.uoo20.mongodb.net/scratch?retryWrites=true&w=majority";

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once("open", () => {
  console.log("Connected to Database!");
});

const Schema = mongoose.Schema;

const postSchema = new Schema({
  goal: { type: String, required: true },
  method: { type: String },
  duration: { type: String },
  results: { type: String },
});

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);

module.exports = mongoose.model("Post", postSchema);
