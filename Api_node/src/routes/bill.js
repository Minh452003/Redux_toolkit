import express from 'express';
import { createBill, getBillById, getBillsByUserId, removeBill } from '../controller/bill.js';

const router = express.Router();

router.post('/bills', createBill);
router.get('/bills/:userId', getBillsByUserId);
router.get('/bill/:billId', getBillById);
router.patch('/cancel/:billId', removeBill);
export default router;