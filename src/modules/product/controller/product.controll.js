const productService = require('../service/product.service');
const joi = require('joi');
const fs = require('fs');
const path = require('path');

const findoneProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await productService.findoneProductById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const findAllProducts = async (req, res) => {
  try {
    const products = await productService.findAllProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const createProduct = async (req, res) => {
  const schema = joi.object({
    name: joi.string().required(),
    price: joi.number().required(),
    video: joi.string().required(),
    description: joi.string().required(),
    categoryId: joi.number().required(),
  });

  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }

    await schema.validateAsync(req.body);

    const data = {
      ...req.body,
    price: Number(req.body.price),
    categoryId: Number(req.body.categoryId),
      image: req.file.filename, // ✅ SIMPAN NAMA FILE SAJA
    };

    const product = await productService.createProduct(data);
    res.status(201).json(product);
  } catch (err) {
    
    if (req.file) {
      fs.unlink(
        path.join('src/images', req.file.filename),
        () => {}
      );
    }
    res.status(400).json({ message: err.message });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;

  const schema = joi.object({
    name: joi.string(),
    price: joi.number(),
    video: joi.string(),
    description: joi.string(),
    categoryId: joi.number(),
  });

  try {
    await schema.validateAsync(req.body);

    const updateData = { 
        ...req.body,
        price: Number(req.body.price),
    categoryId: Number(req.body.categoryId),

     };
    let oldImage = null;

    if (req.file) {
      const existingProduct = await productService.findoneProductById(id);
      if (existingProduct && existingProduct.image) {
        oldImage = existingProduct.image;
      }

      updateData.image = req.file.filename;
    }

    const product = await productService.updateProduct(id, updateData);

    // hapus image lama
    if (oldImage) {
      fs.unlink(
        path.join('src/images', oldImage),
        () => {}
      );
    }

    res.json(product);
  } catch (err) {
    
    if (req.file) {
      fs.unlink(
        path.join('src/images', req.file.filename),
        () => {}
      );
    }
    res.status(400).json({ message: err.message });
  }
};


const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await productService.findoneProductById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await productService.deleteProduct(id);

    if (product.image) {
      fs.unlink(
        path.join('src/images', product.image),
        () => {}
      );
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  findoneProductById,
  findAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
