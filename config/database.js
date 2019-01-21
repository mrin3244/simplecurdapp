//Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.
const mongoose = require('mongoose');

//mongoose connect to mongodb database 
mongoose.connect(
    "mongodb://localhost:27017/mydb",  //mongodb://username:password@host:port/database?options...
    {
        useNewUrlParser : true   //current URL string parser is deprecated, and will be removed
    }
);

const db = mongoose.connection;   // store connection to db
db.on('error', console.error.bind(console, 'connection error : '));  // .on event handler and here event is 'error' 
                                                                    //and it occer many time
db.once('open', function(){    // .once event handler and here event is 'open' 
                                //and it occer one time
     // we're connected!
     console.log("Connected to MongoDB database");
});

module.exports = db;  // exports the module