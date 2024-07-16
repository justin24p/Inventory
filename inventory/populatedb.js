#!/usr/bin/env node

console.log(
    'This script populates some test makes and cars to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

const userArgs = process.argv.slice(2);
const mongoose = require("mongoose");
const Make = require("./models/make");
const Car = require("./models/Car");
const makes = [];
const cars = [];

const mongoDB = userArgs[0];

main().catch((err) => console.error(err));

async function main() {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(mongoDB);
    console.log("Connected to MongoDB.");

    await createMakes();
    await createCars();

    console.log("Closing MongoDB connection...");
    await mongoose.connection.close();
    console.log("MongoDB connection closed.");
}

async function makeCreate(name, region) {
    const makeDetail = { name: name };
    if (region) makeDetail.region = region;

    const make = new Make(makeDetail);
    await make.save();
    makes.push(make);
    console.log(`Added make: ${name}`);
}

async function carCreate(
    make,
    name,
    year,
    mileage,
    horsepower,
    cylinder,
    fuelType,
    type,
    imgUrl, // Cloudinary image URL
    instock = true
) {
    const carDetail = {
        make: make,
        name: name,
        year: year,
        mileage: mileage,
        horsepower: horsepower,
        cylinder: cylinder,
        fuelType: fuelType,
        type: type,
        imgUrl: imgUrl, // Use Cloudinary URL here
        instock: instock,
    };

    const car = new Car(carDetail);
    await car.save();
    cars.push(car);
    console.log(`Added car: ${year} ${name}`);
}

async function createMakes() {
    console.log("Adding makes...");
    for (const makeData of [
        { name: "Toyota", region: "Japan" },
        { name: "Ford", region: "United States" },
        { name: "BMW", region: "Germany" },
    ])
        await makeCreate(makeData.name, makeData.region);
}

async function createCars() {
    console.log("Adding cars...");
    // Use Cloudinary image URLs
    await Promise.all([
        carCreate(
            makes[0],
            "Camry",
            2022,
            0,
            300,
            "V6",
            "Gasoline",
            "SUV",
            "https://www.motortrend.com/uploads/2021/12/2022-Toyota-Camry-SE-11.jpg"
        ),
        carCreate(
            makes[1],
            "F-150",
            2021,
            10000,
            250,
            "V8",
            "Gasoline",
            "Truck",

            "https://blog.vipautoaccessories.com/wp-content/uploads/2021/03/clement-ford-1140x570.jpg"
        ),
        carCreate(
            makes[2],
            "M4",
            2023,
            5000,
            400,
            "V12",
            "Gasoline",
            "Coupe",
            "https://media.ed.edmunds-media.com/bmw/m4/2022/oem/2022_bmw_m4_coupe_competition_fq_oem_1_1600.jpg"
        ),
    ]);
}
