const bcrypt = require("bcrypt");
const db = require("../models/index");

const checkEmailExist = async (email) => {
  try {
    let user = await db.User.findOne({
      where: { email: email },
    });
    if (user) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
  }
};

const hashUserPassword = async (password) => {
  const salt = bcrypt.genSaltSync(10);
  try {
    const hashPassword = await bcrypt.hashSync(password, salt);
    return hashPassword;
  } catch (error) {
    console.log(error);
  }
};

const registerNewUser = async (rawUserData) => {
  try {
    // check email / password
    let isEmailExist = await checkEmailExist(rawUserData.email);
    if (isEmailExist === true) {
      return {
        EM: "Email is already exist",
        EC: 1,
      };
    }
    // hash user password
    let hashPasswordFromBcrypt = await hashUserPassword(rawUserData.password);

    // create new user
    await db.User.create({
      email: rawUserData.email,
      password: hashPasswordFromBcrypt,
      name: rawUserData.name,
      age: rawUserData.age,
      gender: rawUserData.gender,
      roleId: rawUserData.roleId,
    });
    return {
      EM: "A user is created successfully",
      EC: 0,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrongs in service...",
      EC: -2,
    };
  }
};

module.exports = {
  registerNewUser,
};
