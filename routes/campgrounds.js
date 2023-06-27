const express = require("express");
const router = express.Router();
const campgrounds = require("../controllers/campgrounds");
const catchAsync = require("../helpers/catchAsync");
// const { campgroundSchema } = require("../schemas.js");
const { isLoggedIn, isAuthor, validateCampground } = require("../middleware");

const multer = require("multer");
const { storage } = require("../cloudinary");
//Created upload directory and saves pics there
// const upload = multer({ dest: "uploads/" });
const upload = multer({ storage });

// const ExpressError = require("../helpers/ExpressError");
//Require campgr model/review model
const Campground = require("../models/campground");

//See the list of the campgrounds
//This is where we submit a new campground
//See a specific campground
router
  .route("/")
  .get(catchAsync(campgrounds.index))
  .post(
    isLoggedIn,
    upload.array("image"),
    validateCampground,
    catchAsync(campgrounds.createCampground)
  );

// .post(upload.single("campImg"), (req, res) => {
//   console.log(req.body, req.files);
//   res.send("Worked");
// });

//Create a new campground
router.get("/new", isLoggedIn, campgrounds.renderNewForm);
//See a specific campground
//Delete a campgr

router
  .route("/:id")
  .get(catchAsync(campgrounds.showCampground))
  .put(
    isLoggedIn,
    isAuthor,
    upload.array("image"),
    validateCampground,
    catchAsync(campgrounds.updateCampground)
  )
  .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

//See/edit/update campground
router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(campgrounds.renderEditForm)
);

module.exports = router;
