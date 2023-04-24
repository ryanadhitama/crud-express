const BookController = require('../controllers/book');

function apply(app) {
  app.get('/', (req, res) => {
    res.send('ping');
  });

  app.get('/books', BookController.index);
  app.post('/books', BookController.store);
  app.patch('/books/:id', BookController.update);
  app.get('/books/:id', BookController.find);
  app.delete('/books/:id', BookController.destroy);

  return app;
}

module.exports = { apply };
