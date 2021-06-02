const express =require('express');
const router = express.Router();
const mongoose = require('mongoose');
const UserSchema = require('../models/user');


const User = UserSchema;


router.get('/', (req, res) => {
    User.find({}).then((users)=>{
        res.status(200).send(users)
    }).catch((e)=>{
        res.status(500).send()
    })
});

router.get('/logout', (req, res) => {
    req.logout();
    return res.send({message: "Logout"});
});


router.get('/:userId', (req, res) => {
    const {userId} = req.params;
    User.findOne({email: userId}).then((user)=>{
        if(!user) {
            return res.send({message: "Valid ID"})
        }
        res.send({message: "Not Valid ID, this ID in use"})
    }).catch((e) => {
        res.status(500).send()
    })
});


module.exports = router;