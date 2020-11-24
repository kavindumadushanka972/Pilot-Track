//const axios = require('axios'); // allow us to make a request
//const { default: Axios } = require('axios');
const { response } = require('express');
var Userdb = require('../model/model');

exports.homeRoutes = (req, res) => {
    //Make a get request to /api/users
    // axios.get("/api/users")
    //     .then(function(response){
    //         res.render('index', {users: response.data});
    //     })
    //     .catch(err =>{
    //         res.send(err);
    //     })
    

    //sorting 
    Userdb.find({}).sort({"distance": -1, "turns":-1, "att":-1, "accidents":1, "running_repair":1, "customer_complains":1, "disciplinary_actions":1, "fuel":-1, "avgspeed_show":-1}).collation({locale: "en_US", numericOrdering: true}).exec(function(err,docs){
        if (err) throw err;
        //console.log(docs);
        res.render("index",{users:docs});
      });
    //sorting according to the distance and rendering the page(This method is working too)
    // let query = Userdb.find({})
    // .sort({ distance: -1 }).collation({locale: "en_US", numericOrdering: true});

    // let promise = query.exec();

    // promise.then(data => {
    //     res.render("index", {
    //         users: data
    //     })
    // });

    
    // Userdb.find({},function(err, data){
    //     if(err) throw err;
    //     console.log(data);
    //     res.render('index', {users: data});
    // });
}

exports.add_user = (req,res) =>{
    res.render('add_user');
}

exports.update_user = (req,res) =>{
    const id = req.query.id;
    Userdb.findById(id, function(err, userdata){
        if(err) throw err;
        res.render('update_user', {users: userdata});
    })
}

exports.sort_turns = (req,res) =>{
    Userdb.find().sort({"turns": -1}).collation({locale: "en_US", numericOrdering: true}).exec(function(err,docs){
        if (err) throw err;
        console.log(docs);
        res.render("index",{users:docs});
      });
}

exports.sort_accidents = (req,res) =>{
    Userdb.find().sort({"accidents": 1}).collation({locale: "en_US", numericOrdering: true}).exec(function(err,docs){
        if (err) throw err;
        console.log(docs);
        res.render("index",{users:docs});
      });
}

exports.sort_attendance = (req,res) =>{
    Userdb.find().sort({"att": -1}).collation({locale: "en_US", numericOrdering: true}).exec(function(err,docs){
        if (err) throw err;
        console.log(docs);
        res.render("index",{users:docs});
      });
}

exports.sort_repairs = (req,res) =>{
    Userdb.find().sort({"running_repair": 1}).collation({locale: "en_US", numericOrdering: true}).exec(function(err,docs){
        if (err) throw err;
        console.log(docs);
        res.render("index",{users:docs});
      });
}
exports.sort_complains = (req,res) =>{
    Userdb.find().sort({"customer_complains": 1}).collation({locale: "en_US", numericOrdering: true}).exec(function(err,docs){
        if (err) throw err;
        console.log(docs);
        res.render("index",{users:docs});
      });
}
exports.sort_complains = (req,res) =>{
    Userdb.find().sort({"customer_complains": 1}).collation({locale: "en_US", numericOrdering: true}).exec(function(err,docs){
        if (err) throw err;
        console.log(docs);
        res.render("index",{users:docs});
      });
}
exports.sort_dis_action = (req,res) =>{
    Userdb.find().sort({"disciplinary_actions": 1}).collation({locale: "en_US", numericOrdering: true}).exec(function(err,docs){
        if (err) throw err;
        console.log(docs);
        res.render("index",{users:docs});
      });
}
exports.sort_fuel = (req,res) =>{
    Userdb.find().sort({"fuel": -1}).collation({locale: "en_US", numericOrdering: true}).exec(function(err,docs){
        if (err) throw err;
        console.log(docs);
        res.render("index",{users:docs});
      });
}
exports.sort_avgspeed = (req,res) =>{
    Userdb.find().sort({"avgspeed_show": -1}).collation({locale: "en_US", numericOrdering: true}).exec(function(err,docs){
        if (err) throw err;
        console.log(docs);
        res.render("index",{users:docs});
      });
}
// exports.form_reset = (req,res) =>{
     
//         Userdb.find().exec(function(err,docs){
//             if (err) throw err;
//             console.log(docs);
//             res.render("index",{users:docs});
//         });

// }