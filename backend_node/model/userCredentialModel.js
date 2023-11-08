const mongoose = require('mongoose');
const bcrypt =require ('bcrypt')

const userCredential = mongoose.Schema({
    name: {type :String,  required: true},
    email: {type: String, required: true,},
    password: {type: String}   
   
})

userCredential.pre('save', async function (next) {
    try {
      if (this.isModified('password')) {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
      }
      next();
    } catch (error) {
      next(error);
    }
  });

const UserCredential = mongoose.model('User', userCredential);
module.exports =UserCredential;