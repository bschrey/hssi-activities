const createError = require('http-errors');
const bodyParser = require('body-parser');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const app = express();

app.use(logger('dev'));

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({"message": "Activities Server."});
});

require('./routes/activity-routes.js')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({
  	"error": err.status,
	"message": err.message,
	"stack": err.stack
	});
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});
