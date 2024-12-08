"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      genderId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Genders",
          key: "id",
        },
        allowNull: false,
      },
      weight: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      height: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      bmi: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      bmr: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      activityLevelId: {
        type: Sequelize.INTEGER,
        references: {
          model: "ActivityLevels",
          key: "id",
        },
        allowNull: false,
      },
      medicalHistory: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      goalId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Goals",
          key: "id",
        },
        allowNull: false,
      },
      roleId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Roles",
          key: "id",
        },
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
