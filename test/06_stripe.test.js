const { expect, server } = require('./setup');
const utils = require('./utils');
const fixtures = require('./fixtures');

let token;

before(() => {
  token = utils.createCartToken();
})

describe('GET client id', () => {
  it('Returns a valid client_id', done => {
    server.post('/stripe/secret')
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer: ' + token)
    .send(fixtures.paymentIntentInfo)
    .expect('Content-type', /json/)
    .expect(200)
    .end((err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('client_secret');
      done();
    })
  })

  it('Fails if a valid token is not passed', done => {
    server.post('/stripe/secret')
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer: invalid')
    .send(fixtures.paymentIntentInfo)
    .expect('Content-type', /json/)
    .expect(500)
    .end((err, res) => {
      expect(res.status).to.equal(500);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('msg');
      done();
    })
  })

  it('Fails if address format is not valid', done => {
    server.post('/stripe/secret')
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer: ' + token)
    .send(fixtures.invalidPaymentIntentInfo)
    .expect('Content-type', /json/)
    .expect(400)
    .end((err, res) => {
      expect(res.status).to.equal(400);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('msg');
      expect(res.body.msg).to.have.equal('Invalid shipping address format.');
      done();
    })
  })

  it('Fails if shipping method or address is not provided', done => {
    server.post('/stripe/secret')
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer: ' + token)
    .expect('Content-type', /json/)
    .expect(400)
    .end((err, res) => {
      expect(res.status).to.equal(400);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('msg');
      expect(res.body.msg).to.have.equal('Must include shipping_address contact, and shipping_method.');
      done();
    })
  })
})