
const express = require('express');
const router = express.Router();
const mongoose= require('mongoose');
const models= require('../models');

/* GET users listing. */
var passport = require('passport');

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;



passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  models.Profile.findById(id, function(err, user) {
    done(err, user);
  });
});

let redirect;
if(process.env.NODE_ENV=== 'production'){
  console.log('isproduction')
  redirect= '/';
}
else{
  redirect='http://localhost:3000'
}


passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "https://voting-app-armadillo.herokuapp.com/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {

console.log(profile);

       models.Profile.findOne({ googleId: profile.id }, function (err, user) {
         if (err){ return (done(err))  
        }
        if(!user){
          const newUser= new models.Profile({
            name: profile.displayName,
            avatar: profile.photos[0].value,
            voted:[],
            polls: [],
            googleId: profile.id
           });
        
            models.Profile.create(newUser);
            return done(err,newUser);
        }
       
         return done(err, user);
       });
  }
));


router.get('/google',passport.authenticate('google', { scope: ['profile'] ,prompt: 'select_account' }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: redirect }),
  function(req, res) {
    
    res.redirect(redirect);
  });


  router.get('/logout', function(req, res){
    req.session.destroy();
    req.logout();
    res.redirect('../');
  });


module.exports = router;
