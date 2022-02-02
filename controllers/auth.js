const { error } = require('console');
const User = require('../models/user')

exports.getLogin = (req, res, next) => {
      res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: false
      })
  };


exports.postLogin = (req, res, next) => {
  
  User.findById('61f59a417c527364988fc425')
    .then(user => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save((err) => {
        console.log(err)
        res.redirect('/')
      })
    })
    .catch(err => console.log(error))
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err)
    res.redirect('/')
  });
  User.findById('61f59a417c527364988fc425')
    .then(user => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      res.redirect('/')
    })
    .catch(err => console.log(error))
};