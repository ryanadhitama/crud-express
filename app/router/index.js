const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const BookController = require('../controllers/book');
const swaggerSpec = require('./docs');

function apply(app) {
  app.get('/', (req, res) => {
    res.send('ping');
  });

  app.get('/v1/books', BookController.index);
  app.post('/v1/books', BookController.store);
  app.patch('/v1/books/:id', BookController.update);
  app.get('/v1/books/:id', BookController.find);
  app.delete('/v1/books/:id', BookController.destroy);

  app.use('/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  return app;
}

module.exports = { apply };
