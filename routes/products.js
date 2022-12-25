import express from 'express';
import {
  createProduct,
  deleteProduct,
  getCategoryProduct,
  getProduct,
  getAllProduct,
  updateProduct,
  getSubCategoryProduct,
} from '../controllers/product.js';
import { verifyToken } from '../utils/verifyToken.js';
import data from '../data.js';
import Product from '../models/Product.js';
import NewLaunch from '../models/NewLaunch.js';
import BestSeller from '../models/BestSeller.js';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../frontend/public/images/categories/addonfiles');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname.toLowerCase().split(' ').join('-')) + Date.now();
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      0;
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
    console.log(file.fieldname);
  },
});

//create product
router.post('/', upload.single('file'), createProduct);
//update product
router.put('/:id', updateProduct);
//delete product
router.delete('/:id', deleteProduct);
//get product
router.get('/:id', getProduct);
//get all product
router.get('/', getAllProduct);
//getall category product
router.get('/category/:slug', getCategoryProduct);
//getall subCategory product
router.get('/subCategory/:slug', getSubCategoryProduct);

//seed
router.get('/seed', async (req, res) => {
  await Product.remove({});
  await NewLaunch.remove({});
  await BestSeller.remove({});
  const createdProducts = await Product.insertMany(data.products);
  const createdNewLaunch = await NewLaunch.insertMany(data.newlaunch);
  const createdBestSeller = await BestSeller.insertMany(data.bestseller);

  res.send({ createdProducts, createdNewLaunch, createdBestSeller });
});

export default router;
