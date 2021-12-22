const { expect, server } = require('./setup');
const fixtures = require('./fixtures');

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

describe("Signup", () => {

  it('Creates a new user', done => {
    server.post('/signup')
    .send(fixtures.newUser)
    .set('Accept', 'application/json')
    .expect('Content-type', /json/)
    .expect(200)
    .end((err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('rowCount');
      expect(res.body.rowCount).to.be.greaterThan(0);
      done();
    })
  })

  it('Fails if username is already in use', done => {
    server.post('/signup')
    .send(fixtures.newUser)
    .set('Accept', 'application/json')
    .expect('Content-type', /json/)
    .expect(400)
    .end((err, res) => {
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('errors');
      done();
    })
  })

  it('Fails if database constraints are not followed', done => {
    server.post('/signup')
    .send(fixtures.invalidUser)
    .set('Accept', 'application/json')
    .expect('Content-type', /json/)
    .expect(400)
    .end((err, res) => {
      expect(res.status).to.equal(400)
      expect(res.body).to.have.property('errors');
      done();
    })
  })
})

describe('Login', () => {
  it('Logs in users with valid credentials', done => {
    server.post('/login')
    .send({
      username: fixtures.newUser.username,
      password: fixtures.newUser.password
    })
    .set('Accept', 'application/json')
    .expect('Content-type', /json/)
    .expect(200)
    .end((err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("token");
      done();
    })
  })

  it('Fails if username is not found', done => {
    server.post('/login')
    .send({
      username: fixtures.invalidUser.username,
      password: fixtures.newUser.password
    })
    .set('Accept', 'application/json')
    .expect('Content-type', /json/)
    .expect(400)
    .end((err, res) => {
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("errors");
      done();
    })
  })

  it('Fails if password is not correct', done => {
    server.post('/login')
    .send({
      username: fixtures.newUser.username,
      password: fixtures.invalidUser.password
    })
    .set('Accept', 'application/json')
    .expect('Content-type', /json/)
    .expect(400)
    .end((err, res) => {
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("errors");
      done();
    })
  })
})