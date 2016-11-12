import express from 'express';
import path from 'path';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import session from 'express-session';

import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';

import api from './routes';

const app = express();
const port = 3000;
const devPort = 4000;

// middlewawre
app.use('/', express.static(path.join(__dirname, './../public')));

app.use(morgan('dev'));
app.use(bodyParser.json());

// db connection
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => { console.log('Connected to mongodb server'); });
mongoose.connect('mongodb://localhost/memo');

app.use(session({
    secret: 'Hanwoong$1234',
    resave: false,
    saveUnintialized: true
}));

// router
app.use('/api', api);

//
app.get('/hello', (req, res) => {
    return res.send('hello');
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something Broken!!');d
});

app.listen(port, () => {
    console.log('Express is listening on port', port);
});

if(process.env.NODE_ENV == 'development') {
    console.log('Server is running on development mode');
    const config = require('../webpack.dev.config');
    const compiler = webpack(config);
    const devServer = new WebpackDevServer(compiler, config.devServer);
    devServer.listen(
        devPort, () => {
            console.log('webpack-dev-server is listening on port', devPort);
        }
    );
}
