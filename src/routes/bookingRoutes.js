const express = require("express");
const router = express.Router();

module.exports = function createBookingRoutes(bookingController) {
  router.post("/bookings", (req, res) =>
    bookingController.create(req, res)
  );
  return router;
};
