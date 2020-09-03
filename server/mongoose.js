const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/todo", {
  keepAlive: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("debug", true);
mongoose.Promise = Promise;

module.exports.Todo = require("./todo");
