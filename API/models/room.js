var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const roomSchema = new Schema({
  name: {
    type: String,
    lowercase: true,
      },
  price: {
      type: Number
  },
  imagePath: {
      type: String,
      required: true
  },
  category: {
      type: Schema.Types.ObjectId,
      ref: "Hotel"
  }
  
});
    
 module.exports = mongoose.model('Room', roomSchema)
