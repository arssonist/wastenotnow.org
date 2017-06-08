var express = require('express');
var app     = express();


module.exports = {
    showHome:(req,res) =>{
        res.render('index',{title:req.app.locals.title})
        
    }

}
