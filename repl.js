var repl = require('repl')
var mongoose = require('mongoose')

require('dotenv').config()


var Emails = require('./models/emails')



mongoose.connect(process.env.DB_URI, function(err){
    if (err){throw err }

    var replServer = repl.start({
        prompt: "my-app > ",

    })
})
