import express from 'express';
import { loginAdmin } from '../controllers/login.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

//login admin
router.post('/', loginAdmin);

export default router;
