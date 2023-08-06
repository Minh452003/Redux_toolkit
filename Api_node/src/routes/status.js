import express from 'express';
import { getStatusList, createStatus } from '../controller/status.js';

const router = express.Router();

router.post('/status', createStatus);
router.get('/status', getStatusList);

export default router;
