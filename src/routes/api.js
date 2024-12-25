const express = require("express");
const router = express.Router();
const apiController = require("../controllers/apiController");
// declare route
const initApiRoutes = (app) => {
  router.get("/test-api", apiController.testApi);

  // Authenthication (Login - Register)
  router.post("/register", apiController.handleRegister);
  router.post("/login", apiController.handleLogin);

  // CRUD User
  router.post("/create-user", apiController.createUser);
  router.get("/read-user", apiController.readUser);
  router.put("/update-user", apiController.updateUser);
  router.delete("/delete-user", apiController.deleteUser);

  return app.use("/api/v1/", router);
};

module.exports = initApiRoutes;
