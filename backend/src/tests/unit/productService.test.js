const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { ProductService } = require('../../services');
const { Product, Account } = require('../../database/models');
const { BadRequest, Conflict } = require('../../errors');
const {
  allProducts, oneProduct, accountProducts, emptyProduct,
} = require('./mocks/mockProducts');
const { oneAccount } = require('./mocks/mockAccount');

chai.use(sinonChai);

const { expect } = chai;

describe('ProductService', () => {
  beforeEach(() => {
    sinon.restore();
  });

  describe('Testing findAll function', () => {
    it('Succesfully returns all accounts', async () => {
      sinon.stub(Product, 'findAll').resolves(allProducts);

      const products = await ProductService.findAll();

      expect(products).to.be.equal(allProducts);
    });
  });

  describe('Testing findProductById function', () => {
    it('Should throw an error if id is empty', async () => {
      let error = new Error();

      try {
        await ProductService.findProductById();
      } catch (err) {
        error = err;
      }

      expect(error).to.be.instanceOf(BadRequest);
      expect(error.message).to.be.equal('id is a required field');
    });

    it('Succesfully returns a product', async () => {
      sinon.stub(Product, 'findOne').resolves(oneProduct);

      const product = await ProductService.findProductById(1);

      expect(product).to.be.equal(oneProduct);
    });
  });

  describe('Testing findByAccountId function', () => {
    it('Should throw an error if accountId is empty', async () => {
      let error = new Error();

      try {
        await ProductService.findByAccountId();
      } catch (err) {
        error = err;
      }

      expect(error).to.be.instanceOf(BadRequest);
      expect(error.message).to.be.equal('accountId is a required field');
    });

    it('Succesfully returns all products of an account', async () => {
      sinon.stub(Product, 'findAll').resolves(accountProducts);

      const products = await ProductService.findByAccountId(1);

      expect(products).to.be.equal(accountProducts);
    });
  });

  describe('Testing create function', () => {
    it('Should throw an error if some field is empty', async () => {
      const {
        name, brand, model, price, color, accountId,
      } = emptyProduct;
      let error = new Error();

      try {
        await ProductService.create(name, brand, model, price, color, accountId);
      } catch (err) {
        error = err;
      }

      expect(error).to.be.instanceOf(BadRequest);
      expect(error.message).to.be.equal('name cannot be an empty field');
    });

    it('Should throw an error if account does not exist', async () => {
      const {
        name, brand, model, price, color, accountId,
      } = oneProduct;
      let error = new Error();

      sinon.stub(Account, 'findOne').resolves(null);

      try {
        await ProductService.create(name, brand, model, price, color, accountId);
      } catch (err) {
        error = err;
      }

      expect(error).to.be.instanceOf(BadRequest);
      expect(error.message).to.be.equal('Account not found!');
    });

    it('Succesfully creates an product', async () => {
      const {
        name, brand, model, price, color, accountId,
      } = oneProduct;

      sinon.stub(Account, 'findOne').resolves(oneAccount);
      sinon.stub(Product, 'create').resolves(oneProduct);

      const product = await ProductService.create(name, brand, model, price, color, accountId);

      expect(product).to.be.equal(product);
    });
  });

  describe('Testing update function', () => {
    it('Should throw an error if id is empty', async () => {
      let error = new Error();

      try {
        await ProductService.update();
      } catch (err) {
        error = err;
      }

      expect(error).to.be.instanceOf(BadRequest);
      expect(error.message).to.be.equal('id is a required field');
    });

    it('Should throw an error id some product field is empty', async () => {
      const {
        id, brand, model, price, color, accountId,
      } = oneProduct;
      let error = new Error();

      try {
        await ProductService.update(id, '', brand, model, price, color, accountId);
      } catch (err) {
        error = err;
      }

      expect(error).to.be.instanceOf(BadRequest);
      expect(error.message).to.be.equal('name cannot be an empty field');
    });

    it('Should throw an error if product does not exist', async () => {
      const {
        id, name, brand, model, price, color, accountId,
      } = oneProduct;
      let error = new Error();

      sinon.stub(Product, 'findOne').resolves(null);

      try {
        await ProductService.update(id, name, brand, model, price, color, accountId);
      } catch (err) {
        error = err;
      }

      expect(error).to.be.instanceOf(Conflict);
      expect(error.message).to.be.equal('Product does not exist!');
    });

    it('Succesfully creates a product', async () => {
      const {
        id, name, brand, model, price, color, accountId,
      } = oneProduct;

      sinon.stub(Product, 'findOne').resolves(oneProduct);
      const stub = sinon.stub(Product, 'update').resolves();

      await ProductService.update(id, name, brand, model, price, color, accountId);

      sinon.assert.callCount(stub, 1);
    });
  });

  describe('Testing deleteProduct function', () => {
    it('Should throw an error if id is empty', async () => {
      let error = new Error();

      try {
        await ProductService.deleteProduct();
      } catch (err) {
        error = err;
      }

      expect(error).to.be.instanceOf(BadRequest);
      expect(error.message).to.be.equal('id is a required field');
    });

    it('Should throw an error if product does not exist', async () => {
      let error = new Error();
      sinon.stub(Product, 'findOne').resolves(null);

      try {
        await ProductService.deleteProduct(1);
      } catch (err) {
        error = err;
      }

      expect(error).to.be.instanceOf(Conflict);
      expect(error.message).to.be.equal('Product does not exist!');
    });
  });
});
