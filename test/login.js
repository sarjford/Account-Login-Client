var app = require('../index.js'),
  chai = require('chai'),
  request = require('supertest');

describe('POST /login', function() {
  it('responds with json', function(done) {
  request(app)
    .post('/api/user')
    .send({email: 'mickey@gmail.com', password: 'mickey001'})
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(201)
    .end(function(err, res) {
      if (err) return done(err);
      done();
    });
  });
});