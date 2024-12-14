const db = require("../models/index");
const bcrypt = require("bcrypt");

const handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        let user = await db.User.findOne({
          where: { email: email },
        });
        if (user) {
          let check = await bcrypt.compareSync(password, user.password);
          if (check) {
            userData.errCode = 0;
            userData.errMessage = "Ok";
            delete user.password;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = "Your email or password is not correct";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = "User is not found";
        }
      } else {
        userData.errCode = 1;
        userData.errMessage = `Your email isn't exist in your system!`;
      }
      resolve(userData);
    } catch (error) {
      reject(error);
    }
  });
};

const checkUserEmail = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: email },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId === "ALL") {
        users = await db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
        });
      }
      if (userId && userId !== "ALL") {
        users = await db.User.findOne({
          where: { id: userId },
          attributes: {
            exclude: ["password"],
          },
        });
      }
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};

const getRoleNameById = (roleId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const role = await db.Role.findOne({ where: { id: roleId } });
      if (role) {
        resolve(role.role_name); // Resolve với tên vai trò nếu tìm thấy
      } else {
        resolve("Unknown"); // Resolve với 'Unknown' nếu không tìm thấy
      }
    } catch (error) {
      reject(error); // Reject với lỗi nếu có
    }
  });
};

const createNewUser = (roleId) => {
  return new Promise(async (resolve, reject) => {
    try {
    } catch (error) {
      reject(error); // Reject với lỗi nếu có
    }
  });
};

module.exports = {
  getAllUsers,
  getRoleNameById,
  createNewUser,
  checkUserEmail,
  handleUserLogin,
};
