"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Foods", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      origin: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      foodType: {
        type: Sequelize.ENUM(
          "Vegetable",
          "Fruit",
          "Meat",
          "Seafood",
          "Grain",
          "Other"
        ),
        allowNull: false,
      },
      healthBenefits: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      targetAudience: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      usageInstructions: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      expirationDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      storageInstructions: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      allergyInfo: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      imageUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      trustedSuppliers: {
        type: Sequelize.TEXT,
        allowNull: true,
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
    await queryInterface.dropTable("Foods");
  },
};
