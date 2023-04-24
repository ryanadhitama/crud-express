const paginate = (req, total) => {
  const page = req.query?.page || '1';
  const page_size = req.query?.page_size || '10';
  const page_count = Math.ceil(total / page_size);
  const has_next = page < Math.ceil(total / page_size);

  return {
    meta: {
      page: Number(page),
      page_size: Number(page_size),
      page_count,
      total,
      has_next
    }
  };
};

module.exports = paginate;
