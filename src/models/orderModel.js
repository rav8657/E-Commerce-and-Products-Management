const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const orderSchema = new mongoose.Schema({

    userId: { type: ObjectId, required: true, ref: 'User' },

    items: [{
        productId: { type: ObjectId, required: true, ref: 'Product' },
        quantity: { type: Number, required: true, min: 1 }
    }],

    totalPrice: { type: Number, required: true },

    totalItems: { type: Number, required: true },

    totalQuantity: { type: Number, required: true },

    cancellable: { type: Boolean, required: true },

    status: { type: String, default: 'pending', enum: ['pending', 'completed', 'cancelled'] },

    deletedAt: { type: Date },

    isDeleted: { type: Boolean, default: false },

}, { timestamps: true })

module.exports = mongoose.model('Order', orderSchema)