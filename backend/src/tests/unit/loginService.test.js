const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { LoginService } = require('../../services');
const { Account } = require('../../database/models');
const { Unauthorized, BadRequest } = require('../../errors');
const { emptyLogin, infoLogin, infoAccount } = require('./mocks/mockLogin');

chai.use(sinonChai);

const { expect } = chai;

describe('LoginService', () => {
  beforeEach(() => {
    sinon.restore();
  });

  describe('Testing login function', () => {
    it('Should throw an error when email is empty', async () => {
      let error = new Error();

      try {
        await LoginService.login(emptyLogin.email, infoLogin.password);
      } catch (err) {
        error = err;
      }

      expect(error).to.be.instanceOf(BadRequest);
      expect(error.message).to.be.equal('email cannot be an empty field');
    });

    it('Should throw an error when password is empty', async () => {
      let error = new Error();

      try {
        await LoginService.login(infoLogin.email, emptyLogin.password);
      } catch (err) {
        error = err;
      }

      expect(error).to.be.instanceOf(BadRequest);
      expect(error.message).to.be.equal('password cannot be an empty field');
    });

    it('Should throw an error if account does not exist', async () => {
      let error = new Error();
      sinon.stub(Account, 'findOne').resolves(null);

      try {
        await LoginService.login(infoLogin.email, infoLogin.password);
      } catch (err) {
        error = err;
      }

      expect(error).to.be.instanceOf(Unauthorized);
      expect(error.message).to.be.equal('Invalid email or password');
    });

    it('Should throw an error when password is wrong', async () => {
      let error = new Error();
      sinon.stub(Account, 'findOne').resolves(infoAccount);
      sinon.stub(bcrypt, 'compareSync').returns(false);

      try {
        await LoginService.login(infoLogin.email, infoLogin.password);
      } catch (err) {
        error = err;
      }

      expect(error).to.be.instanceOf(Unauthorized);
      expect(error.message).to.be.equal('Invalid email or password');
    });

    it('Succesfully login and returns a token', async () => {
      sinon.stub(Account, 'findOne').resolves(infoAccount);
      sinon.stub(bcrypt, 'compareSync').returns(true);
      sinon.stub(jwt, 'sign').returns('abc');

      const token = await LoginService.login(infoLogin.email, infoLogin.password);

      expect(token).to.be.equal('abc');
    });
  });
});
