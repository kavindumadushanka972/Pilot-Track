var Userdb = require('../model/model');


// create & save new user
exports.create = (req,res) =>{
    //validate request
    if(!req.body){ //is request with an empty body
        res.status(400).send({message: "Content can not be empty"});
        return; //exit
    }
    console.log(req.files);
    console.log(req.body);
    var addingDate = new Date(req.body.date);
    var finalDate = new Date(req.body.date)
    var numberofdays_to_remind = 351;
    var numberofdays_to_expire = 365;
    addingDate.setDate(addingDate.getDate() + numberofdays_to_remind);
    finalDate.setDate(finalDate.getDate()+ numberofdays_to_expire);


    //new user
    const user = new Userdb({
        service_number: req.body.service_number,
        rank: req.body.rank,
        name_init: req.body.name_init,
        jet_total_hrs: req.body.jet_total_hrs,
        jet_total_mins: req.body.jet_total_mins,
        jet_6_hrs: req.body.jet_6_hrs,
        jet_6_mins: req.body.jet_6_mins,
        piston_total_hrs: req.body.piston_total_hrs,
        piston_total_mins: req.body.piston_total_mins,
        piston_6_hrs: req.body.piston_6_hrs,
        piston_6_mins: req.body.piston_6_mins,
        actual_total_hrs: req.body.actual_total_hrs,
        actual_total_mins: req.body.actual_total_mins,
        actual_6_hrs: req.body.actual_6_hrs,
        actual_6_mins: req.body.actual_6_mins,
        simulated_total_hrs: req.body.simulated_total_hrs,
        simulated_total_mins: req.body.simulated_total_mins,
        simulated_6_hrs: req.body.simulated_6_hrs,
        simulated_6_mins: req.body.simulated_6_mins,
        let_downs: req.body.let_downs,
        aircraft_type: req.body.aircraft_type,
        first_pilot_total_hrs: req.body.first_pilot_total_hrs,
        first_pilot_total_mins: req.body.first_pilot_total_mins,
        first_pilot_total_6_hrs: req.body.first_pilot_total_6_hrs,
        first_pilot_total_6_mins: req.body.first_pilot_total_6_mins,
        instrument_ratings: req.body.renewed_rating_type,
        card_number: req.body.card_number,
        verification_rank: req.body.verification_rank,
        verification_name: req.body.verification_name,
        verification_appoinment: req.body.verification_appoinment,
        renewed_rating_type: req.body.renewed_rating_type,
        validity_of_rating: req.body.validity_of_rating,
        number_of_cards: req.body.number_of_cards,
        date: req.body.date,
        expiredate: addingDate,
        finalday: finalDate,
        findFactor: req.body.service_number + req.body.aircraft_type
    })
    // if(req.file){
    //     user.avatar = req.file.filename
    // }
    if(req.files){
        
        var photoarray = []
        req.files.forEach(function(files, index, arr){
            var name =  files.filename;
            console.log(name);
            photoarray.push(name);
        })
        
        user.avatar1 = photoarray[0];
        user.avatar2 = photoarray[1];
    }
    // save user in the database
    user
        .save(user)
        .then(data =>{
            //res.send(data);
            res.redirect('/add-user');
        })
        .catch(err =>{
            res.status(500).send({
                message: err.message || "Some error occured while creating a create operation"
            });
        });
}

// retrive & return all users/ retrive & return a single user
// exports.find = (req, res) =>{
//     if(req.query.id){
//         const id = req.query.id;
//         Userdb.findById(id)
//             .then(data =>{
//                 if(!data){
//                     res.status(404).send({message: "Not found user with id " + id})
//                 }else{
//                     res.send(data)
//                 }
//             })
//             .catch(err =>{
//                 res.status(500).send({message: "Error retrieving user with id " + id})
//             })
//     }else{
//         Userdb.find()
//             .then(user =>{
//                 res.send(user)
//             })
//             .catch(err =>{
//                 res.status(500).send({message: err.message || "Error Occured while retirive user info"})
//             })
//     }  
// }

//update a new identified user by userID
exports.update = (req, res) =>{
    if(!req.body){
        return res
            .status(400)
            .send({message: "Data to update can not be empty"})
    }
    
    const findFactor = req.params.findFactor; //getting url parameter
    // console.log("*******" + findFactor);
    var addingDate = new Date(req.body.date);
    var finalDate = new Date(req.body.date);
    var numberofdays_to_remind = 351;
    var numberofdays_to_expire = 365;
    addingDate.setDate(addingDate.getDate() + numberofdays_to_remind);
    finalDate.setDate(finalDate.getDate()+ numberofdays_to_expire);
    req.body.expiredate = addingDate;
    req.body.finalday = finalDate;

    if (req.body.renewed_rating_type != "Choose.."){
        req.body.instrument_ratings = req.body.renewed_rating_type;
        
    }

    Userdb.findOneAndUpdate({'findFactor': findFactor}, req.body, {useFindAndModify: false})
        .then(data =>{
            if(!data){
                res.status(404).send({message: `Cannot update user with $(id). Maybe user not found`})
            }else{
                res.send(data);
            }
        })
        .catch(err =>{
            res.status(500).send({message: `Error update user information`})
        })  

    

}

//delete a user with specified user id in the request
exports.delete = (req, res) =>{
    const findFactor = req.params.findFactor;
    Userdb.deleteOne({'findFactor':findFactor})
        .then(data =>{
            if(!data){
                res.status(404).send({message: `Cannot delete with id $(id). Maybe id is wrong`})
            }else{
                res.send({
                    message: "User was deleted successfully"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id = " + id
            });
        });
}

// exports.form_reset = (req,res) =>{
     
//         Userdb.updateMany(
//             {},
//             {
//                 $set:{
//                     'att':'0',
//                     'distance': '0',
//                     'turns':'0',
//                     'accidents':'0',
//                     'running_repair':'0',
//                     'customer_complains':'0',
//                     'disciplinary_actions':'0',
//                     'fuel':'0',
//                     'avgspeed':'0',
//                     'avgspeed_show':'_'

//                 }
//             }
//         ).exec(function(err,docs){
//             if (err) throw err;
//             console.log(docs);
//             res.render("index",{users:docs});
//             // res.send({
//             //     message: "Successfully Reset"
//             // })
//         });
// }