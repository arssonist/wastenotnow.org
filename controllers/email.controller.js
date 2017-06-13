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

        Email.remove({}, () => {

            for (email of emails){
                newEmail = new Email(email)
                newEmail.save((err, e, numAffected) => {
                    console.log(`${e} saved`)
                    if(err){
                        console.error(error)
                    }
                })

            }
        })

        res.render('index',{success:'debug route working'})
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
    },
    addEmail:(req,res) => {
        //check for empty email
        req.checkBody('name', 'Cannot be empty').notEmpty()
        var entry = {
            name:req.body.username,
            email: req.body.email
        }
        //check if email exist, if not save
        Email.find({"email":entry.email}, (err, email) => {
            console.log(email)
            if(err){
                console.log(err)
            }
            if(email.length){
                console.log('exists')
                res.render('index', {
                    title: req.app.locals.title,
                    errors: "This email already exixts"
                })
                return
            } else {
                console.log("doesn't exist")
                var entered = new Email(entry)
                entered.save()
                res.render('index',{
                    title:req.app.locals.title ,
                    success:"Thanks! Your email has been saved."
                })
            }
        })

    }
}
