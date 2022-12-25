import express from 'express';
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProduct,
  updateProduct,
} from '../controllers/bestSeller.js';
import { verifyToken } from '../utils/verifyToken.js';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../frontend/public/images/bestseller/');
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
//getall product
router.get('/', getAllProduct);

export default router;
