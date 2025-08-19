const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: String,
    name: String,
    mobno: Number,
    email: String,
    password: String,
    agree: Boolean
})

module.exports = mongoose.model("userModel", userSchema);