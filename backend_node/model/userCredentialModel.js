const mongoose = require('mongoose');

const userCredential = mongoose.Schema({
    name: String,
    email: String,
    password: String,
   
   
})

const UserCredential = mongoose.model('User', userCredential);
module.exports =UserCredential;