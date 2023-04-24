'use strict';

/** @type {import('sequelize-cli').Migration} */
const { Op } = require('sequelize');
const books = ['Science', 'Art', 'History', 'Sports'];

module.exports = {
  async up(queryInterface, Sequelize) {
    const timestamp = new Date();
    const lists = books.map((book) => ({
      title: book,
      description: '-',
      created_at: timestamp,
      updated_at: timestamp
    }));
    await queryInterface.bulkInsert('books', lists, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      'books',
      {
        title: { [Op.in]: books }
      },
      {}
    );
  }
};
