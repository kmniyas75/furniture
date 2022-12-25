import BestSeller from '../models/BestSeller.js';

export const createProduct = async (req, res) => {
  let info = {
    name: req.body.text,
    image: `/images/bestseller/${req.file.originalname}`,
  };
  try {
    const savedProduct = await BestSeller.create(info);
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await BestSeller.findByIdAndUpdate(
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
    await BestSeller.findByIdAndDelete(req.params.id);
    res.status(200).json('Product has been deleted');
  } catch (err) {
    next(err);
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await BestSeller.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

export const getAllProduct = async (req, res, next) => {
  try {
    const Products = await BestSeller.find();
    res.status(200).json(Products);
  } catch (err) {
    next(err);
  }
};
