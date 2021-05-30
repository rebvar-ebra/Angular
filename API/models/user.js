var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var UserSchema = new Schema({
  first:{
    type:String,
  },
  last:{
      type:String
    },
    
    email: {
        type: String,
        unique: true,
        required: true,
        },
  password: {
        type: String,
        required: true
    },

    role:{
        type:Boolean,
        default:0
    }
});


// UserSchema.methods.toJSON = function(){
//     const user = this
//     const userObject = user.toObject()

//     delete userObject.password

//     return userObject

// }


UserSchema.pre("save", function(next) {
    var user = this;

    if (!user.isModified("password")) {
        return next();
    }

    // use bcrypt to generate a salt
    bcrypt.genSalt(SALT_ROUNDS, function(err, salt) {
        if (err) {
            return next(err);
        }

        // using the generated salt, use bcrypt to generate a hash of the password
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) {
                return next(err);
            }

            // store the password hash as the password
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.isPasswordValid = function(rawPassword, callback) {
    bcrypt.compare(rawPassword, this.password, function(err, same) {
        if (err) {
            callback(err);
        }
        callback(null, same);
    });
};

module.exports= mongoose.model('User', UserSchema);
//const User = (module.exports = mongoose.model("User", UserSchema))
