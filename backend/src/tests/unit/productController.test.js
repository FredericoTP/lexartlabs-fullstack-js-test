const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { ProductController } = require('../../controllers');
const { ProductService } = require('../../services');
const {allProducts, infoToken, accountProducts, createOne, createTwo, createThree, createdProduct,createdProducts} = require('./mocks/mockProducts');

chai.use(sinonChai);

const { expect } = chai;

describe('ProductController', () => {
  const req = {};
  const res = {};

  beforeEach(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  describe('Testing findAll function', () => {
    it('Succesfully returns all products', async () => {
      sinon.stub(ProductService, 'findAll').resolves(allProducts)

      await ProductController.findAll(req, res)

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProducts);
    })
  })

  describe("Testing findByAccountId function", () => {
    it("Succesfully returns all products of an account", async () => {
      req.body = {infoToken}

      sinon.stub(ProductService, 'findByAccountId').resolves(accountProducts)

      await ProductController.findByAccountId(req, res)

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(accountProducts);
    })
  })

  describe('Testing create function', () => {
    it('Succesfully creats a product with the first structure', async () => {
      req.body = createOne
      req.body.infoToken = infoToken

      sinon.stub(ProductService, 'create').resolves(createdProduct)

      await ProductController.create(req, res)

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(createdProduct);
    })

    it('Succesfully creats a product with the second structure', async () => {
      req.body = createTwo
      req.body.infoToken = infoToken

      sinon.stub(ProductService, 'create').resolves(createdProduct)

      await ProductController.create(req, res)

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(createdProduct);
    })

    it('Succesfully creats a product with the third structure', async () => {
      req.body = createThree
      req.body.infoToken = infoToken

      const stub = sinon.stub(ProductService, 'create')

      stub.onCall(0).resolves(createdProducts[0]);
      stub.onCall(1).resolves(createdProducts[1]);
      stub.onCall(2).resolves(createdProducts[2]);
      stub.onCall(3).resolves(createdProducts[3]);

      await ProductController.create(req, res)

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(createdProducts);
    })
  })

  describe('Testing update function', () => {
    it('Succesfully updates an product', async () => {
      req.body = createdProduct
      req.body.infoToken = infoToken

      sinon.stub(ProductService, 'update').resolves()

      await ProductController.update(req, res)

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({ message: 'Product has been updated!' });
    })
  })

  describe('Testing deleteProduct function', () => {
    it('Succesfully deletes an product', async () => {
      req.params = {id: createdProduct.id}

      sinon.stub(ProductService, 'deleteProduct').resolves()

      await ProductController.deleteProduct(req, res)

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({ message: 'Product has been deleted!' });
    })
  })
})