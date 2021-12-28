const { expect, server } = require('./setup');
const fixtures = require('./fixtures');
const utils = require('./utils');
const path = require('path');
const upload = require('../utils/photoUpload');

describe('GET products.', () => {
  it('Gets all products', done => {
    server 
      .get('/products')
      .set('Accept', 'application/json')
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.body).to.be.an('array')
        expect(res.body).to.have.length(fixtures.products.length)
        done();
      })
  })

  it("Gets a single product by id", done => {
    server
    .get('/products/1')
    .set('Accept', 'application/json')
    .expect('Content-type', /json/)
    .expect(200)
    .end((err, res) => {
      expect(res.status).to.equal(200)
      expect(res.body).to.be.an('object')
      expect(res.body).to.deep.have.property('id')
      done();
    })
  })

  it("Gets products by category", done => {
    server
    .get('/products/category/items')
    .set('Accept', 'application/json')
    .expect('Content-type', /json/)
    .expect(200)
    .end((err, res) => {
      expect(res.status).to.equal(200)
      expect(res.body).to.be.an('array')
      expect(res.body).to.have.length(3);
      done();
    })
  })

  it("Gets products by search phrase", done => {
    server
    .get('/products/search/testsearch')
    .set('Accept', 'application/json')
    .expect('Content-type', /json/)
    .expect(200)
    .end((err, res) => {
      expect(res.status).to.equal(200)
      expect(res.body).to.be.an('array')
      expect(res.body).to.have.length(3);
      done();
    })
  })
});

describe('CREATE products', () => {

  let token;

  before(() => {
    token = utils.createToken();
  })

  it("Creates a new product", done => {
    server
    .post('/products')
    .send(fixtures.product)
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer: ' + token)
    .expect('Content-type', /json/)
    .expect(200)
    .end((err, res) => {
      expect(res.body).to.be.a('object')
      expect(res.status).to.equal(200)
      expect(res.body).to.have.property('rowCount');
      expect(res.body.rowCount).to.be.greaterThan(0);
      done();
    })
  })

  it("Fails if a validation constraints are broken", done => {
    server.post('/products')
    .send(fixtures.invalidProduct)
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer: ' + token)
    .expect('Content-type', /json/)
    .expect(400)
    .end((err, res) => {
      expect(res.status).to.equal(400)
      expect(res.body).to.have.property('errors')
      done();
    })
  })
})

describe('UPDATE products', () => {

  let token;

  let imgURL;

  before(() => {
    token = utils.createToken();
  })

  after(async () => {
    await upload.deleteFile(imgURL);
  })

  it("Updates a product", done => {
    server.put('/products/1')
    .send(fixtures.updatedProduct)
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer: ' + token)
    .expect('Content-type', /json/)
    .expect(200)
    .end((err, res) => {
      expect(res.status).to.equal(200)
      expect(res.body).to.be.an('object')
      expect(res.body).to.have.property('id');
      done();
    })
  })

  it("Fails to update if a product is not found", done => {
    server.put('/products/16')
    .send(fixtures.updatedProduct)
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer: ' + token)
    .expect('Content-type', /json/)
    .expect(404)
    .end((err, res) => {
      expect(res.status).to.equal(404);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('msg');
      expect(res.body.msg).to.equal('Product not found.')
      done();
    })
  })

  it("Uploads a photo for a product", done => {
    server.put('/products/uploadPhoto/1')
    .set('Content-Type', 'multipart/form-data')
    .set('Authorization', 'Bearer: ' + token)
    .attach('image', path.resolve(__dirname, 'fixtures/test.png'))
    .expect(200)
    .expect('Content-type', /json/)
    .end((err, res) => {
      imgURL = res.body.image;
      expect(res.status).to.equal(200)
      done();
    })
  })

  it("Fails to upload photo if product not found", done => {
    server.put('/products/uploadPhoto/16')
    .set('Content-Type', 'multipart/form-data')
    .set('Authorization', 'Bearer: ' + token)
    .attach('image', path.resolve(__dirname, 'fixtures/test.png'))
    .expect(404)
    .end((err, res) => {
      expect(res.status).to.equal(404);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('msg');
      expect(res.body.msg).to.equal('Product not found.')
      done();
    })
  })

  it("Fails to upload photo if a file is not present", done => {
    server.put('/products/uploadPhoto/16')
    .set('Content-Type', 'multipart/form-data')
    .set('Authorization', 'Bearer: ' + token)
    .expect(500)
    .end((err, res) => {
      expect(res.status).to.equal(500);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('msg');
      expect(res.body.msg).to.equal('Multipart: Boundary not found')
      done();
    })
  })

})

describe("Routes for deleting a product", () => {

  let token;

  before(() => {
    token = utils.createToken();
  })

  it("Deletes a product", done => {
    server.delete('/products/1')
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer: ' + token)
    .expect('Content-type', /json/)
    .expect(200)
    .end((err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('msg');
      expect(res.body.msg).to.equals('Product 1 deleted.');
      done();
    })
  })

  it("Fails if user id is not found", done => {
    server.delete('/products/15')
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer: ' + token)
    .expect('Content-type', /json/)
    .expect(404)
    .end((err, res) => {
      expect(res.status).to.equal(404)
      expect(res.body).to.have.property('msg')
      expect(res.body.msg).to.equal('Product not found.')
      done();
    })
  })

})
