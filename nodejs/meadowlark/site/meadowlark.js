var express = require('express'),
    fortune = require('./lib/fortune'),
    app = express(),
    handlebars = require('express-handlebars').create({
        defaultLayout:'main',
        helpers: {
            section: function(name, options) {
                if(!this._sections) this._sections = {};
                this._sections[name] = options.fn(this);
                return null;
            }
        }
    });

app.use(express.static(__dirname + '/public'))
    .set('port', process.env.PORT || 3000)
    // Handlebars 뷰 엔진 생성
    .engine('handlebars', handlebars.engine)
    .set('view engine', 'handlebars');

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

app.use(function(req, res, next) {
    if(!res.locals.partials) res.locals.partials = {};
    res.locals.partials.weatherContext = getWeatherData();
    next();
});

app.get('/', function(req, res) {
    res.render('home');
});

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
