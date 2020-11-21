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
    distance: String,
    turns: String,
    accidents: String
});

const Userdb = mongoose.model('userdb', scheme);
module.exports = Userdb;