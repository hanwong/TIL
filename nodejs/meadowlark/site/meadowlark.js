var express = require('express'),
    fortune = require('./lib/fortune'),
    app = express();

var formidable = require('formidable');

// Cookie Secret
var credentials = require('./credentials');

// Handlebars 뷰 엔진 생성
var handlebars = require('express-handlebars').create({
        defaultLayout:'main',
        helpers: {
            section: function(name, options) {
                if(!this._sections) this._sections = {};
                this._sections[name] = options.fn(this);
                return null;
            }
        }
    });
app.engine('handlebars', handlebars.engine)
    .set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'))
    .set('port', process.env.PORT || 3000);

app.use(require('body-parser').urlencoded({extended: true}));
app.use(require('cookie-parser')(credentials.cookieSecret));

function getWeatherData() {
    return {
        locations: [
            {
                name: 'Portland',
                forecastUrl: 'http://www.wunderground.com/US/OR/Portland.html',
                iconUrl: 'http://icons-ak.wxug.com/i/c/k/cloudy.gif',
                weather: 'Overcast',
                temp: '54.1 F (12.3 C)'
            },
            {
                name: 'Bend',
                forecastUrl: 'http://www.wunderground.com/US/OR/Bend.html',
                iconUrl: 'http://icons-ak.wxug.com/i/c/k/partlycloudy.gif',
                weather: 'Partly Cloudy',
                temp: '55.0 F (12.8 C)'
            },
            {
                name: 'Manzanita',
                forecastUrl: 'http://www.wunderground.com/US/OR/Manzanita.html',
                iconUrl: 'http://icons-ak.wxug.com/i/c/k/rain.gif',
                weather: 'Light Rain',
                temp: '54.5 F (12.5 C)'
            }
        ]
    };
}

// partials
app.use(function(req, res, next) {
    if(!res.locals.partials) res.locals.partials = {};
    res.locals.partials.weatherContext = getWeatherData();
    next();
});

app.get('/', function(req, res) {
    res.render('home');
});

// section
app.get('/nursery-rhyme', function(req, res) {
    res.render('nursery-rhyme');
});
app.get('/data/nursery-rhyme', function(req, res) {
    res.json({
        animal: 'squirrel',
        bodyPart: 'tail',
        adjective: 'bushy',
        noun: 'heck'
    });
});

// form submit
app.get('/newsletter', function(req, res) {
    res.render('newsletter', {csrf: 'CSRF token goes here.'});
});
app.post('/process', function(req, res) {
    // console.log('Form (from querystring): ' + req.query.form);
    // console.log('CSRF token (from hidden form field): ' + req.body._csrf);
    // console.log('Name (from visible form field): ' + req.body.name);
    // console.log('Email (from visible form field): ' + req.body.email);
    // res.redirect(303, '/thank-you');
    if(req.xhr || req.accepts('json,html') === 'json') {
        res.send({success: true});
    }
    else {
        res.redirect(303, '/thank-you');
    }
});

// file uploads
app.get('/contest/vacation-photo', function(req, res) {
    var now = new Date();
    res.render('contest/vacation-photo', {
        year: now.getFullYear(),
        month: now.getMonth()
    });
});
app.post('/contest/vacation-photo/:year/:month', function(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        if(err) return res.redirect(303, '/error');
        console.log('received fields:');
        console.log(fields);
        console.log('received files:');
        console.log(files);
        res.redirect(303, '/thank-you');
    });
});

app.get('/about', function(req, res) {
    res.render('about', {fortune : fortune.getFortune()});
});

app.get('/thank-you', function(req, res) {
    res.render('thank-you');
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
