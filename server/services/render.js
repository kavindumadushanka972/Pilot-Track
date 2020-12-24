//const axios = require('axios'); // allow us to make a request
//const { default: Axios } = require('axios');
const { response } = require('express');
var Userdb = require('../model/model');

exports.homeRoutes = (req, res) => {
    Userdb.find({},{"expiredate":1}).exec(function(err,docs){
        if (err) throw err;
        
        // console.log(docs.length);
        var i;
        var count = 0;
        var date = new Date();
        // console.log(date)
        for(i=0; i< docs.length;i++){
            // console.log(new Date(docs[i].expiredate));
            if(date.getTime() >= new Date(docs[i].expiredate).getTime())
                count+=1;
        }
        // console.log(count);
        res.render('index',{count});
        //console.log(JSON.parse(JSON.stringify(docs)));
    });

}

exports.add_user = (req,res) =>{
    res.render('add_user'); 
}

exports.update_user_card = (req, res) =>{
    const CardNumber = req.query.card_number;
    Userdb.find({"card_number": CardNumber}).exec(function(err,docs){
        if (err) throw err;
        if(docs[0] == null){
            res.render("notmatching");
        }else{
            // console.log(docs);
            res.render("update_user",{users:docs});
        }
        
      });
}

exports.update_user = (req,res) =>{
    const ServiceNumber = req.query.ServiceNumber;
    const aircraft_type = req.query.aircraft_type;
    Userdb.find({"service_number": ServiceNumber, "aircraft_type":aircraft_type}).exec(function(err,docs){
        if (err) throw err;
        if(docs[0] == null){
            res.render("notmatching");
        }else{
            // console.log(docs);
            res.render("update_user",{users:docs});
        }
        
      });
}

exports.notifications = (req,res) =>{
    Userdb.find({},{"expiredate":1, "service_number":1, "name_init":1, "aircraft_type":1,"rank":1,"finalday":1}).exec(function(err,docs){
        if (err) throw err;
        // console.log(docs);
        // console.log(docs.length);
        var i;
        var users = []
        var date = new Date();
        // console.log(date)
        for(i=0; i< docs.length;i++){
            // console.log(new Date(docs[i].expiredate));
            if(date.getTime() >= new Date(docs[i].expiredate).getTime()){
                var person = {"service_number":docs[i].service_number, "name_init":docs[i].name_init, "aircraft_type":docs[i].aircraft_type, "rank":docs[i].rank, "expire":new Date(docs[i].finalday).toDateString()};
                JSON.stringify(person);
                users.push(person);
            }
                
        }
        // console.log(users);
        res.render('notifications', {users:users});
        
    
    });
     
}

// exports.form_reset = (req,res) =>{
     
//         Userdb.find().exec(function(err,docs){
//             if (err) throw err;
//             console.log(docs);
//             res.render("index",{users:docs});
//         });

// }