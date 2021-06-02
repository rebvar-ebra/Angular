const mongoose = require('mongoose');
const RoomSchema = require('../models/room');
const HotelSchema = require('../models/hotel');

const Room = RoomSchema;
const Hotel = HotelSchema;


const fetchHotel = (req,res) => new Promise((resolve, reject) => {
    try {
        Hotel.find({})
        .populate('Room')
        .exec((err,data)=>{
            if(err) {
                return reject(err)
            }
            return resolve(data);
        });
    } catch (error) {
       return reject(error) 
    }
  });
  
const fetchRoom = (req, res) => new Promise((resolve, reject) => {
    try {
        Room.find({})
        .populate('category').exec((err,data)=>{
            if(err) {
                return reject(err)
            }
            return resolve(data);
        });
    } catch (error) {
       return reject(error) 
    }
  });

const countRoom = () => new Promise((resolve, reject) => {
    try {
        Room.countDocuments({}, (err, count) => {
                if(err) {
                    return reject(err)
                }
                return resolve(count);
          });
    } catch (error) {
       return reject(error) 
    }
  });

module.exports = {
    fetchHotel,
    fetchRoom,
    countRoom
}