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
});

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;

// [
// {
//     "id": 1,
//     "parent": 0,
//     "droppable": true,
//     "text": "Folder 1"
//   },
//   {
//     "id": 2,
//     "parent": 1,
//     "droppable": false,
//     "text": "File 1-1",
//     "data": {
//       "fileType": "csv",
//       "fileSize": "0.5MB"
//     }
//   },
//   {
//     "id": 3,
//     "parent": 1,
//     "droppable": false,
//     "text": "File 1-2",
//     "data": {
//       "fileType": "text",
//       "fileSize": "4.8MB"
//     }
//   },
//   {
//     "id": 4,
//     "parent": 0,
//     "droppable": true,
//     "text": "Folder 2"
//   },
//   {
//     "id": 5,
//     "parent": 4,
//     "droppable": true,
//     "text": "Folder 2-1"
//   },
//   {
//     "id": 6,
//     "parent": 5,
//     "droppable": false,
//     "text": "File 2-1-1",
//     "data": {
//       "fileType": "image",
//       "fileSize": "2.1MB"
//     }
//   },
//   {
//     "id": 7,
//     "parent": 0,
//     "droppable": false,
//     "text": "File 3",
//     "data": {
//       "fileType": "image",
//       "fileSize": "0.8MB"
//     }
//   }
// ]
