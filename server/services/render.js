//const axios = require('axios'); // allow us to make a request
const { default: Axios } = require('axios');
var Userdb = require('../model/model');

exports.homeRoutes = (req, res) => {
    // Make a get request to /api/users
    // axios.get("http://localhost:3000/api/users")
    //     .then(function(response){
    //         res.render('index', {users: response.data});
    //     })
    //     .catch(err =>{
    //         res.send(err);
    //     })
        Userdb.find({}, function(err, data){
            if(err) throw err;
            res.render('index', {users: data});
        });
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

