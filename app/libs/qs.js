const qs = (req) => {
  const page = req.query?.page || '1';
  const page_size = req.query?.page_size || '10';
  const sort_by = req.query?.sort_by || 'created_at';
  const sort_direction = req.query?.sort_direction || 'desc';

  return {
    page,
    page_size,
    sort_by,
    sort_direction
  };
};

module.exports = qs;
