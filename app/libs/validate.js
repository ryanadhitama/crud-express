const s = require('superstruct');

const validate = (value, struct) => {
  try {
    s.assert(value, s.object(struct));
  } catch (error) {
    return error;
  }
};

module.exports = {
  validate
};
