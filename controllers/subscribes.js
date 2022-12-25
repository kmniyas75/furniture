import Subscribe from '../models/Subscribe.js';

export const createSubscribe = async (req, res) => {
  const newProduct = Subscribe(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateSubscribe = async (req, res) => {
  try {
    const updatedProduct = await Subscribe.findByIdAndUpdate(
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

export const deleteSubscribe = async (req, res) => {
  try {
    await Subscribe.findByIdAndDelete(req.params.id);
    res.status(200).json('Product has been deleted');
  } catch (err) {
    next(err);
  }
};

export const getSubscribe = async (req, res) => {
  try {
    const Product = await Subscribe.findById(req.params.id);
    res.status(200).json(Product);
  } catch (err) {
    next(err);
  }
};

export const getAllSubscribe = async (req, res, next) => {
  try {
    const Products = await Subscribe.find();
    res.status(200).json(Products);
  } catch (err) {
    next(err);
  }
};
