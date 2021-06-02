const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UserSchema = require('../models/user');

const User = UserSchema;


const registerStepOne = (req, res) =>  new Promise ((resolve,reject)=> {
  const {email,password} = req.body;
  const newUser = new User({email,password});
  bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(newUser.password, salt, function(err, hash) {
          if (err) throw err;
          newUser.password = hash;
          // console.log(password);
          newUser.save((err, data)=>{
            if(err) {
              return reject(err)
            }
            global.userOnRegestration=data.email;
            return resolve(data.email);
          })
          
      });
  }); 
})

const registerStepTwo = (req, res) => new Promise((resolve, reject) => {
    const {first, last} = req.body;
    User.where({ email: userOnRegestration }).updateOne({first, last}, function(err, user){
        if(err) {
          return reject(err)
        }
        return resolve(user);
    });
  })

module.exports = {
    registerStepOne,
    registerStepTwo
}