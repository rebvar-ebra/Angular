const express = require('express');
const fs = require('fs-extra');
const path = require('path');
const router = express.Router();
const mongoose = require('mongoose');
const { ensureAuthenticated} = require('../config/auth');
const RoomSchema = require('../models/room');
const HotelSchema = require('../models/hotel');

const adminService = require('../service/admin_service');

const Room = RoomSchema;
const Hotel = HotelSchema;

const ERROR_CODE = 400;
const handleFailureResponse = (res, err) => res.status(ERROR_CODE).send(err);


router.get('/',ensureAuthenticated, async(req, res) => {
    try{
        return res.status(200).send(req.user); 
    }
    catch(e){
        return handleFailureResponse(res, e);
    }
});

router.patch('/editroom',ensureAuthenticated, async(req, res) => {
    try {
        if (!req.files) {
            console.log('No files were uploaded.')
        }else{
            const sampleFile = req.files.groceryImg;
            fs.writeFile(path.join(__dirname, `../public/uploads/`, sampleFile.name), sampleFile.data, (err) => console.log(err));
            await adminService.updateImage(req, res)
        }
            
        
        
        const editedRoom = await adminService.editedRoom(req, res);
        res.status(200).send(editedRoom)
        
    } catch (error) {
        res.sendStatus(400);
    }
});


router.post('/addroom',ensureAuthenticated, async (req, res)=>{
    
    try {
        if (!req.files)
            return res.status(400).send('No files were uploaded.');
        
        const sampleFile = req.files.groceryImg;
        fs.writeFile(path.join(__dirname, `../public/uploads/`, sampleFile.name), sampleFile.data, (err) => console.log(err));
        
        const newRoom = await adminService.createNewRoom(req, res);
        res.status(201).send(newRoom)
    } catch (e) {
        res.status(400).send(e)
    }
});



router.patch('/RoomInHotel', ensureAuthenticated, async(req, res) => {

    try{
        const {idHotel, idRoom} = req.body;
        const hotel = await Hotel.findOneAndUpdate({_id: idHotel},
            {$push: {Rooms: idRoom}},
            {new: true, runValidators: true });
        await hotel.populate('rooms').execPopulate();
        return res.status(200).json({hotel});
    }
    catch(e){
        return handleFailureResponse(res, e);
    }
});


module.exports = router;