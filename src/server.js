const express = require("express");
const bodyParser = require("body-parser");
const configViewEngine = require("./configs/viewEngine");
const initWebRoutes = require("./routes/web");
const connectDB = require("./configs/connectDB");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

// config req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// config template engine and config static files
configViewEngine(app);
initWebRoutes(app);

connectDB();
//simple querry
// connection.query("SELECT * FROM NguoiDung", (err, results, fields) => {
//   console.log("result:", results);
// });

app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
