const connection = require("../configs/database");

const getHomePage = (req, res) => {
  let users = [];
  connection.query("SELECT * FROM NguoiDung", (err, results, fields) => {
    users = results;
    console.log("result:", results);
    res.send(JSON.stringify(users));
  });
};

const getSample = (req, res) => {
  res.render("samples");
};

module.exports = {
  getHomePage,
  getSample,
};
