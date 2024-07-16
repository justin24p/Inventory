const Car = require("../models/Car");
const Make = require("../models/make");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.index = asyncHandler(async (req, res, next) => {
    const [numCars, numMakers] = await Promise.all([
        Car.countDocuments({}).exec(),
        Make.countDocuments({}).exec(),
    ]);
    res.render("index", {
        car_count: numCars,
        make_count: numMakers,
    });
});

exports.car_list = asyncHandler(async (req, res, next) => {
    const allCars = await Car.find(
        {},
        "name make year  mileage fuelType imgUrl"
    )
        .populate("make")
        .exec();

    console.log(allCars);
    res.render("car_list", { title: "Car List", car_list: allCars });
});

exports.car_detail = asyncHandler(async (req, res, next) => {
    const car = await Car.findById(req.params.id).populate("make").exec();

    if (car === null) {
        const err = new Error("car is not found");
        err.status = 404;
        return next(err);
    }
    res.render("car_detail", {
        car: car,
    });
});

exports.car_create_get = asyncHandler(async (req, res, next) => {
    const allMakes = await Make.find({}, "name").sort({ title: 1 }).exec();

    res.render("car_form", {
        title: "Create New Car",
        make_List: allMakes,
    });
});

exports.car_create_post = [
    // Validate and sanitize fields
    body("name", "Name must be specified").trim().isLength({ min: 1 }).escape(),
    body("make", "Make must be specified").trim().isLength({ min: 1 }).escape(),
    body("year", "Invalid year").isInt({ min: 1886 }).toInt(),
    body("mileage", "Invalid mileage").isInt({ min: 0 }).toInt(),
    body("horsepower", "Invalid horsepower").isInt({ min: 50 }).toInt(),
    body("cylinder", "Invalid cylinder").isIn([
        "V4",
        "V6",
        "V8",
        "V10",
        "V12",
        "V16",
    ]),
    body("fuelType", "Invalid fuel type").isIn([
        "Hybrid",
        "Gasoline",
        "Electric",
        "Hydrogen",
    ]),
    body("type")
        .optional()
        .isIn([
            "Sedan",
            "Coupe",
            "Truck",
            "SUV",
            "Wagon",
            "Hatchback",
            "Convertible",
            "Van",
        ]),
    body("imgUrl").optional().isURL(),

    // Process request after validation and sanitization
    asyncHandler(async (req, res, next) => {
        // Extract the validation errors from a request
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors
            // Render form again with sanitized values and error messages
            const allMakes = await Make.find({}, "name")
                .sort({ name: 1 })
                .exec();

            res.render("car_form", {
                title: "Create New Car",
                make_List: allMakes,
                errors: errors.array(),
                car: {
                    name: req.body.name,
                    make: req.body.make,
                    year: req.body.year,
                    mileage: req.body.mileage,
                    horsepower: req.body.horsepower,
                    cylinder: req.body.cylinder,
                    fuelType: req.body.fuelType,
                    type: req.body.type,
                    imgUrl: req.body.imgUrl,
                },
            });
            return;
        } else {
            // Data from form is valid
            const {
                name,
                make,
                year,
                mileage,
                horsepower,
                cylinder,
                fuelType,
                type,
                imgUrl,
            } = req.body;

            try {
                const newCar = new Car({
                    name: name,
                    make: make,
                    year: year,
                    mileage: mileage,
                    horsepower: horsepower,
                    cylinder: cylinder,
                    fuelType: fuelType,
                    type: type,
                    imgUrl: imgUrl,
                });

                await newCar.save();
                res.redirect(newCar.url);
            } catch (err) {
                return next(err);
            }
        }
    }),
];

exports.car_delete_get = asyncHandler(async (req, res, next) => {
    const car = await Car.findById(req.params.id).exec();
});

exports.car_delete_post = asyncHandler(async (req, res, next) => {
    res.send("ignore");
});

exports.car_update_get = asyncHandler(async (req, res, next) => {
    res.send("ignore");
});

exports.car_update_post = asyncHandler(async (req, res, next) => {
    res.send("ignore");
});
