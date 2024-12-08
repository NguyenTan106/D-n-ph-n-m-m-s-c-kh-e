const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING(255), // Mật khẩu thường được băm nên để độ dài đủ lớn
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    gender: {
      type: DataTypes.ENUM("Male", "Female", "Other"),
      allowNull: false,
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    height: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    bmi: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    bmr: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    activity_level: {
      type: DataTypes.ENUM("Low", "Medium", "High"),
      allowNull: false,
    },
    goal: {
      type: DataTypes.ENUM(
        "LoseWeight",
        "GainWeight",
        "MaintainHealth",
        "SupportIllness"
      ),
      allowNull: false,
    },
    medical_history: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });

  return User;
};
