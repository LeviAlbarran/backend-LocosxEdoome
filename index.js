
// Dependencias
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');  
var authCtrl = require('./controllers/auth');  
var middleware = require('./controllers/middleware');
var autoIncrement = require('mongoose-auto-increment');


// MongoDB
mongoose.connect('mongodb://edoome5491:123@olympia.modulusmongo.net:27017/utoPe2ju');
// Express
var app = express();  
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({extended: true}));  
app.use(cors()); 
app.set('port', (process.env.PORT || 5000));
app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})


require('./models/usuarios');
var router = express.Router();

// Rutas de autenticación y login
app.post('/auth/signup', authCtrl.emailSignup);
app.post('/auth/login', authCtrl.emailLogin);

// Routes
app.use('/api', middleware.ensureAuthenticated,  require('./routes/api'));

// Start server
app.listen(app.get('port'), function() {
  console.log('Node is running on port', app.get('port'));
});

