const mongoose = require('mongoose');

var scheme = new mongoose.Schema({
    service_number: String,
    rank: String,
    name_init: String,
    jet_total_hrs: String,
    jet_total_mins: String,
    jet_6_hrs: String,
    jet_6_mins: String,
    piston_total_hrs: String,
    piston_total_mins: String,
    piston_6_hrs: String,
    piston_6_mins: String,
    actual_total_hrs: String,
    actual_total_mins: String,
    actual_6_hrs: String,
    actual_6_mins: String,
    simulated_total_hrs: String,
    simulated_total_mins: String,
    simulated_6_hrs: String,
    simulated_6_mins: String,
    let_downs: String,
    aircraft_type: String,
    first_pilot_total_hrs: String,
    first_pilot_total_mins: String,
    first_pilot_total_6_hrs: String,
    first_pilot_total_6_mins: String,
    instrument_ratings: String,
    card_number: String,
    verification_rank: String,
    verification_name: String,
    verification_appoinment: String,
    renewed_rating_type: String,
    validity_of_rating: String,
    number_of_cards: String,
    date: String
});

const Userdb = mongoose.model('userdb', scheme);
module.exports = Userdb;