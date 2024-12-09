// import db from "../models/index";
const e = require("express");
const db = require("../models/index");
const CRUDService = require("../services/CRUDService");

const getHomePage = async (req, res) => {
  try {
    const data = await db.User.findAll({
      raw: true,
    });
    return res.render("samples", {
      data: JSON.stringify(data),
    });
  } catch (e) {
    console.log(e);
  }
};

const register = async (req, res) => {
  const data = await CRUDService.getAllGender();
  return res.render("register", {
    dataTable: data,
  });
};

const postCRUD = async (req, res) => {
  try {
    const message = await CRUDService.createNewUser(req.body);
    console.log(message);
    res.send("create a new user succeed!!");
  } catch (error) {
    console.log(error);
  }
};

const getCRUD = async (req, res) => {
  const data = await CRUDService.getAllUser();
  return res.render("displayUser", {
    dataTable: data,
  });
};

const editCRUD = async (req, res) => {
  const userId = req.query.id;
  if (userId) {
    const gender = await CRUDService.getAllGender();
    const userData = await CRUDService.getUserInfoById(userId);
    //check  user data not found

    return res.render("editUser", {
      gender: gender,
      userData: userData,
    });
  } else {
    return res.send("User's not found!");
  }
};

const updateCRUD = async (req, res) => {
  const data = req.body;
  const allUsers = await CRUDService.updateUserData(data);
  return res.render("displayUser", {
    dataTable: allUsers,
  });
};

const deleteCRUD = async (req, res) => {
  const userId = req.query.id;
  if (userId) {
    await CRUDService.deleteUserById(userId);
    return res.send("delete a user succeed!");
  } else {
    return res.send("user not found!");
  }
};

module.exports = {
  getHomePage,
  register,
  postCRUD,
  getCRUD,
  editCRUD,
  updateCRUD,
  deleteCRUD,
};
