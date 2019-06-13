const express = require('express');
var mongoose = require("mongoose");
var bodyParser = require('body-parser');
const Club = require('./models/club');

mongoose.connect('mongodb://yercko:asvprueba5@ds235417.mlab.com:35417/heroku_dtnk1mgn',{useNewUrlParser: true});
var db = mongoose.connection;

const app = express();
const errorBase = { hasError: true };
const successBase = { hasError: false };
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

db.on('error', console.error.bind(console, 'connection error:'));
db.once("open", function(){
    console.log("Conectado a la base de datos correctamente");
     app.get('/clubs', function(req, res) {
             Club.find()
                 .exec()
                 .then((club) => {
                   res.send(club);
                 })
                 .catch((err) => {
                    res.send(errorBase);
                 });
    });

    app.delete('/club', function(req, res) {
            Club.deleteOne({ name: req.body.name })
            .then((club) => {
                res.send(successBase);
            })
            .catch((err) => {
                res.send(errorBase);
            });
    });
     app.put('/club', function(req, res) {
            Club.findOne({
              name: req.body.name
            })
            .then((club) => {
                club.country = req.body.country;
                club.rival = req.body.rival;
                club.photo = req.body.photo;
                club.champions = req.body.champions;
              club
                .save()
                .then(() => {
                        res.send(successBase);
                    })
                .catch((err) => {
                    res.send(errorBase);
                 });
            })
            .catch((err) => {
                    res.send(errorBase);
                 });
    });
    
    app.post('/club', function(req, res) {
        var club = new Club({ 
            name: req.body.name, 
            country : req.body.country,
            rival : req.body.rival,
            photo: req.body.photo ,
            champions : req.body.champions
            });

            console.log(club);

            club.save()
                .then(function() {
                    res.send(successBase);
                  })
                .catch(function(err) {
                    res.send(errorBase);
                  });

        
    });

    console.log("Puerto "+process.env.PORT);

    app.listen((process.env.PORT || 3000))
});



