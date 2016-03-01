/**
 * Created by Rasumi on 10/12/15.
 */

var http = require('http');
var express = require('express');
var mongojs= require('mongojs');
var path = require('path');
var bodyParser = require('body-Parser');
var app = express();

var db = mongojs('users',['users']);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


/*var users=[

    {id:"0",firstname:"subbu",lastname:"lakshmi",age:30,gender:"F"},
    {id:"1",firstname:"sub",lastname:"lak",age:40,gender:"F"}
]*/


app.use(express.static(path.join(__dirname, '/www')));

app.get('/users',function(req,res){


    db.users.find(function(err,data){

        //console.log(data);
        res.json(data);
    });
});

app.post('/userCreate',function(req,res) {

    //console.log(req.body);
    db.users.insert(req.body,function(err,data){
        res.json(data);
        console.log(data);
    })
});


app.delete('/userDelete/:id',function(req,res) {

    var id= req.params.id;
    //console.log(id);
    db.users.remove({_id: mongojs.ObjectId(id)}, function (err, data) {

        res.json(data);
    });

});

app.get('/users/:id',function(req,res) {

    var id= req.params.id;
    //console.log(id);
    db.users.findOne({_id: mongojs.ObjectId(id)},function(err,data){
        res.json(data);
        //console.log(data);
    });
});

app.put('/userUpdate/:id',function(req,res) {

    var id = req.params.id;

    //console.log(req.body.name);

    db.users.findAndModify({query:{_id: mongojs.ObjectId(id)},

        update:{$set:{id:req.body.id,firstname:req.body.firstname,lastname:req.body.lastname,age:req.body.age, gender:req.body.gender}},
        new:true},function(err,data){
         res.json(data);

});

});


// A route for /say-hello
/*app.get('/say-hello', function(req, res, next) {

    res.send('hello');
});


var testfunc = function(req, res) {
    //res.send(users);
    res.json(users);
}

var testfunc_id = function(req, res) {

    res.json(users[req.params.id]);
}




var userCreate = function(req, res) {

    var user={};

    user.id = req.body.id;
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.age = req.body.age;
    user.gender = req.body.gender;
    users.push(user);

}

var userUpdate = function(req, res) {

    users[req.params.id].id = req.body.id;
    users[req.params.id].firstname = req.body.firstname;
    users[req.params.id].lastname = req.body.lastname;
    users[req.params.id].age = req.body.age;
    users[req.params.id].gender = req.body.gender;

    res.json(users);



}

var userDelete = function(req, res) {


    users.splice(req.params.id, 1);
    //res.json(true);
    res.json(users);



}



app.get('/users', testfunc);
app.get('/users/:id', testfunc_id);
app.post('/userCreate', userCreate);
app.put('/userUpdate/:id', userUpdate);
app.delete('/userDelete/:id', userDelete);*/


http.createServer(app).listen(8888, function() {
    console.log('Express App started');

});