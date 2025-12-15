
const db = require("../../../helpers/db");

const findonecategoryById = async (id) => {
  return await db.category.findUnique({
    where: { id: Number(id) },
  });
}

const findAllcategory = async () => {
  return await db.category.findMany();
}

const createcategory = async (data) => {
  return await db.category.create({
    data,
  });
}

const updatecategory = async (id, data) => {
  return await db.category.update({
    where: { id: Number(id) },
    data,
  });
}

const deletecategory = async (id) => {
  return await db.category.delete({
    where: { id: Number(id) }
  });
}

module.exports = {
  findonecategoryById,
  findAllcategory,
  createcategory,
    updatecategory,
    deletecategory,

};





