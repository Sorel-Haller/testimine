const express = require("express");
const router = express.Router();

module.exports = function createUserRoutes(userController) {
  router.post("/users", (req, res) => userController.create(req, res));
  return router;
};
