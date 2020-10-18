const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongose = require('mongoose');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');

const errorController = require('./controllers/error');


const User = require('./models/users');

const MONGODB_URI =
  'mongodb+srv://newPro:626626@cluster0.2mnel.mongodb.net/Porasona';

  

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

const csrfProtection = csrf();

const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');


app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use( 
  session({
  secret: 'my secret',
  resave: false,
  saveUninitialized: false,
  store: store 
  })
);
app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn ;
  res.locals.csrfToken = req.csrfToken();
  next();
});
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch(err => {
      next(new Error(err));
    });
});

app.use('/admin' , adminRoutes);
app.use( authRoutes);
app.use(userRoutes);
app.get('/500', errorController.get500);
app.use(errorController.get404);

mongoose
  .connect(MONGODB_URI)
  .then(result => {
    app.listen(6060);
  })
  .catch(err => {
    console.log(err);
  });
