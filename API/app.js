let express = require('express'),
    path = require('path'),
    cors = require('cors'),
    fileUpload = require('express-fileupload');

    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    config = require('./config/database');

const session = require("express-session");
const { secret } = require('./config/database');


const app = express()
//require('./config/passport')(passport);
mongoose.connect(config.database, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }).then( x=> {
  console.log("connected to db");
  
})

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(fileUpload());
app.use(passport.initialize());
app.use(passport.session());


// =====from folder server=========
app.use(express.static('./dist/client'));

app.get('/', function(req, res) {
  res.send('Page under construction.');
});

const loginController = require('./controller/loginControl');
const registerController = require('./controller/registerController');
const dashboardController = require('./controller/dashbordControl');
const FinController = require('./controller/finControllers');
const bookController = require('./controller/bookingControllers');
const usersController = require('./controller/userController');
const adminController = require('./controller/adminContoller');

app.use('/login', loginController);
app.use('/register', registerController);
app.use('/dashboard', dashboardController);
app.use('/fin', FinController);
app.use('/booking', bookController);
app.use('/users', usersController);
app.use('/admin', adminController);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// =====from folder server=========
app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, './dist/client', 'index.html'))
});



app.listen(5000, () => {
  console.log('The server is running');
} )