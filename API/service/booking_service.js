const mongoose = require('mongoose');
const BookSchema = require('../models/order_model');
const _ = require('lodash');
const Book = BookSchema;


const countBook = () => new Promise((resolve, reject) => {
    try {
        Book.countDocuments({}, (err, count) => {
                if(err) {
                    return reject(err)
                }
                return resolve(count);
          });
    } catch (error) {
       return reject(error) 
    }
  });

  const fetchBook = (req, res, cart) => new Promise((resolve, reject) => {
    try {
        // console.log(req.user._id)
        Book.findOne({user: req.user._id, cart: cart})
        .populate('User Cart').exec((err,data)=>{
            if(err) {
                return reject(err)
            }
            return resolve(data);
        });
    } catch (error) {
       return reject(error) 
    }
  });  

  

module.exports = {
    countBook,
    fetchBook
}