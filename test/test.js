const assert = require('assert');
const sinon = require('sinon');
const productController = require('../src/controllers/productController');
const Product = require('../src/models/productModel');

describe('Product Controller', () => {
    let productStub;

    beforeEach(() => {
        productStub = sinon.stub(Product);
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('getAllProducts', () => {
        it('should return all products', async () => {
            const expectedProducts = [
                { id: 1, name: 'Product 1', price: 10.99 },
                { id: 2, name: 'Product 2', price: 19.99 },
            ];
            productStub.find.returns(expectedProducts);

            const result = await productController.getAllProducts();

            assert.deepStrictEqual(result, expectedProducts);
            sinon.assert.calledOnce(productStub.find);
        });
    });

    describe('createProduct', () => {
        it('should create a new product', async () => {
            const newProduct = { name: 'New Product', price: 19.99, categoryId: 1, brandId: 1 };
            const createdProduct = { id: 1, ...newProduct };
            const createStub = sinon.stub().returns(createdProduct);
            productStub.create = createStub;

            const result = await productController.createProduct(newProduct);

            assert.deepStrictEqual(result, createdProduct);
            sinon.assert.calledOnceWithExactly(createStub, newProduct);
        });
    });
});