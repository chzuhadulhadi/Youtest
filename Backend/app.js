var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
var app = express();
// const fileUpload = require("express-fileupload")

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
var router = require('./router');

app.use(cors());
app.use(
	fileUpload({
		limits: { fileSize: 50 * 1024 * 1024 },
	})
);

app.use(router);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

const model = require('./model');
const mailService = require('./service/mailService');

async function sendMail() {
	const email = await model.email.findOne({ where: { status: 0 } });
	console.log('email', email);
	try {
		if (email) {
			console.log('email inside', email.type);
			if (email.type == 'initiatedTest') {
				await mailService.sendTestInitiateEmail(
					email.to,
					email.body.name,
					email.body.testUrl,
					'english',
					email.id
				);
			} else if (email.type == 'testResult') {
				console.log('trying to send email');
				await mailService.sendTestResultEmail(email);
				console.log('email sent');
			}
			await email.update({ status: 1 });
			// console.log("email sent", email)
			setTimeout(sendMail, 1000);
		} else {
			console.log('No new email');
			setTimeout(sendMail, 5000);
		}
	} catch (e) {
		console.log('err', e);
		setTimeout(sendMail, 5000);
	}
}
sendMail();

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
