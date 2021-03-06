import * as express from 'express';

let passport = require('passport');
let session = require('express-session');
let glob = require('glob');
let path = require('path');

module.exports = (app:express.Express) => {
  // Initialize passport
  app.use(passport.initialize());
  app.use(passport.session());

  enableSessionSelialization();

  // Load strategies
  let strategiesPath = path.normalize(__dirname + '/passport/strategy');
  let auth = glob.sync(strategiesPath + '/*.js');
  auth.forEach(function (routes) {
    require(routes)(app);
  });
};

function enableSessionSelialization() {
  passport.serializeUser( (user:any, callback:any) => {
    callback(null, user);
  });
  passport.deserializeUser( (obj:any, callback:any) => {
    callback(null, obj);
  });
}
