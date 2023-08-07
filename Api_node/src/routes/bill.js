import express from 'express';
import { createBill, getAllBills, getBillById, getBillsByUserId, removeBill, updateBillStatus } from '../controller/bill.js';

const router = express.Router();

router.post('/bills', createBill);
router.get('/bills/:userId', getBillsByUserId);
router.get('/bill/:billId', getBillById);
router.delete('/bills/:id', removeBill);
router.get('/bills', getAllBills);
router.patch('/bills/:id', updateBillStatus);
export default router;