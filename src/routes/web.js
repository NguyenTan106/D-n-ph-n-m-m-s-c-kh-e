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

// declare route
const initWebRoutes = (app) => {
  router.get("/", getHomePage);
  router.get("/register", register);
  // router.get("/samples", getSample);
  router.post("/create-user", postCRUD);
  router.get("/list-user", getCRUD);
  router.get("/edit-user", editCRUD);
  router.post("/update-user", updateCRUD);
  router.get("/delete-user", deleteCRUD);

  return app.use("/", router);
};

module.exports = initWebRoutes;
