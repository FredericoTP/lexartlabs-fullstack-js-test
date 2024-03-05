const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const bcrypt = require('bcryptjs');
const { AccountService } = require('../../services');
const { Account } = require('../../database/models');
const { Unauthorized, BadRequest, Conflict } = require('../../errors');
const {
  allAccounts, oneAccount, newEmptyAcc, newAccount,
} = require('./mocks/mockAccount');

chai.use(sinonChai);

const { expect } = chai;

describe('AccountService', () => {
  beforeEach(() => {
    sinon.restore();
  });

  describe('Testing findAll function', () => {
    it('Succesfully returns all accounts', async () => {
      sinon.stub(Account, 'findAll').resolves(allAccounts);

      const accounts = await AccountService.findAll();

      expect(accounts).to.be.equal(allAccounts);
    });
  });

  describe('Testing findById function', () => {
    it('Should throw an error when id is empty', async () => {
      let error = new Error();

      try {
        await AccountService.findById();
      } catch (err) {
        error = err;
      }

      expect(error).to.be.instanceOf(BadRequest);
      expect(error.message).to.be.equal('id is a required field');
    });

    it('Succesfully returns an accounts', async () => {
      sinon.stub(Account, 'findAll').resolves(allAccounts[1]);

      const accounts = await AccountService.findById(2);

      expect(accounts).to.be.equal(allAccounts[1]);
    });
  });

  describe('Testing findByEmail function', () => {
    it('Should throw an error when email is empty', async () => {
      let error = new Error();

      try {
        await AccountService.findByEmail('');
      } catch (err) {
        error = err;
      }

      expect(error).to.be.instanceOf(BadRequest);
      expect(error.message).to.be.equal('email cannot be an empty field');
    });

    it('Succesfully returns an accounts', async () => {
      sinon.stub(Account, 'findOne').resolves(oneAccount);

      const accounts = await AccountService.findByEmail(oneAccount.email);

      expect(accounts).to.be.equal(oneAccount);
    });
  });

  describe('Testing create function', () => {
    it('Should throw an error if some field is empty', async () => {
      const { name, email, password } = newEmptyAcc;
      let error = new Error();

      try {
        await AccountService.create(name, email, password);
      } catch (err) {
        error = err;
      }

      expect(error).to.be.instanceOf(BadRequest);
      expect(error.message).to.be.equal('name cannot be an empty field');
    });

    it('Should throw an error if account already exists', async () => {
      const { name, email, password } = newAccount;
      let error = new Error();

      sinon.stub(Account, 'findOne').resolves(oneAccount);

      try {
        await AccountService.create(name, email, password);
      } catch (err) {
        error = err;
      }

      expect(error).to.be.instanceOf(Conflict);
      expect(error.message).to.be.equal('Account already exists!');
    });

    it('Succesfully creates an account', async () => {
      const { name, email, password } = newAccount;

      sinon.stub(Account, 'findOne').resolves(null);
      sinon.stub(Account, 'create').resolves(oneAccount);

      const account = await AccountService.create(name, email, password);

      expect(account).to.be.deep.equal(oneAccount);
    });
  });

  describe('Testing updatePassword function', () => {
    it('Should throw an error if password is empty', async () => {
      let error = new Error();

      try {
        await AccountService.updatePassword('', 1);
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
        await AccountService.updatePassword(newAccount.password, 1);
      } catch (err) {
        error = err;
      }

      expect(error).to.be.instanceOf(BadRequest);
      expect(error.message).to.be.equal('Account not found!');
    });

    it('Succesfully updates the account', async () => {
      sinon.stub(Account, 'findOne').resolves(oneAccount);
      sinon.stub(bcrypt, 'hashSync').resolves(oneAccount.password);
      const stub = sinon.stub(Account, 'update').resolves();

      await AccountService.updatePassword(newAccount.password, 1);

      sinon.assert.callCount(stub, 1);
    });
  });

  describe('Testing deleteAccount function', () => {
    it('Should throw an error if email is empty', async () => {
      let error = new Error();

      try {
        await AccountService.deleteAccount(newEmptyAcc.email);
      } catch (err) {
        error = err;
      }

      expect(error).to.be.instanceOf(BadRequest);
      expect(error.message).to.be.equal('email cannot be an empty field');
    });

    it('Should throw an error if account does not exist', async () => {
      let error = new Error();

      sinon.stub(Account, 'findOne').resolves(null);

      try {
        await AccountService.deleteAccount(oneAccount.email);
      } catch (err) {
        error = err;
      }

      expect(error).to.be.instanceOf(BadRequest);
      expect(error.message).to.be.equal('Account not found!');
    });

    it('Succesfully deletes an account', async () => {
      sinon.stub(Account, 'findOne').resolves(oneAccount);
      const stub = sinon.stub(Account, 'destroy').resolves();

      await AccountService.deleteAccount(oneAccount.email);

      sinon.assert.callCount(stub, 1);
    });
  });
});
