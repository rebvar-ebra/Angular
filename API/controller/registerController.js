const express =require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');
const registerService =require('../service/register_service');
const registerValidation = require('../validation/validation')



router.post('/signup', function(req, res) {
    if (!req.body.email || !req.body.password) {
      res.json({success: false, msg: 'Please pass email and password.'});
    } else {
      var newUser = new User({
        first:req.body.first,
        last:req.body.last,  
        email: req.body.email,
        password: req.body.password,
        address:req.body.address
      });
      // save the user
      newUser.save(function(err) {
        if (err) {
          return res.json({success: false, msg: 'email already exists.'});
        }
        res.json({success: true, msg: 'Successful created new user.'});
      });
    }
  });
  
  router.post('/signin', function(req, res) {
    User.findOne({
      email: req.body.email
    }, function(err, user) {
      if (err) throw err;
  
      if (!user) {
        res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
      } else {
        // check if password matches
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (isMatch && !err) {
            // if user is found and password is right create a token
            var token = jwt.sign(user.toJSON(), config.secret, {
              expiresIn: 604800 // 1 week
            });
            // return the information including token as JSON
            res.json({success: true, token: 'JWT ' + token});
          } else {
            res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
          }
        });
      }
    });
  });
  
  router.get('/signout', passport.authenticate('jwt', { session: false}), function(req, res) {
    req.logout();
    res.json({success: true, msg: 'Sign out successfully.'});
  });
  
  //Get By Id
  router.get('/:userId',passport.authenticate(jwt,{session:false})),function(req,res){
    const id =req.patams.userid;
    res.status(200).json({message:"Handel get request to api/router/auth"})
  
  }
  

// router.post('/step1',registerValidation.registerStepOne, registerValidation.validateUser, async (req, res)=>{
//     try {
//         await registerService.registerStepOne(req, res);
//         return res.sendStatus(201)
//     } catch (error) {
//         res.status(400).send({error});
//     }
// });

// router.patch('/step2',registerValidation.registerStepTwo, async (req, res)=>{
//     try {
//         await registerService.registerStepTwo(req, res);
//         return res.sendStatus(201)
//     } catch (err) {
//         console.log(err);
//         res.status(400).send({error: "Something went wrong"});
//     }
// });


module.exports = router;