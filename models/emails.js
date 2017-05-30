var mongoose = require('mongoose')
var Schema = mongoose.Schema


const emailSchema = new Schema({
    name:String,
    email: {
        type: String,
        set: toLower,
        require:[
      function() { return this.email != null; },
      'email is required to proceed'
    ]
    }
})

const emailModel = mongoose.model('Email', emailSchema)

function toLower (str) {
    return str.toLowerCase();
}

module.exports = emailModel
