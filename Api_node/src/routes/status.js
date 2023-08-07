import express from 'express';
import { getStatusList, createStatus, updateStatus } from '../controller/status.js';

const router = express.Router();

router.post('/status', createStatus);
router.get('/status', getStatusList);
router.patch("/status/:id", updateStatus);

export default router;
