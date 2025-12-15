const { parse } = require('path');
const categoryRepository = require('../repository/category.repository');

const findonecategoryById = async (id) => {
  return await categoryRepository.findonecategoryById(id);
}

const findAllcategory = async () => {
  return await categoryRepository.findAllcategory();
}

const createcategory = async (data) => {
  return await categoryRepository.createcategory(data);
}

const updatecategory = async (id, data) => {
  return await categoryRepository.updatecategory(id, data);
}

const deletecategory = async (id) => {
  return await categoryRepository.deletecategory(id);
}

module.exports = {
  findonecategoryById,
  findAllcategory,
    createcategory,
    updatecategory,
    deletecategory,
};