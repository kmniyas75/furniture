import express from 'express';
import {
  createOrder,
  deleteOrder,
  getAllOrder,
  getOrder,
  updateOrder,
} from '../controllers/orders.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

//create order
router.post('/', createOrder);
//update order
router.put('/:id', updateOrder);
//delete order
router.delete('/:id', deleteOrder);
//get order
router.get('/:id', getOrder);
//getall order
router.get('/', getAllOrder);

export default router;
