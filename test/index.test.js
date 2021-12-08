const { expect, server } = require('./setup');

describe('Base url welcome', () => {
  it('Gets base url', done => {
    server 
      .get('/')
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.body.msg).to.equal('Welcome')
      })
      done();
  })
})