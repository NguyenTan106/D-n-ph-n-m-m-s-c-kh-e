const db = require("../../models/index");

const getAllUser = async () => {
  let data = await db.User.findAll();
  return;
};

const createNewUser = async () => {};

const updateUser = async () => {};

const deleteUser = async () => {};

module.exports = { getAllUser, createNewUser, updateUser, deleteUser };
