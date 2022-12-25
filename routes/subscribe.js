import express from 'express';
import {
  createSubscribe,
  deleteSubscribe,
  getAllSubscribe,
  getSubscribe,
  updateSubscribe,
} from '../controllers/subscribes.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

//create subscribe
router.post('/', createSubscribe);
//update subscribe
router.put('/:id', updateSubscribe);
//delete subscribe
router.delete('/:id', deleteSubscribe);
//get subscribe
router.get('/:id', getSubscribe);
//getall subscribe
router.get('/', getAllSubscribe);

export default router;
