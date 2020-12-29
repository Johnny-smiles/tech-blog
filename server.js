// bringing in express
const express = require('express');
// linking routes 
const routes = require('./controllers');
// linking sequlize
const sequelize = require('./config/connection');
//linking path
const path = require('path');
//linking express
const app = express();
// linking helpers 
const helpers = require('./utils/helpers');

//establising a port
const PORT = process.env.PORT || 3001;

//setting handlebars.js as default template 
const exphbs = require('express-handlebars');
const hbs = exphbs.create({helpers});
// linking handlebars.js to express()
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// linking sessions
const session = require('express-session');
//linking sessions store
const SequelizeStore = require('connect-session-sequelize')(session.Store);
// creating sessions object
const sess = {
  secret: process.env.SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};
// enabling sessions use to express server
app.use(session(sess));

// extending express to use json files
app.use(express.json());
// extending express url fuction
app.use(express.urlencoded({ extended: true }));
// linking public folder with added stylesheets. 
app.use(express.static(path.join(__dirname, 'public')));
// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});