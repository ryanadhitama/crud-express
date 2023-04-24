const sequelize = require('sequelize');
const { Book } = require('../models');
const { HTTPException } = require('../libs/error');

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

const find = async (id) => {
  const data = await Book.findOne({
    where: {
      id: id
    }
  });

  if (!data) {
    throw new HTTPException('Data not found', { status: 404 });
  }

  return data;
};

const store = async (body) => {
  const { title, description } = body;
  return Book.create({
    title,
    description
  });
};

const update = async (filter, body) => {
  await Book.update(body, {
    where: {
      ...filter
    }
  });
};

const destroy = async (filter) => {
  return Book.destroy({
    where: {
      ...filter
    }
  });
};

module.exports = {
  search,
  store,
  find,
  update,
  destroy
};
