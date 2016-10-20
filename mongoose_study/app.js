var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var router = require('./routes/router');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(req, res){
    res.send('Mooooongooose');
});

app.use('/api', router);

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {
    console.log('Connected to MongoDB Server.');
});
mongoose.connect('mongodb://localhost/mongodb_tutorial');

var port = process.env.PORT || 8800;

var server = app.listen(port, function(){
    console.log('Express Server has started on port: ', port);
});
