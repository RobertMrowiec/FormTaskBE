const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../app');

chai.use(chaiHttp);

  describe('GET Events', () => {
    it('should return array of events', (done) => {
      chai.request(server)
        .get('/api/events')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('array');
          done();
        });
    });
  });

  describe('ADD Events', () => {

    it('should throw error during adding event to database without firstName', (done) => {
      chai.request(server)
          .post('/api/events')
          .type('json')
          .send({
            'lastName':'test',
            'email':'eqw@gmail.com',
            'date':'2018-02-12'
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.an('object');
            res.body.should.have.key('message')
            res.body.message.should.equal('Wrong request body')
            done();
          });
    });

    it('should throw error during adding event to database without lastName', (done) => {
      chai.request(server)
          .post('/api/events')
          .type('json')
          .send({
            'firstName':'test',
            'email':'eqw@gmail.com',
            'date':'2018-02-12'
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.an('object');
            res.body.should.have.key('message');
            res.body.message.should.equal('Wrong request body');
            done();
          });
    });

    it('should throw error during adding event to database without email', (done) => {
      chai.request(server)
          .post('/api/events')
          .type('json')
          .send({
            'firstName':'Test',
            'lastName':'Test2',
            'date':'2018-02-12'
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.an('object');
            res.body.should.have.key('message');
            res.body.message.should.equal('Wrong request body');
            done();
          });
    });

    it('should throw error during adding event to database without date', (done) => {
      chai.request(server)
          .post('/api/events')
          .type('json')
          .send({
            'firstName':'Test',
            'lastName':'Test2',
            'email':'asd@gmail.com'
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.an('object');
            res.body.should.have.key('message');
            res.body.message.should.equal('Wrong request body');
            done();
          });
    });

    it('should throw error during adding event to database with invalid email', (done) => {
      chai.request(server)
          .post('/api/events')
          .type('json')
          .send({
            'firstName':'Test',
            'lastName':'Test2',
            'email':'asdgmail.com',
            'date':'2018-02-02'
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.an('object');
            res.body.should.have.key('message');
            res.body.message.should.equal('Wrong request body');
            done();
          });
    });

    it('should throw error during adding event to database with invalid firstName', (done) => {
      chai.request(server)
          .post('/api/events')
          .type('json')
          .send({
            'firstName':'st',
            'lastName':'Test2',
            'email':'asdgmail.com',
            'date':'2018-02-02'
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.an('object');
            res.body.should.have.key('message');
            res.body.message.should.equal('Wrong request body');
            done();
          });
    });

    it('should throw error during adding event to database with invalid lastName', (done) => {
      chai.request(server)
          .post('/api/events')
          .type('json')
          .send({
            'firstName':'Test',
            'lastName':'t2',
            'email':'asdgmail.com',
            'date':'2018-02-02'
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.an('object');
            res.body.should.have.key('message');
            res.body.message.should.equal('Wrong request body');
            done();
          });
    });

    it('should throw error during adding event to database with invalid date', (done) => {
      chai.request(server)
          .post('/api/events')
          .type('json')
          .send({
            'firstName':'st',
            'lastName':'Test2',
            'email':'asdgmail.com',
            'date':'2018-22-02'
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.an('object');
            res.body.should.have.key('message');
            res.body.message.should.equal('Wrong request body');
            done();
          });
    });
    it('should save an object into events collection', (done) => {
      chai.request(server)
        .post('/api/events')
        .type('json')
        .send({
          'firstName':'Test',
          'lastName':'Test2',
          'email':'asd@gmail.com',
          'date':'2018-04-02'
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('_id');
          res.body.firstName.should.equal('Test');
          res.body.lastName.should.equal('Test2');
          res.body.email.should.equal('asd@gmail.com');
          res.body.date.should.equal(new Date('2018-04-02').toISOString());
          done();
        });
    });
  });
