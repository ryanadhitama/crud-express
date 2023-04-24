const sequelize = require('sequelize');
const { Book } = require('../models');

const search = async (filter) => {
  let query = {};
  const { title, page, page_size, sort_by, sort_direction } = filter;

  if (filter.title) {
    query = {
      ...query,
      title: sequelize.where(
        sequelize.fn('LOWER', sequelize.col('title')),
        'LIKE',
        '%' + title.toLowerCase() + '%'
      )
    };
  }

  const list = await Book.findAndCountAll({
    where: query,
    offset: (page - 1) * page_size,
    limit: page_size,
    order: [[sort_by, sort_direction]]
  });
  return list;
};

module.exports = {
  search
};
