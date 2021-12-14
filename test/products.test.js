const { expect, server } = require('./setup');
const { products } = require('./fixtures');

describe('Routes for products', () => {
  it('Gets all products', done => {
    server 
      .get('/products')
      .set('Accept', 'application/json')
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.body).to.be.an('array')
        expect(res.body).to.deep.equals(products)
        done();
      })
  })

  it("Gets a single product by id.", done => {
    server
    .get('/products/1')
    .set('Accept', 'application/json')
    .expect('Content-type', /json/)
    .expect(200)
    .end((err, res) => {
      expect(res.status).to.equal(200)
      expect(res.body).to.be.an('object')
      expect(res.body).to.deep.equals(products[0])
      done();
    })
  })
})
