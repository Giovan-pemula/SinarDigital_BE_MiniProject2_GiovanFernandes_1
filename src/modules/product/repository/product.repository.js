const db = require("../../../helpers/db");

const findoneProductById = async (id) => {
  return await db.products.findUnique({
    where: { id: Number(id) },
  });
}

const findAllProducts = async () => {
  return await db.products.findMany();
}

const createProduct = async (data) => {
  return await db.products.create({
    data,
  });
}

const updateProduct = async (id, data) => {
  return await db.products.update({
    where: { id: Number(id) },
    data,
  });
}

const deleteProduct = async (id) => {
  return await db.products.delete({
    where: { id: Number(id) }
  });
}

module.exports = {
  findoneProductById,
  findAllProducts,
  createProduct,
    updateProduct,
    deleteProduct,

};





