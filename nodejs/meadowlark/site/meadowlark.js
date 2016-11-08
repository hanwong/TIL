var express = require('express'),
    fortune = require('./lib/fortune'),
    app = express(),
    // Handlebars 뷰 엔진 생성
    handlebars = require('express-handlebars')
    .create({defaultLayout:'main'});

app.use(express.static(__dirname + '/public'))
    .set('port', process.env.PORT || 3000)
    .engine('handlebars', handlebars.engine)
    .set('view engine', 'handlebars');

app.get('/', function(req, res) {
    res.render('home');
});

app.get('/about', function(req, res) {
    res.render('about', {fortune : fortune.getFortune()});
});

app.use(function(req, res) {
    res.status(404);
    res.render('404');
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function() {
    console.log('Express Server Started!!!');
});
