const express = require("express");
const path = require("path");
require("dotenv").config();
const configViewEngine = require("./configs/viewEngine");
const webRoute = require("./routes/web");
const mysql = require("mysql2");
const connection = require("./configs/database");

// console.log(">>> check env: ", process.env);
const app = express();
const port = process.env.PORT || 8080;
const hostname = process.env.HOST_NAME;

// config template engine and config static files
configViewEngine(app);

// config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//simple querry
// connection.query("SELECT * FROM NguoiDung", (err, results, fields) => {
//   console.log("result:", results);
// });

// declare route
app.use("/", webRoute);

app.listen(port, () => {
  console.log(`App listening on port ${hostname}:${port}`);
});
