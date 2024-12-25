const authService = require("../services/APIs/authService");
const userApiService = require("../services/APIs/userApiService");

const testApi = (req, res) => {
  return res.status(200).json({
    message: "Ok",
    data: "test api",
  });
};

// Authenthication (Login - Register)
const validatePassword = (password) => {
  const hasUppercase = /[A-Z]/.test(password); // Kiểm tra chữ cái in hoa
  const hasLowercase = /[a-z]/.test(password); // Kiểm tra chữ cái thường
  const hasNumber = /[0-9]/.test(password); // Kiểm tra chữ số
  const isLongEnough = password.length >= 8; // Kiểm tra độ dài tối thiểu

  return hasUppercase && hasLowercase && hasNumber && isLongEnough;
};
const handleRegister = async (req, res) => {
  try {
    if (
      !req.body.email ||
      !req.body.password ||
      !req.body.name ||
      !req.body.gender ||
      !req.body.age ||
      !req.body.roleId
    ) {
      return res.status(200).json({
        EM: "Missing required parameters",
        EC: "1",
        DT: "",
      });
    }
    if (!validatePassword(req.body.password)) {
      return res.status(200).json({
        EM: "Password must have at least 3 characters, including uppercase, lowercase, and a number.",
        EC: "1",
        DT: "",
      });
    }

    // service: create user
    let data = await authService.registerNewUser(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: "",
    });
  } catch (error) {
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
      DT: "",
    });
  }
};
const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Missing required parameters",
    });
  }
  let userData = await authService.handleUserLogin(email, password);

  return res.status(200).json({
    errCode: userData.errCode,
    errMessage: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};

// CRUD User
const createUser = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
      DT: "",
    });
  }
};
const readUser = async (req, res) => {
  try {
    let data = await userApiService.getAllUser();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
      DT: "",
    });
  }
};
const updateUser = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
      DT: "",
    });
  }
};
const deleteUser = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
      DT: "",
    });
  }
};

module.exports = {
  testApi,
  handleRegister,
  handleLogin,
  createUser,
  readUser,
  updateUser,
  deleteUser,
};
