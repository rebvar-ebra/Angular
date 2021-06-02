const express =require('express');
const router = express.Router();
const mongoose = require('mongoose');
const RoomSchema = require('../models/room');
const HotelSchema = require('../models/hotel');
const FinalService =require('../service/search_service');

const Room = RoomSchema;
const Hotel = HotelSchema;

const SUCCESS_CODE = 200;
const ERROR_CODE = 400;

const handleSuccessResponse = (res, data) => res.status(SUCCESS_CODE).send(data);
const handleFailureResponse = (res, err) => res.status(ERROR_CODE).send(err);

router.get('/hotels', async(req, res) => {
    try{
        const hotels = await FinalService.fetchHotel(req,res);
        return res.status(200).json({hotels})
    }
    catch(e){
        return handleFailureResponse(res, e);
    }
});
router.get('/hotels/:id', async(req, res) => {

    try{
        const { id } = req.params;
        const hotel = await Hotel.findById(id);
        await hotel.populate('rooms').execPopulate();
        return res.status(200).json({category});
    }
    catch(e){
        return handleFailureResponse(res, e);
    }
});

router.get('/rooms', async(req, res) => {
    try{
        const rooms = await FinalService.fetchRoom(req,res);
        return res.status(200).json({rooms})
    }
    catch(e){
        return handleFailureResponse(res, e);
    }
});

router.get('/numofrooms', async(req, res) => {
    try{
        const NumOfRoom = await FinalService.countRoom();
        return res.status(200).send({NumOfRoom})
    }
    catch(e){
        return handleFailureResponse(res, e);
    }
});

router.get('/rooms/:productName', async(req, res) => {
    try{
        const { name } = req.params;
        const room = await Room.findOne({name: name.toLowerCase()});
        await room.populate('category').execPopulate();
        return res.status(200).json({room})
    }
    catch(e){
        return handleFailureResponse(res, e);
    }
});


module.exports = router;