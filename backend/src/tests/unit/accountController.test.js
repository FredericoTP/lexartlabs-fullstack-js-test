const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { AccountController } = require('../../controllers');
const { AccountService } = require('../../services');
const {
  allAccounts, newAccount, infoToken, oneAccount,
} = require('./mocks/mockAccount');

chai.use(sinonChai);

const { expect } = chai;

describe('AccountController', () => {
  const req = {};
  const res = {};

  beforeEach(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  describe('Testing findAll function', () => {
    it('Succesfully returns all accounts', async () => {
      sinon.stub(AccountService, 'findAll').resolves(allAccounts);

      await AccountController.findAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allAccounts);
    });
  });

  describe('Testing create function', () => {
    it('Succesfully creates an account', async () => {
      const { name, email, password } = newAccount;

      req.body = { name, email, password };
      sinon.stub(AccountService, 'create').resolves(newAccount);

      await AccountController.create(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(newAccount);
    });
  });

  describe('Testing update function', () => {
    it('Succesfully updates an account', async () => {
      const { password } = newAccount;

      req.body = { password, infoToken };
      sinon.stub(AccountService, 'updatePassword').resolves();

      await AccountController.update(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({ message: 'Account has been updated!' });
    });
  });

  describe('Testing deleteAccount function', () => {
    it('Succesfully deletes an account', async () => {
      const { email } = oneAccount;

      req.body = { email };
      sinon.stub(AccountService, 'deleteAccount').resolves();

      await AccountController.deleteAccount(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({ message: 'Account has been deleted!' });
    });
  });
});
