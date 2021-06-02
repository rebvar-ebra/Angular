const mongoose = require('mongoose');
const _ = require('lodash');

const RoomSchema = require('../models/room');
const HotelSchema = require('../models/hotel');

const Room = RoomSchema;
const Hotel = HotelSchema;

createNewRoom = (req, res) => new Promise((resolve, reject) => {
    try {

        const {name, price, category} = JSON.parse(req.body.groceryText);
        const newRoom = new Room({name: name, price: price, category: category, imagePath:`/uploads/${req.files.groceryImg.name}`})
        
        // add Room to cart
        
        newRoom.save((err,data)=> {
            if(err){
                return reject(err);
            }   
            return resolve(data);
        })
    } catch (error) {
        return reject(error)
    }
}); 

editRoom = (req, res) => new Promise((resolve, reject) => {
    try {

        const {idRoom, name, price, category} = JSON.parse(req.body.groceryText);
        if(!name&&!price) {
            Room.findByIdAndUpdate(idRoom, {category})
            .exec((err,data)=> {
                if(err){
                    return reject(err);
                }   
                return resolve(data);
            })
        }else if(!name) {
            Room.findByIdAndUpdate(idRoom, {price, category})
            .exec((err,data)=> {
                if(err){
                    return reject(err);
                }   
                return resolve(data);
            })
        }else if(!price) {
            Room.findByIdAndUpdate(idRoom, {name, category})
            .exec((err,data)=> {
                if(err){
                    return reject(err);
                }   
                return resolve(data);
            })
        }else {
            Room.findByIdAndUpdate(idRoom, {name, price, category})
            .exec((err,data)=> {
                if(err){
                    return reject(err);
                }   
                return resolve(data);
            })
        }
 
    } catch (error) {
        return reject(error)
    }
}); 


const updateImage = (req, res) => new Promise((resolve, reject) => {
    const {idRoom} = JSON.parse(req.body.groceryText);
    Room.findByIdAndUpdate(idRoom, { imagePath: `/uploads/${req.files.groceryImg.name}` }).exec((err,data)=> {
        if(err){
            return reject(err);
        }   
        return resolve(data);
    })
  });

module.exports = {
    createNewRoom,
    updateImage,
    editRoom
}