let mongoose = require("mongoose");
let schema_1 = require("./schema");

exports.default = mongoose.model('User', schema_1.default);