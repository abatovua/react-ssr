import 'babel-polyfill';

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import adminRoutes from './routes/admin';
import apiRoutes from './routes/api/index';

mongoose.Promise = global.Promise;
//test db nothing special. You can specify your own here.
mongoose.connect('mongodb://admin:admin@ds123080.mlab.com:23080/reaction');

const PORT = 4200;

const app = express();

if (process.env.NODE_ENV !== "production") {
	app.use(morgan('dev'));
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/assets', express.static(__dirname + '/assets'));

app.use('/api', apiRoutes);
app.use('/admin', adminRoutes);

app.use((err, req, res, next) => {
	console.log(err.toString());
	res.status(503).end('Internal server error. Please try later.');
});

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});