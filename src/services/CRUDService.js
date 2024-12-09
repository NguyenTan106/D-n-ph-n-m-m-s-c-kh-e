const bcrypt = require("bcrypt");
const db = require("../models/index");

const createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hashPasswordFromBcrypt = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPasswordFromBcrypt,
        name: data.name,
        age: data.age,
        gender: data.gender,
      });

      resolve("create a new user succeed!");
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
      const user = await db.User.findOne({
        where: { id: data.id },
      });
      if (user) {
        user.email = data.email;
        user.name = data.name;
        user.age = data.age;
        user.gender = data.gender;

        await user.save();

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
      const user = await db.User.findOne({
        where: { id: userId },
      });
      if (user) {
        await user.destroy();

        resolve();
      } else {
        resolve();
      }
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
};
