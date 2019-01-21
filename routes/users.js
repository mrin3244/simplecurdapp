// all type of operation
const express = require('express');
const mongoose = require('mongoose');

const User = require('../schema/User');

const router = express.Router(); //Routing refers to how an application’s endpoints (URIs) respond to client requests

router.get("/", (req, res, next) => {
    res.status(200).json({
        message:"Serving Users on the Endpoint."
    });
});

router.get("/list", (req, res, next) => {
    User.find({}) //mongoose query pattern
        .exec()  //query execution
        .then(docs => {  //after query execution .then execute and get 'docs' as result
            //console.log(docs);
            res.status(200).json({
                docs
            }); 
        })
        .catch(err => {  //.catch store err
        }); 
});

router.post("/add", (req, res, next) => {
    const user = new User({
        _id : mongoose.Types.ObjectId(), //get mongodb default id
        name : req.body.name,
        address : req.body.address,
        salary : req.body.salary
    });

    user.save()
    .then(result => {
        res.status(200).json({
            docs : [user]
        });
    })
    .catch(err => {
        console.log(err);
    });
});

router.post("/delete", (req, res, next) => {
    const rid = req.body.id;

    User.findById(rid)
        .exec()
        .then(docs => {
            docs.remove();
            res.status(200).json({
                deleted : true
            });
        })
        .catch(err => {
            console.log(err);
        });
});

router.post("/edit", (req, res, next) => {
    const rid = req.body.id;

    User.findById(rid)
        .exec()
        .then(docs => {
            //console.log("result "+docs);
            res.status(200).json({
                docs
            });
        })
        .catch(err => {
            console.log(err);
        });
});

router.post("/update", (req, res, next) => {
    let eid = mongoose.Types.ObjectId(req.body.id); // get object and make it objectType
    
    //console.log(eid +" == "+ [user]);
    User.findById(eid, function (err, user) {  // find User collection by _id and get document store in user 
        if (err) throw err;
        user.set({                              // user document set the updated fild
            name : req.body.name,
            address : req.body.address,
            salary : req.body.salary
        });
        
        user.save(function (err, updatedUser) {  // save the document with updated value
          if (err) throw err;
          //res.send(updatedUser);
          res.status(200).json({
               // docs : [updatedUser]
            });
        });
      });

});

module.exports = router;
