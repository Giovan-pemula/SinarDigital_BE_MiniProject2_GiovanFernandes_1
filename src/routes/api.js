const product = require('../modules/product/controller/product.controll');
const category = require('../modules/category/controller/category.controll');
const upload = require('../../config/multer');


module.exports = async (app) => {
  
  app.get('/api/v1/products', product.findAllProducts);
  app.get('/api/v1/products/:id', product.findoneProductById);

  app.post(
    '/api/v1/products',
    upload.single('image'),     
    product.createProduct
  );

  app.put(
    '/api/v1/products/:id',
    upload.single('image'),     
    product.updateProduct
  );

  app.delete('/api/v1/products/:id', product.deleteProduct);

  app.get('/api/v1/category', category.findAllcategory);
  app.get('/api/v1/category/:id', category.findonecategoryById);
  app.post('/api/v1/category', category.createcategory);
  app.put('/api/v1/category/:id', category.updatecategory);
  app.delete('/api/v1/category/:id', category.deletecategory);
};
