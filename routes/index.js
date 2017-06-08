var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
var auth = require('../config.json')
var homeController = require('../controllers/home.controller.js')
var emailController = require('../controllers/email.controller.js')
var Email = require("../models/emails")
var expressValidator = require('express-validator')


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(expressValidator()); // Add this after the bodyParser middlewares!

let title = "Waste Not Now"

router.get('/debug', emailController.debug)


/* GET home page. */
router.get('/', homeController.showHome)


// 404 for page not found requests
router.get(function (request, response) {
  response.sendFile(path.join(__dirname + '/assets/404.html'));
});

// http GET /about
router.get('/about', function (request, response) {
  response.send('about page');
 })

// http GET /contact
router.get("/contact", function (req, res) {
  res.send('contact page')
 })


router.get("/db-seed", emailController.dbseed)
//
//     var emails = [
//         {name:'user1', email:'user1@user1.com'},
//         {name:'user2', email:'user2@user2.com'},
//         {name:'user3', email:'user3@user3.com'},
//         {name:'user4', email:'user4@user4.com'}
//     ]
//     //To Remove all events
//     Email.remove({}, () => {
//         for (email of emails){
//             var newEmail = new Email(email)
//             newEmail.save()
//         }
//     })
//     res.send('DB seeded')
//     //console.log('Username: ' + req.body.username)
//     //console.log('Password: ' + req.body.email)
//     // var apikey = auth.api_key;
//     // var domain = auth.domain
//     // var mailgun = require('mailgun-js')({apiKey: apikey, domain: domain});
//     // //
//     // var data = {
//     //   from: 'Mail Gun <postmaster@sandbox7989cfe70dee4e4bbadb0439ff151517.mailgun.org>',
//     //   to: req.
//     // //   subject:
//     //   text: 'Testing some Mailgun awesomness!'
//     // };
//     //
//     // mailgun.messages().send(data, function (error, body) {
//     //   console.log(body);
//     // });
// });
router.post("/", (req,res) => {

    req.checkBody('name', 'Cannot be empty').notEmpty()
    var entry = {
        name:req.body.username,
        email: req.body.email
    }
    //
    // Email.remove({}, () => {
    // var entered = new Email(entry)
    // entered.save()
    //
    // })
    // res.send("email saved")

    Email.find({"email":entry.email}, (err, email) => {
        console.log(email)
        if(err){
            console.log(err)
        }
        if(email.length){
            console.log('exists')
            res.render('index', {
                title: title,
                errors: "This email already exixts"
            })
            return
            // res.send('email already exists')
            // return res.redirect('/')
        } else {
            console.log("doesn't exist")
            var entered = new Email(entry)
            entered.save()
            res.render('index',{
                title: title,
                success:"Thanks! Your email has been saved."
            })
        }
    })




    // Email.find({ 'name': entry.name,'email':entry.email }, function(err, email) {
    //
    //     if (err) {
    //
    //         console.log(`Signup error ${err}`);
    //
    //     }
    //
    //     //if user found.
    //     if (email.length!=0) {
    //       if(email[0].username){
    //         console.log('Username already exists, username: ' + username);
    //          }else{
    //             console.log('EMAIL already exists, email: ' + email);
    //          }
    //          var err = new Error();
    //         err.status = 310;
    //         return done(err);
    //
    //     }
    // })
})

module.exports = router;
