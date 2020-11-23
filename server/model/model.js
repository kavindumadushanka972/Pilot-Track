const mongoose = require('mongoose');

var scheme = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    emp_num: {
        type: String,
        required: true,
        unique: true
    },
    mob_num: String,
    address: String,
    att: String,
    distance: String,
    turns: String,
    accidents: String,
    running_repair: String, 
    customer_complains: String,
    disciplinary_actions: String,
    fuel: String,
    avgspeed: String,
    avgspeed_show: String
});

const Userdb = mongoose.model('userdb', scheme);
module.exports = Userdb;