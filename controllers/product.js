import Product from '../models/Product.js';
import { createError } from '../utils/error.js';

export const createProduct = async (req, res) => {
  let info = {
    image: `/images/categories/addonfiles/${req.file.originalname}`,
    category: req.body.category,
    subcategory: req.body.subCategory,
  };
  console.log(info);
  try {
    const savedProduct = await Product.create(info);
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json('Product has been deleted');
  } catch (err) {
    next(err);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    next(createError(200, err));
  }
};

export const getAllProduct = async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

export const getCategoryProduct = async (req, res, next) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  try {
    const Products = await Product.find({ category: `${req.params.slug}` })
      .limit(limit)
      .skip(startIndex)
      .exec();
    res.status(200).json(Products);
  } catch (err) {
    next(err);
  }
};

export const getSubCategoryProduct = async (req, res, next) => {
  try {
    const Products = await Product.find({ subcategory: `${req.params.slug}` });
    res.status(200).json(Products);
  } catch (err) {
    next(err);
  }
};
