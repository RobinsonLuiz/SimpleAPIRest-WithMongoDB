let mongoose = require("mongoose");
let UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, lowercase: true, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

exports.default = UserSchema;