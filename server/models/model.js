const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const mongoURI =
  "mongodb+srv://admin:admin@jared.uoo20.mongodb.net/scratch?retryWrites=true&w=majority";

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once("open", () => {
  console.log("Connected to Database!");
});



const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: { type: String, required:true},
  goal: { type: String, required: true },
  method: { type: String },
  duration: { type: String },
  results: { type: String },
  author: { type: String },
  created: { type: String }
});

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true },
});





userSchema.pre('save', function(next){
//  console.log(this.isNew)
  bcrypt.hash(this.password, saltRounds, (err, hash) => {
    // console.log(this.password)
    if (err){
      return next({err: 'Error in bycrpt hash function'})
    }
    else {
      this.password = hash;
      return next();
    }
  })
});

// userSchema.methods.comparePassword = function(plainPassword, next) {
//   bcrypt.compare(plainPassword, this.password, function(err, isMatch){
//     if (err) return next(err);
//     else console.log(isMatch)
//   })
// }


const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);
module.exports = {
  User,
  Post,
};
