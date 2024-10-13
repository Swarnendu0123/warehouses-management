const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  id: String,
  parent: String,
  droppable: Boolean,
  text: String,
  data: {
    fileType: String,
    fileSize: String,
  },
  createdBy: String,
});

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;