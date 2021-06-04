const mongoose = require('mongoose');
const UserSchema = require('../models/user');
let config = require('../config/database'),
    jwt = require('jsonwebtoken');

const User = UserSchema;



// const cbValidUser = (email) => new Promise((resolve, reject) => {
//     try {
//         User.findOne({ email: email }, (err, data) => {
//           resolve(data)
//         });
//     } catch (error) {
//        return reject(error) 
//     }
//   });

// const registerStepOne = (req, res, next) => {
//     const {email,password, password2} = req.body;
//     if (!email || !idnum || !password || !password2) {
//         return res.status(400).json({message: "complete all fields"});
//     }
//     if (password !== password2) {
//         return res.status(400).json({message: "passwords do not match"});
//     }
//     return next()
// }

// const registerStepTwo = (req, res, next) => {
//     const {first, last} = req.body;
//     if (!first || !last ) {
//         return res.status(400).json({message: "complete all fields"});
//     }
//     return next()
// }

// const validateUser = async (req, res, next) => {
//     try {
//         const isUserExist = await cbValidUser(req.body.email, res);
//         // console.log(isUserExist)
//         if(!(isUserExist)){
//             return next()
//         }
//         return res.status(400).send({message:'Email already exists'})
//     } catch (error) {
//         return res.sendStatus(400)
//     }
// }


// module.exports = {
//     registerStepOne,
//     registerStepTwo,
//     validateUser
// }


// var exports = module.exports = {};

// Call User model

const signup = function(req, res) {
    if (!req.body.email || !req.body.password) {
        res.json({success: false, msg: 'Please pass email and password.'});
    } else {
        let newUser = new User({
            email: req.body.email,
            password: req.body.password
        });
        // save the user
        newUser.save(function(err) {
            if (err) {
                return res.json({success: false, msg: 'email already exists.'});
            }
            res.json({success: true, msg: 'Successful created new user.'});
        });
    }
};

const signin = function(req, res) {
    User.findOne({
        email: req.body.email
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
            res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
            // check if password matches
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    // if user is found and password is right create a token
                    let token = jwt.sign(user.toJSON(), config.secret);
                    // return the information including token as JSON
                    res.json({success: true, token: 'JWT ' + token});
                } else {
                    res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
                }
            });
        }
    });
};
module.exports = {
    signin,
    signup
    
}