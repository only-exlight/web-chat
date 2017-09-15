"use strict";
let express = require('express'),
    fs = require('fs'),
    app = express();

app.get('/', function(req,res){
    res.render('home.jade');
})

app.get('/sendmess', function(req,res){
    let data = req.query.name + ": " + req.query.mess + "\n"; 
    fs.appendFile('files/history', data);
})

app.get('/hist', function(req,res){
    fs.readFile('files/history', function(err,data){
        res.end(''+data);
    })
})

let messages = {};
app.get('/nowsend',function(req,res){
    messages.name = req.query.name;
    messages.mess = req.query.mess;
    res.end();
});

app.get('/now', function(req,res){
    if (messages.mess == "" || messages.mess == undefined){
        res.end();
    } else {
        res.end(messages.name + " печает : " + messages.mess);
    }
})

app.use(express.static(__dirname + '/static'));

app.listen(2000, function(){
    console.log('Listen port 2000');
})