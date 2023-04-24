const exception = (error) => {
  return {
    status: error?.status || 500,
    message: error?.message || 'Internal server error'
  };
};

class HTTPException extends Error {
  constructor(message, { status }) {
    super(message);
    this.status = status;
  }
}

module.exports = { exception, HTTPException };
