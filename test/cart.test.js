const { expect, server } = require('./setup');
const fixtures = require('./fixtures');

let token;

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
      token = res.body.token;
      done();
    })
  })
})


describe("GET cart", () => {
  it("Gets a cart by token", done => {
    server.get('/carts')
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer: ` + token)
    .expect('Content-type', /json/)
    .expect(200)
    .end((err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
      done();
    })
  })

  it("Fails if token is not found.", done => {
    server.get('/carts')
    .set('Accept', 'application/json')
    .expect('Content-type', /json/)
    .expect(500)
    .end((err, res) => {
      expect(res.status).to.equal(500);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('errors');
      expect(res.body.errors[0]).to.have.property('msg')
      expect(res.body.errors[0].msg).to.equal('Missing cart token.')
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
      expect(res.body).to.have.property('errors');
      expect(res.body.errors[0]).to.have.property('msg')
      expect(res.body.errors[0].msg).to.equal('Invalid cart token.')
      done();
    })
  })
})

describe('DELETE cart', () => {
  it('Deletes a cart given valid token', done => {
    server.get('/carts')
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer: ` + token)
    .expect('Content-type', /json/)
    .expect(200)
    .end((err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
      done();
    })
  })

//   it('Fails if token is invalid', done => {

//   })
})