const { response } = require('express');
const User = require('../models/users');
module.exports.profile = (request, response) => {
  return response.render('profile', {
    title: 'User Profile',
  });
};

// Render Sign Up Form page

module.exports.signUp = (request, response) => {
  return response.render('user_sign_up', {
    title: 'User Sign Up',
  });
};

// Render Sign In form Page

module.exports.signIn = (request, response) => {
  return response.render('user_sign_in', {
    title: 'User Sign In',
  });
};

// Get the sign Up data from the form and create a user in database

module.exports.createUser = (request, response) => {
  if (request.body.password != request.body.confirm_password) {
    return response.redirect('back');
  }
  User.findOne({ email: request.body.email }, function (err, user) {
    if (err) {
      console.log('Error in finding the user');
      return;
    }
    if (!user) {
      User.create(request.body, function (err, user) {
        if (err) {
          console.log('Error in creating the User');
          return;
          }
  request.flash('success', 'User created Succesfully');
          
        return response.redirect('/users/sign-in');
      });
    } else {
      return response.redirect('back');
    }
  });
};

module.exports.createSession = (request, response) => {
  request.flash('success', 'logged in Succesfully');
  return response.redirect('/');
};

module.exports.destroySession = (request, response) => {
  request.logout();
  request.flash('success', 'Sign Out Succesfully');
  return response.redirect('/');
};
