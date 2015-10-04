var express = require('express'),
path = require('path'),
favicon = require('serve-favicon'),
logger = require('morgan'),
cookieParser = require('cookie-parser'),
bodyParser = require('body-parser'),
multer = require('multer'),
constants = require('./helper/constants');

var apiRoute = require('./routes/api');

var app = express();

//view engine setup
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(multer());
app.use(express.static(path.join(__dirname, 'public')));


app.use(function(req,res,next){
		if(req.url === "/" || req.url === "/compare"){
			next();
		}
		else{
				console.log("err 56");
				res.render("error");
			}
});


app.use('/',apiRoute);


//catch 404 and forward to error handler
app.use(function(req, res, next) {
	console.log("err 91");
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

//error handlers

//development error handler
//will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		console.log("err 103");
		res.status(err.status || 500);
		res.render('error');
	});
}

//production error handler
//no stack traces leaked to user
app.use(function(err, req, res, next) {
	console.log("err 112");
	res.status(err.status || 500);
	res.json({
		message: err.message,
		error: {}
	});
});

app.listen(4000,function(){
	console.log("Client Started ... ");
});

module.exports = app;