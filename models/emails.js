var mongoose = require('mongoose')
var Schema = mongoose.Schema


const emailSchema = new Schema({
    name:String,
    email:String
})

const emailModel = mongoose.model('Email', emailSchema)

module.exports = emailModel
