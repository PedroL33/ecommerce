const app = require('../app');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const supertest = require('supertest');

chai.use(sinonChai);
const { expect } = chai;
const server = supertest.agent(app);

module.exports = {
  expect, 
  server
}
