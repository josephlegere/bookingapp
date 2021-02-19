const express = require('express');
const router = express.Router();
const { getBookings, addBooking, verifyBooking } = require('../controllers/booking');

router
    .route('/:type/:id')
    .get(getBookings);

router
    .route('/add')
    .post(addBooking);

router
    .route('/confirm')
    .put(verifyBooking);

router
    .route('/reject')
    .put(verifyBooking);

module.exports = router;