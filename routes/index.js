var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');
var auth = require('../config.json')
var nodemailerMailgun = nodemailer.createTransport(mg(auth));
var homeController = require('../controllers/home.controller.js')
var Email = require("../models/emails")

// router.use(logger('dev'));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(homeController.showHome)
    res.render('index', { title: 'Waste Not Now' })
});

// 404 for page not found requests
router.get(function (request, response) {
  response.sendFile(path.join(__dirname + '/assets/404.html'));
});

// http GET /about
router.get("/about", function (request, response) {
  response.send('about page');
 })

// http GET /contact
router.get("/contact", function (req, res) {
  res.send('contact page')
 })

 // http POST /contact
router.post("/", function (req, res) {
    console.log('Username: ' + req.body.username)
    console.log('Password: ' + req.body.email)
    // var apikey = auth.api_key;
    // var domain = auth.domain
    // var mailgun = require('mailgun-js')({apiKey: apikey, domain: domain});
    // //
    // var data = {
    //   from: 'Mail Gun <postmaster@sandbox7989cfe70dee4e4bbadb0439ff151517.mailgun.org>',
    //   to: req.
    // //   subject:
    //   text: 'Testing some Mailgun awesomness!'
    // };
    //
    // mailgun.messages().send(data, function (error, body) {
    //   console.log(body);
    // });
});


module.exports = router;
