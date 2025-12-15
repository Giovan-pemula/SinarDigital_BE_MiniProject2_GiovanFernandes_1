const { parse } = require('path');
const productRepository = require('../repository/product.repository');

const findoneProductById = async (id) => {
  return await productRepository.findoneProductById(id);
}

const findAllProducts = async () => {
  return await productRepository.findAllProducts();
}

const createProduct = async (data) => {
  return await productRepository.createProduct(data);
}

const updateProduct = async (id, data) => {
  return await productRepository.updateProduct(id, data);
}

const deleteProduct = async (id) => {
  return await productRepository.deleteProduct(id);
}

module.exports = {
  findoneProductById,
  findAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
};