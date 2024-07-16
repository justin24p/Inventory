var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
    res.redirect("/inventory");
});

module.exports = router;

// what im i making an inventory managment app
// inventory app should have categories and items
// in homepage a user can select a category to view and get a list of items in category
// crud operation for both categories and items in categories
