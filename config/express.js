var express = require('express');
var glob = require('glob');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var methodOverride = require('method-override');
var moment = require('moment');
var truncate = require('truncate-middle');
//引入数据库操作包
var mongoose = require('mongoose');
//mongoose.set('debug',true);

var categoryData = mongoose.model('categoryData');
var userData     = mongoose.model('userData');
module.exports = function(app, config) {
  var env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == 'development';

  app.set('views', config.root + '/app/views');
  app.set('view engine', 'jade');
  app.set('pageSize',5);
  app.set('adminPageSize',15);
  app.use(function(req,res,next){
    app.locals.pageName = req.path;
    app.locals.timeFormat = moment;
    app.locals.truncate = truncate;
    app.locals.logined = app.get('logined');
    next();
  })
  app.use(function(req,res,next){
    categoryData.find(function(err,categorys){
      if(err)next(err);
      app.locals.categorys = categorys;
      userData.find(function(err,authors){
        if(err)next(err);
        app.locals.post_authors = authors;
        next();
      })
    })
  })


  // app.use(favicon(config.root + '/public/img/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser());
  app.use(compress());
  app.use(express.static(config.root + '/public'));
  app.use(methodOverride());

  var controllers = glob.sync(config.root + '/app/controllers/**/*.js');
  controllers.forEach(function (controller) {
    require(controller)(app);
  });
  app.use(function (req, res, next) {
   /*res.jsonp(req.query);*/
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  if(app.get('env') === 'development'){
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err,
        title: 'error'
      });
    });
  }

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
      });
  });

};
