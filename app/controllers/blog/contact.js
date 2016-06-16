var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    slug = require('slug'),
    categoryData = mongoose.model('categoryData'),
    userData = mongoose.model('userData'),
    postData = mongoose.model('postData'),
    commentData = mongoose.model('commentData');

module.exports = function (app) {
  app.use('/contact', router);
};
router.get('/', function (req, res, next) {
    res.render('blog/about', {
      title: 'NODEJS_联系我'
    })
});
