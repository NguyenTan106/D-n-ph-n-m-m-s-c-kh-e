// import db from "../models/index";
const e = require("express");
const db = require("../models/index");
const CRUDService = require("../services/CRUDService");
const userService = require("../services/userService");

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
  const gender = await CRUDService.getAllGender();
  const role = await CRUDService.getAllRole();
  return res.render("register", {
    dataTable: gender,
    dataRole: role,
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
  try {
    const data = await CRUDService.getAllUser(); // Lấy dữ liệu từ CRUDService
    for (let user of data) {
      user.role_name = await userService.getRoleNameById(user.roleId); // Lấy tên vai trò
    }
    return res.render("displayUser", {
      dataTable: data,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({
      errCode: 1,
      errMessage: "Server error",
    });
  }
};

const editCRUD = async (req, res) => {
  const userId = req.query.id;
  if (userId) {
    const gender = await CRUDService.getAllGender();
    const role = await CRUDService.getAllRole();
    const userData = await CRUDService.getUserInfoById(userId);
    //check  user data not found

    return res.render("editUser", {
      gender: gender,
      role: role,
      userData: userData,
    });
  } else {
    return res.send("User's not found!");
  }
};

const updateCRUD = async (req, res) => {
  const data = req.body;
  const allUsers = await CRUDService.updateUserData(data);
  for (let user of allUsers) {
    user.role_name = await userService.getRoleNameById(user.roleId); // Lấy tên vai trò
  }
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
