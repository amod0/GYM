"use strict";

const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("MembershipPlans", [
      {
        plan_id: uuidv4(), // Generate UUID for the first plan
        name: "1 Month",
        duration_in_days: 30,
        price: 50.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        plan_id: uuidv4(), // Generate UUID for the second plan
        name: "3 Months",
        duration_in_days: 90,
        price: 140.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        plan_id: uuidv4(), // Generate UUID for the third plan
        name: "6 Months",
        duration_in_days: 180,
        price: 250.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        plan_id: uuidv4(), // Generate UUID for the fourth plan
        name: "1 Year",
        duration_in_days: 365,
        price: 500.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("MembershipPlans", null, {});
  },
};
