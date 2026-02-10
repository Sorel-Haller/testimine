const express = require("express");
const router = express.Router();

module.exports = function createWorkshopRoutes(workshopController) {
  router.post("/workshops", (req, res) =>
    workshopController.create(req, res)
  );
  return router;
};
