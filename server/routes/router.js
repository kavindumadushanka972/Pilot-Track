const express = require('express');
const route = express.Router();

const services = require('../services/render');
const controller = require('../controller/controller');
/**
 * @description Root Route
 * @method GET /
 */
route.get('/', services.homeRoutes);

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

// API
route.post('/api/users', controller.create); //POST is used to send data to a server to create/update a resource.
route.get('/api/users', controller.find); //GET is used to request data from a specified resource.
route.put('/api/users/:id', controller.update); //PUT is used to send data to a server to create/update a resource.
route.delete('/api/users/:id', controller.delete); //The DELETE method deletes the specified resource.
module.exports = route;