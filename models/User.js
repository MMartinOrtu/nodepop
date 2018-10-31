'use strict';

const mongoose = require('mongoose');
const bcrypt = require ('bcrypt');


const userSchema = mongoose.Schema({
    email: { type: String, unique: true },
    password: String
})

userSchema.statics.hashPassword = async function (plainPassword){
    return bcrypt.hash (plainPassword, 10)
}

const User = mongoose.model('User', userSchema);

module.exports = User;