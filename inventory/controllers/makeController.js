const Make = require("../models/make");
const asyncHandler = require("express-async-handler");

exports.make_list = asyncHandler(async (req, res, next) => {
    res.send("make list");
});

// might potentinal not need this as i dont plan to show unique page for each make
// the create and delete will be in the main make page alongside the maker details already
exports.make_detail = asyncHandler(async (req, res, next) => {
    res.send(`car detail ${req.params.id}`);
});

// i will for sure need this
exports.make_create_get = asyncHandler(async (req, res, next) => {
    res.send("ignore");
});

exports.make_create_post = asyncHandler(async (req, res, next) => {
    res.send("ignore");
});

exports.make_delete_get = asyncHandler(async (req, res, next) => {
    res.send("ignore");
});

exports.make_delete_post = asyncHandler(async (req, res, next) => {
    res.send("ignore");
});

exports.make_update_get = asyncHandler(async (req, res, next) => {
    res.send("ignore");
});

exports.make_update_post = asyncHandler(async (req, res, next) => {
    res.send("ignore");
});
