const { Sequelize } = require("sequelize");
const userModel = require("./user_test");
const connection = require("../configs/database");

const User = userModel(connection);

connection
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

// Đồng bộ hóa cơ sở dữ liệu
connection
  .sync({ force: false }) // Đặt `force: true` để xóa và tạo lại bảng
  .then(() => {
    console.log("Database & tables created!");
  });

module.exports = {
  connection,
  User,
};
