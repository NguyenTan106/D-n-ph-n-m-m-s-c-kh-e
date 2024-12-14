const express = require("express");
const router = express.Router();
const {
  getHomePage,
  register,
  postCRUD,
  getCRUD,
  editCRUD,
  updateCRUD,
  deleteCRUD,
} = require("../controllers/homeController.js");
const userControllers = require("../controllers/userControllers.js");
// declare route
const initWebRoutes = (app) => {
  // home controller
  router.get("/", getHomePage);
  router.get("/register", register);
  // router.get("/samples", getSample);
  router.post("/create-user", postCRUD);
  router.get("/list-user", getCRUD);
  router.get("/edit-user", editCRUD);
  router.post("/update-user", updateCRUD);
  router.get("/delete-user", deleteCRUD);

  // user controller
  router.post("/api/login", userControllers.handleLogin);
  router.get("/api/get-all-users", userControllers.handleGetAllUsers);
  router.get("/api/create-new-user", userControllers.handleCreateNewUser);

  return app.use("/", router);
};

module.exports = initWebRoutes;
