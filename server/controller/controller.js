var Userdb = require('../model/model');

// create & save new user
exports.create = (req,res) =>{
    //validate request
    if(!req.body){ //is request with an empty body
        res.status(400).send({message: "Content can not be empty"});
        return; //exit
    }

    //new user
    const user = new Userdb({
        name: req.body.name,
        emp_num: req.body.emp_num,
        mob_num: req.body.mob_num,
        address: req.body.address,
        distance: req.body.distance,
        turns: req.body.turns,
        accidents:req.body.accidents
    });

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
exports.find = (req, res) =>{
    if(req.query.id){
        const id = req.query.id;
        Userdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({message: "Not found user with id " + id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({message: "Error retrieving user with id " + id})
            })
    }else{
        Userdb.find()
            .then(user =>{
                res.send(user)
            })
            .catch(err =>{
                res.status(500).send({message: err.message || "Error Occured while retirive user info"})
            })
    }  
}

//update a new identified user by userID
exports.update = (req, res) =>{
    if(!req.body){
        return res
            .status(400)
            .send({message: "Data to update can not be empty"})
    }
    
        const id = req.params.id; //getting url parameter
        //To update the distance ***********************************
        req.body.distance = parseFloat(req.body.distance) + parseFloat(req.body.distance_update);
        req.body.turns = parseInt(req.body.turns) + parseInt(req.body.turns_update);
        req.body.accidents = parseInt(req.body.accidents) + parseInt(req.body.accidents_update);
        //********************************************************** */
        Userdb.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
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

// delete a user with specified user id in the request
exports.delete = (req, res) =>{
    const id = req.params.id;
    Userdb.findByIdAndDelete(id)
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

exports.form_reset = (req,res) =>{
     
        Userdb.updateMany(
            {},
            {
                $set:{
                    'distance': '0',
                    'turns':'0',
                    'accidents':'0'
                }
            }
        ).exec(function(err,docs){
            if (err) throw err;
            console.log(docs);
            res.render("index",{users:docs});
            // res.send({
            //     message: "Successfully Reset"
            // })
        });
}