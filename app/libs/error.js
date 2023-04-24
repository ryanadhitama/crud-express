const error = (error) => {
  return {
    status: error?.status || 500,
    message: error?.message || 'Internal server error'
  };
};

module.exports = error;
