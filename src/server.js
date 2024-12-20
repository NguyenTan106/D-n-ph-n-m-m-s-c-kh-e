const express = require("express");
const bodyParser = require("body-parser");
const configViewEngine = require("./configs/viewEngine");
const configCors = require("./configs/cors");
const initWebRoutes = require("./routes/web");
const initApiRoutes = require("./routes/api");

const connectDB = require("./configs/connectDB");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

// config  cors
configCors(app);

// config template engine and config static files
configViewEngine(app);

// config req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

initWebRoutes(app);
initApiRoutes(app);

connectDB();

app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
