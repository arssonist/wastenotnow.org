const Email = require('../models/emails.js')
var express = require('express');
var app     = express();

var emails = [
    {name:'user1', email:'user1@user1.com'},
    {name:'user2', email:'user2@user2.com'},
    {name:'user3', email:'user3@user3.com'},
    {name:'user4', email:'user4@user4.com'}
]

module.exports = {
    debug:(req,res) => {
        // Email.findOne( {email:'drumgod101@gmail.com'}, (err,data) =>{ console.log(data.email)
        // })
    Email.remove({}, () => {
        function saveEmail(e){
            for (email of e){
                console.log(email)
                newEmail = new Email(email)
                console.log(newEmail)
                newEmail.save( (err, e) => {
                    if(err) console.error(err)
                if(newEmail.save() === true){
                    console.log('saved')
                } else {
                    console.log('not saved')
                console.log(e)
            }
        })

        }
        saveEmail(emails)
        res.redirect('/')
    }
    })
},
    dbseed:(req,res) => {
        var emails = [
            {name:'user1', email:'user1@user1.com'},
            {name:'user2', email:'user2@user2.com'},
            {name:'user3', email:'user3@user3.com'},
            {name:'user4', email:'user4@user4.com'}
        ]
        Email.remove({}, () => {

            for (email of emails){
                newEmail = new Email(email)
                newEmail.save()
            }
        if(newEmail.save() === true){
            console.log(newEmail, 'saved')
            res.render('index', {
                title:req.app.locals.title,
                success: `DB seeded`
            })
            return
        } else {
            console.log('not saved')
                res.render('index', {
                    title:req.app.locals.title,
                    error: `DB NOT seeded`
                })
            }
        })
    }

}
