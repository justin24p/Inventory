// imports to help us
const createError = require("http-errors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const dotenv = require("dotenv");

dotenv.config();

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const inventoryRouter = require("./routes/inventory");

// initalizing the express app
const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.set("strictQuery", "false");

//
const mongoDB = process.env.MONGODB_URI;
main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect(mongoDB);
}

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// is how we go about adding the middleware we imported and our custom middlware we will create
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// only after imported middleware is setup do we append our routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/inventory", inventoryRouter);

// catch 404 and forward to error handler

app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;

// jam stack host database and express logic in backend => and our frontend in something like
// vercel
// Rest api means representional state trasnfer a way for organizing methods of api in line with
// crud actions
// following rest makes api more mointanable and easier for other developers

// rest apis are resource based
// we refer dirctly to resource  and use http verbs to determine action GET/POST/PUT/DELTE
// /posts /posts/:postid /posts/:postid/comments
// EACH PART OF API URL specifies the resource

// Cors Same Origin Policy
// a security measure that only allow requests from same origin IP aka only allw requersts from our
// frontend website

// inventory managment for manga
