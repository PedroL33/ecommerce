const { expect, server } = require('./setup');
const fixtures = require('./fixtures');
const jwt = require('jsonwebtoken');

let token = jwt.sign(
  { id: 1 }, 
  process.env.JWT_SECRET_KEY, 
  { expiresIn: '1d' }
)

describe('CREATE cartItem', () => {
  it('Creates a new cart item', done => {
    server.post('/cart_items')
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer: ` + token)
    .send(fixtures.cartItems[0])
    .expect('Content-type', /json/)
    .expect(200)
    .end((err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('quantity');
      expect(res.body.quantity).to.equal(fixtures.cartItems[0].quantity);
      done();
    })
  })

  it('Fails if cart item with same product id exists in the same cart', done => {
    server.post('/cart_items')
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer: ` + token)
    .send(fixtures.invalidCartItems[0])
    .expect('Content-type', /json/)
    .expect(500)
    .end((err, res) => {
      expect(res.status).to.equal(500);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('msg');
      done();
    })
  })

  it('Fails if product stock is insufficient', done => {
    server.post('/cart_items')
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer: ` + token)
    .send(fixtures.invalidCartItems[2])
    .expect('Content-type', /json/)
    .expect(500)
    .end((err, res) => {
      expect(res.status).to.equal(500);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('msg');
      done();
    })
  })

  it('Fails if token is invalid', done => {
    server.post('/cart_items')
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer: invalid`)
    .send(fixtures.cartItems[1])
    .expect('Content-type', /json/)
    .expect(500)
    .end((err, res) => {
      expect(res.status).to.equal(500);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('msg');
      done();
    })
  })

  it('Fails if product id does not exist', done => {
    server.post('/cart_items')
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer: ` + token)
    .send(fixtures.invalidCartItems[1])
    .expect('Content-type', /json/)
    .expect(500)
    .end((err, res) => {
      expect(res.status).to.equal(500);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('msg');
      done();
    })
  })
});

describe('UPDATE cartItem', () => {
  it('Updates the quantity of a cart item', done => {
    server.put('/cart_items')
    .set('Accept', 'application/json')
    .set("Authorization", 'Bearer: ' + token)
    .send({quantity: 4})
    .expect('Content-type', /json/)
    .expect(200)
    .end((err, res) => {
      expect(res.status).to.equal(200)
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('quantity')
      expect(res.body.quantity).to.equal(4);
      done();
    })
  })

  it('Fails if product stock is insufficient', done => {
    server.put('/cart_items')
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer: ` + token)
    .send({ quantity: 12 })
    .expect('Content-type', /json/)
    .expect(500)
    .end((err, res) => {
      expect(res.status).to.equal(500);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('msg');
      done();
    })
  })

  it('Fails if token is invalid', done => {
    server.put('/cart_items')
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer: invalid')
    .send(fixtures.updatedCartItems[0])
    .expect('Content-type', /json/)
    .expect(500)
    .end((err, res) => {
      expect(res.status).to.equal(500)
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('msg')
      done();
    })
  })

  it('Fails if quantity is not specified', done => {
    server.put('/cart_items')
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer: ' + token)
    .expect('Content-type', /json/)
    .expect(400)
    .end((err, res) => {
      expect(res.status).to.equal(400)
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('msg')
      expect(res.body.msg).to.equal('Quantity not specified');
      done();
    })
  })
});

describe('DELETE cartItem', () => {
  it('Deletes a cart item', done => {
    server.delete('/cart_items')
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer: ' + token)
    .expect('Content-type', /json/)
    .expect(200)
    .end((err, res) => {
      expect(res.status).to.equal(200)
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('id')
      expect(res.body.id).to.equal(1);
      done();
    })
  })

  it('Fails if token is invalid', done => {
    server.delete('/cart_items')
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer: invalid')
    .expect('Content-type', /json/)
    .expect(500)
    .end((err, res) => {
      expect(res.status).to.equal(500)
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('msg')
      done();
    })
  })    
});

