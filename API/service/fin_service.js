const mongoose = require('mongoose');
const CartSchema = require('../models/cart_model');
const ItemSchema = require('../models/cart_model_item');

const Cart = mongoose.model('Cart', CartSchema);
const Item = mongoose.model('Item', ItemSchema);



const fetchCart = (req, res) => new Promise((resolve, reject) => {
    try {
        Cart.findOne({user: req.user._id, status: "active"})
        .populate('User').exec((err,data)=>{
            if(err) {
                return reject(err)
            }
            return resolve(data);
        });
    } catch (error) {
       return reject(error) 
    }
  });


const fetchLastCart = (req, res) => new Promise((resolve, reject) => {
    try {
        Cart.findOne({user: req.user._id, status: "complete"})
        .sort({createdDate: -1})
        .populate('User').exec((err,data)=>{
            if(err) {
                return reject(err)
            }
            return resolve(data);
        });
    } catch (error) {
       return reject(error) 
    }
  });

const createCart = (req, res) => new Promise((resolve, reject) => {
    try {
        const newCart = new Cart({user: req.user._id});
        newCart.save((err,data)=> {
            if(err){
                return reject(err);
            }   
            return resolve(data);
        })
    } catch (error) {
        return reject(error)
    }
})

const addRoomToCart = (req, res) => new Promise((resolve, reject) => {
    try {
        // add room to cart
        let {room, quantity, price} = req.body;
        price = price*quantity;
        const newItem = new Item({room, quantity, price, cart: personalCart});
        newItem.save((err,data)=> {
            if(err){
                return reject(err);
            }   
            return resolve(data);
        })
    } catch (error) {
        return reject(error)
    }
}); 

const incQtyOfRoomsInCart = (req, res, cart) => new Promise((resolve, reject) => {
    try {
        const { room, quantity, price } = req.body;

        Item.findOneAndUpdate({_id: room, cart: cart}, { $inc: { quantity: quantity, price: price*quantity } }, {new: true, runValidators: true }).populate('Room').exec((err,data)=> {
            if(err){
                return reject(err);
            }   
            
            return resolve(data);
        })
    } catch (error) {
        return reject(error)
    }
});



const checkoutCarts = (cart) => new Promise((resolve, reject) => {
    try {
        
        Cart.findOneAndUpdate({_id: cart}, { status: 'complete' }, {new: true, runValidators: true  }).exec((err,data)=> {
            if(err){
                return reject(err);
            }   
            return resolve(data);
        })
    } catch (error) {
        return reject(error)
    }
}); 


const deleteRoomFromCart = (req, res, cart) => new Promise((resolve, reject) => {
    try {
        
        Item.findByIdAndDelete(req.params.id).exec((err,data)=> {
            if(err){
                return reject(err);
            }   
            return resolve(data);
        })
    } catch (error) {
        return reject(error)
    }
}); 



const fetchCartItems = (cartId) => new Promise((resolve, reject) => {
    try {
        
        Item.find({cart: cartId})
        .populate('Room cart').exec((err,data)=>{
            if(err) {
                return reject(err)
            }
            // console.log(err, data);
            return resolve(data);
        });
    } catch (error) {
       return reject(error) 
    }
  });

module.exports = {
    fetchCart,
    createCart,
    addRoomToCart,
    fetchCartItems,
    deleteRoomFromCart,
    checkoutCarts,
    incQtyOfRoomsInCart,
    fetchLastCart
    
}