const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors'); //CORS is a node.js package for providing a Connect/Express 
                            //middleware that can be used to enable CORS with various options.

const db = require('./config/database');
const hb = require('./config/handlebars');
const users = require('./routes/users');

const User = require('./schema/User');

const app = express();

//set template engine
// The app object is instantiated on creation of the Express server
// It has a middleware stack that can be customized in app.configure()
app.engine("hbs", hb);
app.set("view engine","hbs");   //Using hbs as the default view engine requires just one line 
                                //of code in your app setup. This will render .hbs files 
                                //when res.render is called.

//make way for some custom css, js and images
// To setup your middleware, you can invoke app.use([path,] callback [, callback...])
// for every middleware layer that you want to add 
// (it can be generic to all paths, or triggered only on specific path(s) your server handles)
app.use('/custom/css', express.static(__dirname + '/views/static/css'));
app.use('/custom/js', express.static(__dirname + '/views/static/js'));
app.use('/custom/imgs', express.static(__dirname + '/views/static/imgs'));

app.use(cors());   
app.use(bodyparser.json());  //basically tells the system(request) that you want json to be used.
app.use(bodyparser.urlencoded({extended : false}));   //basically tells the system whether you 
                                            //want to use a simple algorithm for shallow parsing 
                                            //(i.e. false) or complex algorithm for deep parsing 
                                            //that can deal with nested objects (i.e. true).

app.use("/users", users); 
//Home route
app.get('/', (req, res) => {
    res.render('home');
});

module.exports = app;