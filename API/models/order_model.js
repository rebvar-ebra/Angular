const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');


const BookSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: "Cart"
    },
    price: {
        type: Number
    },
    bookDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isCreditCard(value)) {
                throw new Error('Credit card is invalid')
            }
        }
    }
});


BookSchema.pre('save', async function(next){
    const order=this;

    order.paymentMethod='****-****-****-' + order.paymentMethod.slice(order.paymentMethod.length-4, order.paymentMethod.length)
    next();
})

module.exports = mongoose.model('Book', BookSchema);
