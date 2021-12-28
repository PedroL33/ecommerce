const { expect, server } = require('./setup');
const fixtures = require('./fixtures');
const utils = require('./utils');

let newCartToken;

describe('CREATE cart', () => {
  it("Creates a new cart", done => {
    server.post('/carts')
    .set('Accept', 'application/json')
    .expect('Content-type', /json/)
    .expect(200)
    .end((err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('token');
      newCartToken = res.body.token
      done();
    })
  })
})


describe("GET cart", () => {

  let cartToken;

  before(() => {
    cartToken = utils.createCartToken();
  })

  it("Gets a cart by token", done => {
    server.get('/carts')
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer: ` + cartToken)
    .expect('Content-type', /json/)
    .expect(200)
    .end((err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body).to.have.length(4)
      expect(res.body[0]).to.have.property('name')
      expect(res.body[0].name).to.equal(fixtures.products[1].name);
      done();
    })
  })

  it("Fails if token is not found.", done => {
    server.get('/carts')
    .set('Accept', 'application/json')
    .expect('Content-type', /json/)
    .expect(400)
    .end((err, res) => {
      expect(res.status).to.equal(400);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('msg');
      expect(res.body.msg).to.equal('Cart could not be found.')
      done();
    })
  })

  it("Fails if token is invalid", done => {
    server.get('/carts')
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer: invalid`)
    .expect('Content-type', /json/)
    .expect(500)
    .end((err, res) => {
      expect(res.status).to.equal(500);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('msg');
      expect(res.body.msg).to.equal('jwt malformed')
      done();
    })
  })
})

describe('DELETE cart', () => {
  it('Deletes a cart given valid token', done => {
    server.delete('/carts')
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer: ` + newCartToken)
    .expect('Content-type', /json/)
    .expect(200)
    .end((err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('msg');
      expect(res.body.msg).to.equal('Cart 2 deleted.');
      done();
    })
  })

  it('Fails if token is invalid', done => {
    server.delete('/carts')
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer: invalid')
    .expect('Content-type', /json/)
    .expect(500)
    .end((err, res) => {
      expect(res.status).to.equal(500);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('msg')
      expect(res.body.msg).to.equal('jwt malformed')
      done();
    })
  })
})