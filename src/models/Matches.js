const { Double } = require("mongodb");
const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
    userId: {type: String, require: true, unique: false},
    nickname: {type: String, require: true, unique: false},
    score: {type: Number, require: true, unique: false},
    wpm: {type: Number, require: true, unique: false},
    maxCombo: {type: Number, require: true, unique: false},
    mode: {type: String, require: true, unique: false},
    createdAt: Date
})

module.exports = mongoose.model("Match", matchSchema);
