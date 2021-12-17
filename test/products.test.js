const { expect, server } = require('./setup');
const fixtures = require('./fixtures');

describe('Routes for fetching products.', () => {
  it('Gets all products', done => {
    server 
      .get('/products')
      .set('Accept', 'application/json')
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.body).to.be.an('array')
        expect(res.body).to.deep.equals(fixtures.products)
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
      expect(res.body).to.deep.equals(fixtures.products[0])
      done();
    })
  })

  // it("Gets products by category", done => {
  //   server.get('/products/')
  // })

  // it("Gets products by search phrase", done => {

  // })
});

describe('Routes for creating products', () => {

  // it("Creates a new product", done => {
  //   server
  //   .post('/products')
  //   .send(fixtures.product)
  //   .set('Accept', 'application/json')
  //   .expect('Content-type', /json/)
  //   .expect(200)
  //   .end((err, res) => {
  //     expect(res.body).to.be.a('object')
  //     expect(res.status).to.equal(200)
  //     let newProduct = {...fixtures.product};
  //     newProduct.id = res.body.id;
  //     expect(res.body).to.deep.equals(newProduct);
  //     done();
  //   })
  // })

  // it("Fails if a validation constraints are broken", done => {
  //   server.post('/products')
  //   .send(fixtures.invalidProduct)
  //   .set('Accept', 'application/json')
  //   .expect('Content-type', /json/)
  //   .expect(400)
  //   .end((err, res) => {
  //     expect(res.status).to.equal(400)
  //     expect(res.body).to.have.property('errors')
  //     done();
  //   })
  // })

  // it("Updates a product", done => {

  // })

  // it("Uploads a photo for a product", done => {

  // })
})

// describe("Routes for deleting a product", () => {

  // it("Deletes a product", done => {

  // })
// })
