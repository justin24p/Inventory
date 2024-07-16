const express = require("express");
const router = express.Router();

const car_controller = require("../controllers/carController");
const make_controller = require("../controllers/makeController");

// Routes

// Car Routes
router.get("/", car_controller.index);

router.get("/cars/create", car_controller.car_create_get);

router.post("/cars/create", car_controller.car_create_post);

router.get("/cars/:id/delete", car_controller.car_delete_get);

router.post("/cars/:id/delete", car_controller.car_delete_post);

router.get("/cars/:id/update", car_controller.car_update_get);

router.post("/cars/:id/update", car_controller.car_update_post);

router.get("/cars/:id", car_controller.car_detail);

router.get("/cars", car_controller.car_list);

// Make Routes
router.get("/make/create", make_controller.make_create_get);

router.post("/make/create", make_controller.make_create_post);

router.get("/make/:id/delete", make_controller.make_delete_get);

router.post("/make/:id/delete", make_controller.make_delete_post);

router.get("/make/:id/update", make_controller.make_update_get);

router.post("/make/:id/update", make_controller.make_update_post);

router.get("/make/:id", make_controller.make_detail);

router.get("/make", make_controller.make_list);

module.exports = router;
