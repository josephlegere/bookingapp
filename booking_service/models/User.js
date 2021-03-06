const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
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
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    contact: {
        type: String,
        required: true,
        max: 20,
        min: 5
    },
    type: {
        type: String
    },
    role: {
        type: String,
        required: true
    },
    seller_group: { //If user is seller, define the seller / company
        id: {
            type: mongoose.Types.ObjectId
        },
        name: {
            type: String,
            max: 255,
            min: 6
        }
    },
    createdAt: {
        type: Date,
        default: Date.now //no required needed
    }
});

module.exports = mongoose.model('User', UserSchema);