const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ItemSchema = new Schema({
    room: {
        type: Schema.Types.ObjectId,
        ref: "Room"
    },
    quantity: {
        type: Number,
        min: 1
    },
    price: {
        type: Number,
            },
    cart: {
        type: Schema.Types.ObjectId,
        ref: "Cart"
    }
})


module.exports = mongoose.model('Item', ItemSchema);
