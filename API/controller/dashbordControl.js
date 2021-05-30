const express =require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const { ensureAuthenticated} = require('../config/auth');
const CartSchema = require('../models/cart_model');
const Cart = mongoose.model('Cart', CartSchema);

const dashboardService = require('../service/fin_service');

const ERROR_CODE = 400;
const handleFailureResponse = (res, err) => res.status(ERROR_CODE).send(err);

router.get('/',ensureAuthenticated, async(req, res) => {
    try{
        const cart = await dashboardService.fetchCart(req,res);
        if(cart) {
            const allRoomInCart = await dashboardService.fetchCartItems(cart._id);
            return res.status(200).send({allRoomInCart});
        } else {
            return res.status(404).send({message: "You don't have any booking room in your cart. Let's get booking room!"});
        }
        
    }
    catch(e){
        return handleFailureResponse(res, e);
    }
});

router.get('/cart',ensureAuthenticated, async(req, res) => {
    try{
        const cart = await dashboardService.fetchCart(req,res);
        
        return res.status(200).send({user:req.user, cart:cart});
    }
    catch(e){
        return handleFailureResponse(res, e);
    }
});

router.patch('/checkout',ensureAuthenticated, async(req, res) => {
    try{
        const cart = await dashboardService.fetchCart(req,res);
        if(cart) {
            const completedCart = await dashboardService.checkoutCart(cart._id);
            return res.status(200).send({completedCart});
        } else {
            return res.status(404).send({message: "You don't have any booking room in your cart. Let's get booking room!"});
        }
        
    }
    catch(e){
        return handleFailureResponse(res, e);
    }
});


router.post('/newcart', ensureAuthenticated, async (req, res)=>{
    try {
        await dashboardService.createCart(req, res)
        res.sendStatus(201)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.put('/addbook', ensureAuthenticated, async (req, res)=>{
    try {
        global.personalCart = await dashboardService.fetchCart(req,res);
        const newBookInCart = await dashboardService.addRoomToCart(req, res);
        res.status(201).send(newBookInCart)
    } catch (e) {
        res.status(400).send(e)
    }
});



router.delete('/removebook/:id', ensureAuthenticated, async (req, res)=>{
    try {
        const cartWithBook = await dashboardService.fetchCart(req,res);
        const deletedBookFromCart = await dashboardService.deleteRoomFromCart(req, res, cartWithBook);
        if (!deletedBookFromCart) {
            return res.sendStatus(404)
        }
        res.send(deletedBookFromCart)
    } catch (e) {
        res.status(400).send(e)
    }
});





module.exports = router;