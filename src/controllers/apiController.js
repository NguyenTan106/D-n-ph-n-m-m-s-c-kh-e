const authService = require("../services/authService");

const testApi = (req, res) => {
  return res.status(200).json({
    message: "Ok",
    data: "test api",
  });
};

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
  console.log("call me", req.body);
};

module.exports = {
  testApi,
  handleRegister,
};
