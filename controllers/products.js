const Products = require('../models/products');
const removeFalsyValues = require('../utils/remove-falsy-values');
const queryParser = require('../utils/query-parser');

module.exports.getProducts = async (req, res, next) => {
  const { offset, limit, sort_field, sort, q } = req.query;

  const search = q ? queryParser(JSON.parse(q)) : null;

  const query = {
    limit: limit || 5,
    offset: offset || 1,
    order: sort_field ? [[sort_field, ['asc', 'desc'].includes(sort.toLowerCase()) ? sort : 'ASC']] : null,
    where: search,
  };

  try {
    const products = await Products.findAndCountAll(removeFalsyValues(query));

    res.status(200).json(products);

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }

};

module.exports.getProduct = async (req, res, next) => {
  const { productId } = req.params;

  try {
    const product = await Products.findByPk(productId);

    res.status(200).json(product);

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }

};

module.exports.postProduct = async (req, res, next) => {

  const { id, title, description } = req.body;

  try {
    const product = await Products.create({ id, title, description });

    res.status(201).json(product.toJSON());
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }

};

module.exports.putProduct = async (req, res, next) => {
  const { productId } = req.params;
  const { title, description } = req.body;

  try {
    let product = await Products.findByPk(productId);

    if (!product) {
      const error = new Error('Could not find a product');
      error.statusCode = 404;
      throw error;
    }

    product.set(removeFalsyValues({ title, description }));
    await product.save();
    await product.reload();

    res.status(200).json(product.toJSON());

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }

};

module.exports.deleteProduct = async (req, res, next) => {
  const { productId } = req.params;

  try {
    let product = await Products.findByPk(productId);

    if (!product) {
      const error = new Error('Could not find a product');
      error.statusCode = 404;
      throw error;
    }

    await product.destroy();

    res.status(200).json({ message: `Product id=${productId} was successfully deleted.` });

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }

};
