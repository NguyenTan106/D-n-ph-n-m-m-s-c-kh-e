const bcrypt = require("bcrypt");
const db = require("../../models/index");

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

module.exports = {
  registerNewUser,
  handleUserLogin,
};
