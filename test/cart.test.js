const { expect, server } = require('./setup');

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
    .set('Authorization', `Bearer: ` + token)
    .expect('Content-type', /json/)
    .expect(200)
    .end((err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('msg');
      expect(res.body.msg).to.equal('Cart 1 deleted.');
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