const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MakeSchema = new Schema({
    name: { type: String, required: true, unique: true },
    region: { type: String },
});

MakeSchema.virtual("url").get(function () {
    return `/make/${this._id}`;
});

module.exports = mongoose.model("Make", MakeSchema);
