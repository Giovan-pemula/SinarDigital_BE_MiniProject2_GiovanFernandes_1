const categoryService = require('../service/category.service');
const joi = require('joi');

const findonecategoryById = async (req, res) => {
  const { id } = req.params;
  const category = await categoryService.findonecategoryById(id);
  res.json(category);
}

const findAllcategory = async (req, res) => {
  const category = await categoryService.findAllcategory();
    res.json(category);
}

const createcategory = async (req, res) => {
  const schema = joi.object({
    name: joi.string().required(),
  });

  try{
    await schema.validateAsync(req.body);

    const category =  await categoryService.createcategory(req.body);

    res.json(category);
  }catch(err){
   res.json(err);

  }
}

const updatecategory = async (req, res) => {
  const scheme = joi.object({
    name: joi.string().required(),
  });
  try{
    await scheme.validateAsync(req.body);

    const category = await categoryService.updatecategory(req.params.id, req.body);
    res.json(category);
  }catch(err){
res.json(err);
  }
}



const deletecategory = async (req, res) => {
  const { id } = req.params;
  const category = await categoryService.deletecategory(id);
  res.json(category);
}

module.exports = {
    findonecategoryById,
    findAllcategory,
    createcategory,
    updatecategory,
    deletecategory,
};
