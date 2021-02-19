const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    buyer: {
        id: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        name: {
            type: String,
            required: true,
            max: 255,
            min: 6
        },
        email: {
            type: String,
            required: true,
            max: 255,
            min: 6
        },
        contact: {
            type: String,
            required: true,
            max: 20,
            min: 5
        }
    },
    seller: {
        id: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        name: {
            type: String,
            required: true,
            max: 255,
            min: 6
        }
    },
    slot: { // timestamp
        type: Date,
        required: true
    },
    confirmed: { //is confirmed by the buyer
        type: Boolean,
        default: false,
        required: true
    },
    active: { //is still active or inactive
        type: Boolean,
        default: true,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now //no required needed
    }
});

module.exports = mongoose.model('Booking', BookingSchema);