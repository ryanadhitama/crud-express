const express = require('express');
const request = require('supertest');

const app = express();
const router = require('../app/router');
const { Book } = require('../app/models');

jest.setTimeout(20000);
app.use(express.json());
router.apply(app);

describe('Get books', () => {
  it('Success get books', (done) => {
    request(app)
      .get('/v1/books?title=a')
      .expect(200)
      .then((res) => {
        done();
      })
      .catch(done);
  });
  it('Failed get books', (done) => {
    request(app)
      .get('/v1/books?sort_by=name')
      .expect(500)
      .then((res) => {
        done();
      })
      .catch(done);
  });
});

let id = null;
describe('Get book by ID', () => {
  beforeAll(async () => {
    const data = await Book.findOne({
      order: [['id', 'DESC']]
    });

    id = data?.id;
  });

  it('Success get book by ID', (done) => {
    request(app)
      .get(`/v1/books/${id}`)
      .expect(200)
      .then((res) => {
        done();
      })
      .catch(done);
  });
  it('Failed get book by ID', (done) => {
    request(app)
      .get('/v1/books/100000')
      .expect(404)
      .then((res) => {
        done();
      })
      .catch(done);
  });
});

describe('Store book', () => {
  it('Success store book', (done) => {
    request(app)
      .post('/v1/books')
      .send({
        title: 'title',
        description: 'desc'
      })
      .expect(201)
      .then((res) => {
        done();
      })
      .catch(done);
  });

  it('Failed store book (Invalid Payload)', (done) => {
    request(app)
      .post('/v1/books')
      .send({
        title: 'title',
        desc: 'desc'
      })
      .expect(400)
      .then((res) => {
        done();
      })
      .catch(done);
  });
});

describe('Update book', () => {
  beforeAll(async () => {
    const data = await Book.findOne({
      order: [['id', 'DESC']]
    });

    id = data?.id;
  });
  it('Success update book', (done) => {
    request(app)
      .patch(`/v1/books/${id}`)
      .send({
        title: 'title'
      })
      .expect(200)
      .then((res) => {
        done();
      })
      .catch(done);
  });

  it('Failed update book (Not Found)', (done) => {
    request(app)
      .patch(`/v1/books/${id + 1000}`)
      .send({
        title: 'title'
      })
      .expect(404)
      .then((res) => {
        done();
      })
      .catch(done);
  });

  it('Failed update book (Invalid Payload)', (done) => {
    request(app)
      .patch(`/v1/books/${id}`)
      .send({
        title: 1
      })
      .expect(400)
      .then((res) => {
        done();
      })
      .catch(done);
  });
});

describe('Delete book', () => {
  beforeAll(async () => {
    const data = await Book.findOne({
      order: [['id', 'DESC']]
    });

    id = data?.id;
  });
  it('Success delete book', (done) => {
    request(app)
      .delete(`/v1/books/${id}`)
      .expect(200)
      .then((res) => {
        done();
      })
      .catch(done);
  });

  it('Failed delete book (Not Found)', (done) => {
    request(app)
      .delete(`/v1/books/${id + 1000}`)
      .expect(404)
      .then((res) => {
        done();
      })
      .catch(done);
  });
});
