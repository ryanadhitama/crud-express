const service = require('../services/book');
const qs = require('../libs/qs');
const paginate = require('../libs/paginate');
const exception = require('../libs/error');

const index = async (req, res, next) => {
  try {
    const filter = qs(req);
    const data = await service.search({ ...req.query, ...filter });
    return res.json({
      success: true,
      data: data.rows,
      ...paginate(req, data.count)
    });
  } catch (error) {
    const { status, message } = exception(error);
    res.status(status).json({ success: false, message });
    next(error);
  }
};

const store = (req, res) => {
  return res.json({
    success: true
  });
};

const find = (req, res) => {
  return res.json({
    success: true
  });
};

const update = (req, res) => {
  return res.json({
    success: true
  });
};

const destroy = (req, res) => {
  return res.json({
    success: true
  });
};

module.exports = {
  index,
  store,
  find,
  update,
  destroy
};
