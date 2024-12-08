// import db from "../models/index";
const db = require("../models/index");

const getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    return res.render("samples", {
      data: JSON.stringify(data),
    });
  } catch (e) {
    console.log(e);
  }
};
const register = (req, res) => {
  res.render("register");
};
module.exports = {
  getHomePage,
  register,
};
