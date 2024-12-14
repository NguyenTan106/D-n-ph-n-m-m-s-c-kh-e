const userService = require("../services/userService");

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(500).json({
      errcode: 1,
      errMessage: "Missing required parameters",
    });
  }
  let userData = await userService.handleUserLogin(email, password);

  return res.status(200).json({
    errcode: userData.errCode,
    errMessage: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};

const handleGetAllUsers = async (req, res) => {
  let id = req.query.id?.trim();
  if (!id) {
    return res.status(200).json({
      errcode: 1,
      errMessage: "Missing required parameters",
      users: [],
    });
  }
  let users = await userService.getAllUsers(id);
  for (let user of users) {
    user.role_name = await userService.getRoleNameById(user.roleId); // Lấy tên vai trò
  }
  return res.status(200).json({
    errCode: 0,
    errMessage: "Ok",
    users,
  });
};

const handleCreateNewUser = async (req, res) => {};

module.exports = {
  handleGetAllUsers,
  handleCreateNewUser,
  handleLogin,
};
