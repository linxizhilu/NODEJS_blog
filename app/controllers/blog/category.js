var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  slug = require('slug'),
  categoryData = mongoose.model('categoryData'),
  userData = mongoose.model('userData'),
  postData = mongoose.model('postData'),
  commentData = mongoose.model('commentData'),
  pageSize = null,
  pageNum = 1,
  category = '';
var applocal = null;

module.exports = function (app) {
  app.use('/category', router);
  pageSize = app.get('pageSize');
  applocal = app;
};
router.get('/', function (req, res, next) {
var logined = applocal.get('logined'),
  pageNum = req.query.pageNum || pageNum,
  category = req.query.category||'',
  author = req.query.author;

  if(!!category ==false && !!author == false){
    categoryData.find(function(err,categorys){
      if(err)next(err);
      userData.find(function(err,authors){
        res.render('blog/category_list',{
          title:'NODEJS_全栈系统',
          categorys:categorys,
          authors:authors,
          logined:logined
        })
      })

    })
  }else if(!!category){
    categoryData.findOne({name: category}, function (err, postCategory) {
      if (err) next(err);
      postData.count({'post_category': postCategory}, function (err, count) {
        if (err) next(err);
        postTotalCount = count;
        pageTotal = Math.ceil(postTotalCount / pageSize);
        var skipNum = (pageNum - 1) * pageSize;
        postData
          .find({'post_category': postCategory})
          .skip(skipNum)
          .limit(5)
          .sort({'post_created': -1})
          .populate('post_author')
          .populate('post_category')
          .exec(function (err, posts) {
            if (err)next(err);
            console.log(posts.length);
            res.render('blog/category', {
              title: 'NODEJS_全栈系统',
              posts: posts,
              pageTotal: pageTotal,
              pageNum: parseInt(pageNum),
              category: category,
              //logined:logined
            })
          })
      })

    })
  }else{
    userData.findOne({user_name:author},function(err,author){
      postData.count({'post_author': author}, function (err, count) {
        if (err) next(err);
        postTotalCount = count;
        pageTotal = Math.ceil(postTotalCount / pageSize);
        var skipNum = (pageNum - 1) * pageSize;
        postData
          .find({'post_author': author})
          .skip(skipNum)
          .limit(5)
          .sort({'post_created': -1})
          .populate('post_author')
          .populate('post_category')
          .exec(function (err, posts) {
            if (err)next(err);
            if(posts&&posts.length>0){
              res.render('blog/category', {
                title: 'NODEJS_全栈系统',
                posts: posts,
                pageTotal: pageTotal,
                pageNum: parseInt(pageNum),
                category: author.user_name,
               // logined:logined
               })
             }else{
              res.render('404',{
                title:'找不到相应的页面'
              });
            }
          })
      })
    })
  }



  /*pageNum = req.query.pageNum || pageNum;
  postData.count(function(err,count){
    if(err)next(err);
    postTotalCount = count;
    pageTotal = Math.ceil(postTotalCount/pageSize);
    var skipNum = (pageNum-1)*pageSize;
    postData.find().skip(skipNum)
      .limit(5)
      .sort({'post_created':-1})
      .populate('post_author')
      .populate('post_category')
      .exec(function (err, posts) {
        if (err) return next(err);
        //return res.jsonp(posts)
        res.render('blog/index', {
          title: 'NODEJS_全栈系统',
          posts:posts,
          pageTotal:pageTotal,
          pageNum : parseInt(pageNum)
        });
      });
  })*/
});

