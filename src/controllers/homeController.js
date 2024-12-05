const connection = require("../configs/database");

const getHomePage = (req, res) => {
  let users = [];
  connection.query("SELECT * FROM NguoiDung", (err, results, fields) => {
    users = results;
    // console.log("result:", results);
    res.send(JSON.stringify(users));
  });
};

const getSample = (req, res) => {
  res.render("register");
};

const createNewUser = (req, res) => {
  console.log(req.body);
  res.send("create a new user");
};
module.exports = {
  getHomePage,
  getSample,
  createNewUser,
};
