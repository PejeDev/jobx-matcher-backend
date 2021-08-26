import express from 'express';
import { UserController } from '../controllers/index';

const router = express.Router();

router.get('/me', UserController.me);

export default router;
