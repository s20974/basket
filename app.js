var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const authApiRouter = require('./routes/api/AuthApiRouer')

// Routes
var indexRouter = require('./routes/index');
var teamsRouter = require('./routes/teamsRoute');
var playersRouter = require('./routes/playersRouer');

// API
var playerApiRouter = require('./routes/api/PlayerApiRoute')
var teamApiRouter = require('./routes/api/TeamApiRoute')

// Session
const session = require('express-session')


// Database
var sequelizeInit = require('./config/sequelize/init')

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
var cors = require('cors');
app.use(cors());

// Session
app.use(session({
  secret: 'my_secret_password',
  resave: false
}));

app.use((req, res, next) => {
  const loggedUser = req.session.loggedUser;
  res.locals.loggedUser = loggedUser;
  if(!res.locals.loginError){
    res.locals.loginError = undefined;
  }

  next();
});

app.use(cookieParser());
app.use(cookieParser('secret'));
// i18n
const i18n = require('i18n');

i18n.configure({
   locales: ['ru', 'en'], 
   directory: path.join(__dirname, 'locales'), 
   objectNotation: true, 
   cookie: 'acme-hr-lang',
});
app.use(i18n.init);
app.use((req, res, next) => {
  if(!res.locals.lang) {
      const currentLang = req.cookies['acme-hr-lang'];
      res.locals.lang = currentLang;
  }
  next();
});


// Routes
app.use('/', indexRouter);
app.use('/teams', teamsRouter);
app.use('/players', playersRouter);

// API
app.use('/api/players', playerApiRouter)
app.use('/api/teams', teamApiRouter)

app.use('/api/auth', authApiRouter)

// Database
sequelizeInit().catch(err => {
  console.log(err);
});


// Temas Form
const jsonParser = express.json();

app.get("/api/teams/:teamId", jsonParser, function(req, res){
  console.log(req.body);
  if(!req.body) return res.sendStatus(400);
  res.json(req.body);
})

// Player form
app.get("/api/players/:playerId", jsonParser, function(req, res){
  console.log(req.body);
  if(!req.body) return res.sendStatus(400);
  res.json(req.body);
})


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));


app.use(function(req, res, next) {
  next(createError(404));
});


app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;