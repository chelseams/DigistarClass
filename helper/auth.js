const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const query = require('../database/mongodb/query');

async function login(payload) {
    try {
        const user = await query.findUserByEmail(payload.email);
        if (!user) {
            throw new Error("User not found");
        }

        const isMatch = bcrypt.compareSync(payload.password, user.password);
        if (!isMatch) {
            throw new Error("Password is incorrect");
        }
        
        const token = jwt.sign({
            id: user._id,
            email: user.email,
            role: user.role,
            name: user.name
        }, 'default_secret_key', {
            expiresIn: '30m'
        });

        return token;
    } catch (error) {
        return error;
    }
}

module.exports = {
    login
}