'use strict';
const express = require('express');
const router = express.Router();
const JobController = require.main.require('./controllers/job')

router.get('/offers/:offset', JobController.getOffers);
router.get('/all/offers/', JobController.getAllOffers);
router.post('/save/offers/', JobController.saveOffers);



module.exports = router;
