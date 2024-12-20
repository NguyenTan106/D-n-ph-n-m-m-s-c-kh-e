const bcrypt = require("bcrypt");
const db = require("../models/index");

const createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Check if the email already exists
      const existingUser = await db.User.findOne({
        where: { email: data.email },
      });
      if (existingUser) {
        return reject(
          new Error("Email already exists. Please use a different email.")
        );
      }

      // Hash the password
      const hashPasswordFromBcrypt = await hashUserPassword(data.password);

      // Create a new user
      await db.User.create({
        email: data.email,
        password: hashPasswordFromBcrypt,
        name: data.name,
        age: data.age,
        gender: data.gender,
        roleId: data.role,
      });

      resolve("Create a new user succeeded!");
    } catch (error) {
      reject(error);
    }
  });
};

const hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    const salt = bcrypt.genSaltSync(10);
    try {
      const hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (error) {
      reject(error);
    }
  });
};

const getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const users = db.User.findAll();
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};

const getAllRole = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const roles = db.Role.findAll();
      resolve(roles);
    } catch (error) {
      reject(error);
    }
  });
};

const getAllGender = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const genders = db.Gender.findAll();
      resolve(genders);
    } catch (error) {
      reject(error);
    }
  });
};

const getUserInfoById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { id: userId },
        raw: true,
      });
      if (user) {
        resolve(user);
      } else {
        resolve({});
      }
    } catch (error) {
      reject(error);
    }
  });
};

const updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.update(
        {
          email: data.email,
          name: data.name,
          age: data.age,
          gender: data.gender,
          roleId: data.role,
        },
        {
          where: { id: data.id },
        }
      );

      if (user) {
        const allUsers = await db.User.findAll();
        resolve(allUsers);
      } else {
        resolve();
      }
    } catch (error) {
      reject(error);
    }
  });
};

const deleteUserById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      // let user = await db.User.findOne({
      //   where: { id: userId },
      // });
      // if (user) {
      //   await user.destroy();
      //   resolve();
      // } else {
      //   resolve();
      // }
      await db.User.destroy({
        where: {
          id: userId,
        },
        raw: true,
      });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createNewUser,
  hashUserPassword,
  getAllUser,
  getAllGender,
  getUserInfoById,
  updateUserData,
  deleteUserById,
  getAllRole,
};
