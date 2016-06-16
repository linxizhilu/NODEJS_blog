var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  slug = require('slug'),
  categoryData = mongoose.model('categoryData'),
  userData = mongoose.model('userData'),
  postData = mongoose.model('postData'),
  commentData = mongoose.model('commentData'),
  pageSize = null,
  pageNum = 1;
  var applocal = null;
  var logined = null;
module.exports = function (app) {
  app.use('/', router);
  app.use('/index', router);
  pageSize = app.get('pageSize');
  applocal = app;
};
router.get('/', function (req, res, next) {
  /*userData.remove({'user_name':''},function(err,data){
    res.jsonp(data)
  })*/
 /* userData.find(function(err,users){
    res.jsonp(users)
  })*/
  //logined = applocal.get('logined');
   pageNum = req.query.pageNum || pageNum;
  postData.count(function(err,count){
    if(err)next(err);
    postTotalCount = count;
    pageTotal = Math.ceil(postTotalCount/pageSize);
    var skipNum = (pageNum-1)*pageSize;
    postData.find()
      .skip(skipNum)
      .limit(5)
      .sort({'post_created':-1})
      .populate('post_author')
      .populate('post_category')
      .exec(function (err, posts) {
        if (err) return next(err);
        res.render('blog/index', {
          title: 'NODEJS_全栈系统',
          posts:posts,
          pageTotal:pageTotal,
          pageNum : parseInt(pageNum)
        });
      });
  })

});
router.get('/about', function (req, res, next) {
  Article.find(function (err, articles) {
    if (err) return next(err);
    res.render('blog/index', {
      title: 'NODEJS_关于我',
      articles: articles
    });
  });
});
router.get('/contact', function (req, res, next) {
  Article.find(function (err, articles) {
    if (err) return next(err);
    res.render('blog/index', {
      title: 'NODEJS_联系我',
      articles: articles
    });
  });
});
