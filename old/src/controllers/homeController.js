const connection = require("../configs/database");
const bcrypt = require("bcrypt");
// const db = require("../models/index");
const getHomePage = async (req, res) => {
  // let users = [];
  // connection.query("SELECT * FROM Users", (err, results, fields) => {
  //   users = results;
  //   // console.log("result:", results);
  //   res.send(JSON.stringify(users));
  // });
  res.send("Hello");
};

const getSample = (req, res) => {
  res.render("samples");
};

const register = (req, res) => {
  res.render("register");
};

const createNewUser = async (req, res) => {
  const { email, password, pass_repeat } = req.body;

  // Kiểm tra dữ liệu đầu vào
  if (!email || !password || !pass_repeat) {
    return res
      .status(400)
      .json({ errorCode: 400, message: "Email and passwords are required." });
  }

  if (password !== pass_repeat) {
    return res
      .status(400)
      .json({ errorCode: 400, message: "Passwords do not match." });
  }

  try {
    // Kiểm tra email đã tồn tại chưa
    connection.query(
      `SELECT * FROM Users WHERE email = ?`,
      [email],
      async (err, results) => {
        if (err) {
          console.error("Error checking email:", err);
          return res.status(500).json({
            errorCode: 500,
            message: "An error occurred while checking email.",
          });
        }

        if (results.length > 0) {
          return res
            .status(400)
            .json({ errorCode: 400, message: "Email already exists." });
        }

        // Email chưa tồn tại, tiếp tục tạo user
        const hashedPassword = await bcrypt.hash(password, 10);

        connection.query(
          `INSERT INTO Users (email, password) VALUES (?, ?)`,
          [email, hashedPassword],
          (err, result) => {
            if (err) {
              console.error("Error inserting user:", err);
              return res.status(500).json({
                errorCode: 500,
                message: "An error occurred while creating the user.",
              });
            }
            console.log("User created:", result);
            res.status(201).json({ message: "User created successfully!" });
          }
        );
      }
    );
  } catch (err) {
    console.error("Error:", err);
    res
      .status(500)
      .json({ errorCode: 500, message: "An unexpected error occurred." });
  }
};

module.exports = {
  getHomePage,
  getSample,
  createNewUser,
  register,
};
