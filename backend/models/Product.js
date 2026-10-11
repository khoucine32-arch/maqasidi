const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['تمويل', 'استثمار', 'ادخار', 'خدمات']
    },
    type: {
        type: String,
        required: true
    },
    bank: {
        type: String,
        required: true
    },
    amount: String,
    duration: String,
    rate: String,
    rating: {
        type: Number,
        default: 0
    },
    icon: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);