const express = require('express');
const router = express.Router();
const { getSellers, addSeller } = require('../controllers/seller');

router
    .route('/')
    .get(getSellers);

router
    .route('/add')
    .post(addSeller);
    
module.exports = router;