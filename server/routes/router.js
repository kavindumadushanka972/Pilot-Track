const express = require('express');
const route = express.Router();
const services = require('../services/render');
const controller = require('../controller/controller');
const upload = require('../controller/upload');
var user = require('../model/model');

/**
 * @description Root Route
 * @method GET /
 */
route.get('/', services.homeRoutes);

route.get('/updated', services.updated);

/**
 * @description add users
 * @method GET /add-user
 */
route.get('/add-user', services.add_user);

/**
 * @description update user
 * @method GET / update-user
 */
route.get('/update-user', services.update_user);

/**
 * @description load notifications
 * @method GET / notifications
 */
route.get('/notifications', services.notifications);

route.get('/update-user-card', services.update_user_card);
//route.get('/form-reset', services.form_reset);

// API
route.post('/api/users', upload.array('avatar[]'), controller.create); //POST is used to send data to a server to create/update a resource.
// route.get('/api/users', controller.find); //GET is used to request data from a specified resource.
route.post('/api/users/:findFactor',upload.array('avatar[]'), controller.update); //PUT is used to send data to a server to create/update a resource.
route.delete('/api/users/:findFactor', controller.delete); //The DELETE method deletes the specified resource.
// route.get('/api/users/reset', controller.form_reset);

module.exports = route;