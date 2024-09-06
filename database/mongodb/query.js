const mongoose = require('mongoose');
const schema = require('./schema');

const Users = mongoose.model('User', schema.userSchema);
const Orders = mongoose.model('Order', schema.orderSchema);

async function getUsers(){
    return Users.find();
}

async function createUser(user){
    return Users.create(user);
}

async function updateUser(id, user){
    return Users.findByIdAndUpdate(id, user, {new:true});
}

async function deleteUser(id){
    return Users.findByIdAndDelete(id);
}

async function findByName(name){
    return Users.find({name:name});
}

async function getOrders() {
    return await Orders.aggregate([{
        $lookup: {
            from: 'users',
            localField: 'user_id',
            foreignField: '_id',
            as: 'user_info'
        }
    }]);
}

async function createOrder(order) {
    return await Orders.create(order);
}

async function updateOrder(id, order) {
    return await Orders.findByIdAndUpdate(id, order, {
        new: true
    });
}

async function deleteOrder(id) {
    return await Orders.findByIdAndDelete(id);
}

async function findOrderByName(product) {
    return await Orders.find({
        product: product
    });
}

async function findOrderByUserId(user_id) {
    return await Orders.find({
        user_id: user_id
    });
}
async function findMyOrder(id) {
    return await Orders.find({
        user_id: id
    });
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    findByName,
    getOrders,
    createOrder,
    updateOrder,
    deleteOrder,
    findOrderByName,
    findOrderByUserId,
    findMyOrder

};