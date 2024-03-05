const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { LoginController } = require('../../controllers');
const { LoginService } = require('../../services');
const { infoLogin, responseLogin } = require('./mocks/mockLogin');

chai.use(sinonChai);

const { expect } = chai;

describe('LoginController', () => {
  const req = {};
  const res = {};

  beforeEach(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  describe('Testing login function', () => {
    it('Succesfully login and returns a token', async () => {
      req.body = infoLogin;
      sinon.stub(LoginService, 'login').resolves(responseLogin.token);

      await LoginController.login(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(responseLogin);
    });
  });
});
