const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: String,
    name: String,
    email: String
});

const orderSchema = new mongoose.Schema({
    _id: Number,
    user_id: { type: mongoose.Schema.Types.String, ref: 'User' },
    product: String,
    amount: Number
});

module.exports = {
    userSchema,
    orderSchema
};