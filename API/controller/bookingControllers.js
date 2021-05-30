const express =require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { ensureAuthenticated} = require('../config/auth');


const BookSchema = require('../models/order_model');
const Book = mongoose.model('Book',BookSchema)


const BookingService = require('../service/booking_service');
const  finService = require('../service/fin_service');

const ERROR_CODE = 400;
const handleFailureResponse = (res, err) => res.status(ERROR_CODE).send(err);

router.get('/',ensureAuthenticated, async(req, res) => {
    try{
        const cart = await finService.fetchCart(req,res);
        const book = await BookingService.fetchBook(req,res, cart);
        return res.status(200).send({book});  
    }
    catch(e){
        return handleFailureResponse(res, e);
    }
});


router.get('/lastbook',ensureAuthenticated, async(req, res) => {
    try{
        const cart = await finService.fetchLastCart(req,res);
        const book = await BookingService.fetchBook(req,res, cart);
        return res.status(200).send({book});  
    }
    catch(e){
        return handleFailureResponse(res, e);
    }
});


router.get('/numofbook', async(req, res) => {
    try{
        const numOfBook = await BookingService.countBook();
        return res.status(200).send({numOfBook})
    }
    catch(e){
        return handleFailureResponse(res, e);
    }
});

router.put('/', ensureAuthenticated, async (req, res)=>{
    try {
        const cart = await finService.fetchCart(req,res);
        const newBook = new Book({...req.body, cart: cart._id, user: req.user._id});
        await newBook.save()
        res.status(201).send(newBook)
    } catch (e) {
        res.status(400).send(e)
    }
});


module.exports = router;