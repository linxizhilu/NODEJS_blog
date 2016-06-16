var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  userData = mongoose.model('userData'),
  postData = mongoose.model('postData'),
  slug = require('slug'),
  categoryData = mongoose.model('categoryData'),
  commentData = mongoose.model('commentData'),
  postObj = null,
  prePostObj = null,
  nextPostObj = null,
  title=null;
var applocal = null;

module.exports = function (app) {
  app.use('/view', router);
  applocal = app;
};
router.get('/', function (req, res, next) {
    var logined = applocal.get('logined');
      title = req.query.title;
       postData
      .findOne({'post_slug':title})
      .populate('post_author')
      .populate('post_category')
      .exec(function(err,post){
        if(err)next(err);
        //根据本篇的索引，查出上一篇文章的索引
        postData.findOne({'post_index':post.post_index-1},function(err,prePost){
          if(err)next(err);
          postData.findOne({'post_index':post.post_index+1},function(err,nextPost){
            if(err)next(err);
            commentData.find({comment_post:post},function(err,comments){
              if(err)next(err);
              postObj = post;
              prePostObj = prePost;
              nextPostObj = nextPost;
              res.render('blog/view', {
                title: 'NODEJS_全栈系统',
                post:post,
                prePost:prePost,
                nextPost:nextPost,
                comments:comments,
               // logined:logined
              });
            })
          })
        })
      })
});
router.post('/',function(req,res,next){
  var comment_author = req.body.useraccount;
  var comment_content=req.body.usercontent;
  var comment = new commentData({
    comment_post:postObj,
    comment_author:comment_author,
    comment_content:comment_content,
    comment_created:new Date()
  })

  comment.save(function(err){
    if(err)next(err)
  commentData.find({comment_post:postObj},function(err,comments){
    if(err)next(err);
     res.redirect('/view?title='+title);
    })
  })
})





























