//const axios = require('axios'); // allow us to make a request
//const { default: Axios } = require('axios');
const { response } = require('express');
var Userdb = require('../model/model');

exports.homeRoutes = (req, res) => {
    res.render('index')
}

exports.add_user = (req,res) =>{
    res.render('add_user');
}

exports.update_user = (req,res) =>{
    const ServiceNumber = req.query.ServiceNumber;
    const aircraft_type = req.query.aircraft_type;
    Userdb.find({"service_number": ServiceNumber, "aircraft_type":aircraft_type}).exec(function(err,docs){
        if (err) throw err;
        if(docs[0] == null){
            res.render("notmatching");
        }else{
            console.log(docs);
            res.render("update_user",{users:docs});
        }
        
      });
}

// exports.form_reset = (req,res) =>{
     
//         Userdb.find().exec(function(err,docs){
//             if (err) throw err;
//             console.log(docs);
//             res.render("index",{users:docs});
//         });

// }