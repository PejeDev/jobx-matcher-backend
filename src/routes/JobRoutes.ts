import express from 'express';
import JobController from '../controllers/JobController';

const router = express.Router();

router.get('/offers/:offset', JobController.getOffers);
router.get('/all/offers/', JobController.getAllOffers);
router.post('/save/offers/', JobController.saveOffers);

export default router;
