"use strict";
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../configs/config.json")[env];
const db = {};

let sequelize;
try {
  if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
  } else {
    sequelize = new Sequelize(
      config.database,
      config.username,
      config.password,
      config
    );
  }
  console.log("Database connection established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
  process.exit(1); // Optional: Exit the process if the database connection fails
}

try {
  fs.readdirSync(__dirname)
    .filter((file) => {
      return (
        file.indexOf(".") !== 0 &&
        file !== basename &&
        file.slice(-3) === ".js" &&
        file.indexOf(".test.js") === -1
      );
    })
    .forEach((file) => {
      try {
        const modelPath = path.join(__dirname, file);
        const model = require(modelPath)(sequelize, Sequelize.DataTypes);
        if (!model || !model.name) {
          throw new Error(`Model at ${file} does not export a valid object.`);
        }
        db[model.name] = model;
      } catch (error) {
        console.error(`Error loading model file '${file}':`, error);
      }
    });
} catch (error) {
  console.error("Error reading or processing model files:", error);
  process.exit(1); // Optional: Exit the process if critical file processing fails
}

try {
  Object.keys(db).forEach((modelName) => {
    try {
      if (db[modelName].associate) {
        db[modelName].associate(db);
      }
    } catch (error) {
      console.error(`Error during association of model '${modelName}':`, error);
    }
  });
} catch (error) {
  console.error("Error processing model associations:", error);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
