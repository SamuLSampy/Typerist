const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    nickname: {type: String, require: true, unique: true},
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    passwordResetToken: {type: String, require: false},
    passwordResetExpires: {type: Date, required: false}
})

module.exports = mongoose.model('User', UserSchema);
