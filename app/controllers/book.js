const s = require('superstruct');
const service = require('../services/book');
const qs = require('../libs/qs');
const paginate = require('../libs/paginate');
const { exception } = require('../libs/error');
const { validate } = require('../libs/validate');

const index = async (req, res, next) => {
  try {
    const filter = qs(req);
    const data = await service.search({ ...req.query, ...filter });
    return res.json({
      status: 200,
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

const store = async (req, res, next) => {
  const schema = {
    title: s.nonempty(s.string()),
    description: s.optional(s.string())
  };

  const errors = validate(req.body, schema);
  if (errors) {
    return res.status(400).json({
      success: false,
      message: errors
    });
  }

  try {
    const data = await service.store(req.body);
    return res.status(201).json({
      success: true,
      data: data
    });
  } catch (error) {
    const { status, message } = exception(error);
    res.status(status).json({ success: false, message });
    next(error);
  }
};

const find = async (req, res, next) => {
  try {
    const data = await service.find(req.params.id);
    return res.json({
      status: 200,
      success: true,
      data: data
    });
  } catch (error) {
    const { status, message } = exception(error);
    res.status(status).json({ success: false, message });
    next(error);
  }
};

const update = async (req, res, next) => {
  const schema = {
    title: s.nonempty(s.string()),
    description: s.optional(s.string())
  };

  const errors = validate(req.body, schema);
  if (errors) {
    return res.status(400).json({
      success: false,
      message: errors
    });
  }

  try {
    await service.find(req.params.id);
    await service.update({ id: req.params.id }, req.body);
    const data = await service.find(req.params.id);

    return res.json({
      status: 200,
      success: true,
      data: data
    });
  } catch (error) {
    const { status, message } = exception(error);
    res.status(status).json({ success: false, message });
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    await service.find(req.params.id);
    await service.destroy({
      id: req.params.id
    });
    return res.json({
      status: 200,
      success: true,
      message: 'Success delete'
    });
  } catch (error) {
    const { status, message } = exception(error);
    res.status(status).json({ success: false, message });
    next(error);
  }
};

module.exports = {
  index,
  store,
  find,
  update,
  destroy
};
