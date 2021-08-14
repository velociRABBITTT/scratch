const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
  goal: { type: String, required: true },
  method: { type: String },
  results: { type: String },
  duration: { type: String },
  conclusion: { type: String }
});

module.exports = mongoose.model("Post", postSchema);
