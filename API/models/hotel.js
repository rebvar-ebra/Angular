var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HotelSchema = new Schema({
 name:{
   type:String
 },

 rooms:
  [{type:Schema.Types.ObjectId,ref:'Rooms'}]
 

});

module.exports = mongoose.model('Hotel', HotelSchema);
