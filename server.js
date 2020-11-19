const express = require('express');
const morgan = require('morgan'); // to print a log message on each request
const dotenv = require('dotenv'); // to load the config.env file(contains PORT/MONGODB string etc inside it)
const bodyparser = require('body-parser');
const path = require('path'); //to resolve paths
const connectDB = require('./server/database/connection'); //to connect to the mongodb cloud
const app = express();
var favicon = require('serve-favicon');

dotenv.config({path: 'config.env'}); //path to config file


//print log requests
app.use(morgan('tiny'));

//mongodb connection
connectDB();

//pass request to body-parser
app.use(bodyparser.urlencoded({extended:true}));

//set view engine
app.set('view engine', 'ejs');

app.use(favicon(__dirname + '/favicon.ico'));
//load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/img', express.static(path.resolve(__dirname, "assets/img")));
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));

//load routers
app.use('/',require('./server/routes/router'));

const port = process.env.PORT || 3000;
//listen to port
app.listen(port, ()=>{
    console.log("whazzaaaaapp");
});
console.log('You are listening to port 3000');