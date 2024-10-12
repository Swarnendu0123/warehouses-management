const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    id: String,
    name: String,
    parent_godown: String,
    createdBy: String,
});

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;