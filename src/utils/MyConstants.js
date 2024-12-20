require("dotenv").config();

const MyConstants = {
  DB_SERVER: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASSWORD,
  DB_DATABASE: process.env.DB_NAME,
  JWT_SECRET: "2174802010439", //json web token
  JWT_EXPIRES: "86400000", // in milliseconds
  EMAIL_USER: "tannguyenkhacminh@gmail.com", // gmail service
  EMAIL_PASS: "ibmi dfeb kovh xkfo",
};
module.exports = MyConstants;
