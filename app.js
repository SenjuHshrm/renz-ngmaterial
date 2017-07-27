const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');
const app = express();

const indexCtrl = require('./controller/index');

dotenv.load({
  path: '.env'
});
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.set('port', process.env.PORT || 3019);

app.get('/', indexCtrl.index);

app.listen(app.get('port'), () => {
  console.log('Page now running on http://localhost:%d in %s mode', app.get('port'), app.get('env'));
  console.log('Hit Ctrl+C to stop\n');
});

module.exports = app;
