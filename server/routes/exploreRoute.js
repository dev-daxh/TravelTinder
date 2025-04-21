const express = require("express");
const { addTrip,getAllTrips } = require("../controllers/exploreController");

const router = express.Router();

router.post("/add-trip", addTrip);
router.get("/get-all-trip", getAllTrips);

module.exports = router;
