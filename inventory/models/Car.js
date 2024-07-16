const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CarSchema = new Schema({
    name: { type: String, required: true },
    instock: { type: Boolean, required: true, default: true },
    make: { type: Schema.Types.ObjectId, ref: "Make", required: true },
    year: { type: Number, required: true, min: 1886 },
    mileage: { type: Number, required: true, min: 0 },
    horsepower: { type: Number, required: true, min: 50 },
    cylinder: {
        type: String,
        required: true,
        enum: ["V4", "V6", "V8", "V10", "V12", "V16"],
        default: "V4",
    },
    fuelType: {
        type: String,
        required: true,
        enum: ["Hybrid", "Gasoline", "Electric", "Hydrogen"],
        default: "Gasoline",
    },
    type: {
        type: String,
        enum: [
            "Sedan",
            "Coupe",
            "Truck",
            "SUV",
            "Wagon",
            "Hatchback",
            "Convertible",
            "Van",
        ],
        default: "Sedan",
    },
    imgUrl: { type: String },
});

CarSchema.virtual("url").get(function () {
    return `/make/car/${this._id}`;
});
module.exports = mongoose.model("Car", CarSchema);
// dealer inventory project perct
