const { expect, server } = require('./setup');
const utils = require('./utils');

let token;

before(() => {
  token = utils.createToken();
})

describe('GET orders', () => {
  it('Gets a list of all orders', done => {
    server.get('/orders')
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer: ' + token)
    .expect('Content-type', /json/)
    .expect(200)
    .end((err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.equal(4);
      done();
    })
  })

  it('Gets a list of all pending orders', done => {
    server.get('/orders/pending')
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer: ' + token)
    .expect('Content-type', /json/)
    .expect(200)
    .end((err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.equal(1);
      done();
    })
  })

  it('Gets a list of all fulfilled orders', done => {
    server.get('/orders/fulfilled')
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer: ' + token)
    .expect('Content-type', /json/)
    .expect(200)
    .end((err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.equal(2);
      done();
    })
  })

  it('Gets an orders details by id', done => {
    server.get('/orders/details/1')
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer: ' + token)
    .expect('Content-type', /json/)
    .expect(200)
    .end((err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('contact');
      expect(res.body.contact).to.equal('7591 NW. Smoky Hollow St. Tullahoma, TN 37388');
      done();
    })
  })

  it('Gets an orders items by id', done => {
    server.get('/orders/items/1')
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer: ' + token)
    .expect('Content-type', /json/)
    .expect(200)
    .end((err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.equal(3);
      done();
    })
  })

  it('Fails if order id does not exist', done => {
    server.get('/orders/items/5')
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer: ' + token)
    .expect('Content-type', /json/)
    .expect(400)
    .end((err, res) => {
      expect(res.status).to.equal(400);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('msg');
      expect(res.body.msg).to.equal('Order cannot be found.');
      done();
    })
  })

  it('Fails if admin token is not provided', done => {
    server.get('/orders/details/1')
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer: invalid')
    .expect('Content-type', /json/)
    .expect(500)
    .end((err, res) => {
      expect(res.status).to.equal(500);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('msg');
      done();
    })
  })
})

describe('UPDATE orders', () => {
  it('Updates the status of an order', done => {
    server.put('/orders/1')
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer: ' + token)
    .send({status: 'fulfilled'})
    .expect('Content-type', /json/)
    .expect(200)
    .end((err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('status');
      expect(res.body.status).to.have.equal('fulfilled');
      done();
    })
  })

  it('Fails if admin token is not provided', done => {
    server.put('/orders/1')
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer: invalid')
    .expect('Content-type', /json/)
    .send({status: 'fulfilled'})
    .expect(500)
    .end((err, res) => {
      expect(res.status).to.equal(500);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('msg');
      done();
    })
  })
})