const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/projectDevelopment');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Connection is not succesfull to database"));

db.once('open', function () {
    console.log("Succesfully connected to database")
})