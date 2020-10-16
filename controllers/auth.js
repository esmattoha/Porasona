const crypto = require('crypto');

const bcrypt = require('bcryptjs');

const User = require('../models/users');



exports.getLogin = (req, res, next) => {
  res.render('auth/login.ejs', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated:req.session.isLoggedIn
  });
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup.ejs', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthenticated:req.session.isLoggedIn
  });
};

exports.postLogin = (req, res, next) => {

  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
       res.send('user does not find!!')
      }
      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => {
              console.log(err);
              res.redirect('/');
            });
          }
          
        })
        .catch(err => {
          console.log(err);
          res.redirect('/login');
        });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  bcrypt
    .hash(password, 12)
    .then(hashedPassword => {
      const user = new User({
        email: email,
        password: hashedPassword
      });
      return user.save();
    })
    .then(result => {
      res.redirect('/login');
      
    })
    .catch(err => {
     console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};




