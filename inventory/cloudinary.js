const cloudinary = require("cloudinary").v2;
require("dotenv").config();

const bmw = "./public/images/bmw.png";
const ford = "./public/images/ford.png";
const toyota = "./public/images/toyota.png";

let bmwurl;
cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
});

cloudinary.uploader.upload(bmw).then((result) => {
    bmwurl = result;
});
