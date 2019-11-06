const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    sku: {
        type: String
    },
    description: {
        type: String,
    },
    product_status: {
        type: String,
        required: true
    },
    regular_price: {
        type: Number,
        required: true
    },
    discount_price: {
        type: Number
    },
    quantity: {
        type: Number
    },
    taxable: {
        type: Boolean,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
}, {
    timestamps: true
});

ProductSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Product', ProductSchema);