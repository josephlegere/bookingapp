const mongoose = require('mongoose');

const SellerSchema = new mongoose.Schema({
    name: {
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
    },
    slots: {
        type: Object,
        default: {}
    },
    representatives: [
        {
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
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now //no required needed
    }
});

module.exports = mongoose.model('Seller', SellerSchema);