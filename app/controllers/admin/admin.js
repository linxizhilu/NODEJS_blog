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
  title = 'NODEJS后台管理系统';

var applocal = null;
var pageBaseUrl = '/admin?';
module.exports = function (app) {
  app.use('/admin', router);
  applocal = app;
};
router.get('/', function (req, res, next) {
  var options={},category;
  pageSize = applocal.get('adminPageSize')
  pageNum = req.query.pageNum || pageNum;
  if(!!(category = req.query['post_category'])){
    pageBaseUrl = '/admin?post_category='+category+'&&pageNum='
    categoryData.findOne({name:category},function(err,category){
      if(err)next(err);
      if(category){
        options['post_category'] = category;
        postFind(options);
      }else{
        res.jsonp(category)
      }
    })
  }else{
    pageBaseUrl = '/admin?pageNum='
    postFind({});
  }

  function postFind(options){
    postData.count(options,function(err,count){
      if(err)next(err);
      postTotalCount = count;
      pageTotal = Math.ceil(postTotalCount/pageSize);
      var skipNum = (pageNum-1)*pageSize;
      postData.find(options)
        .skip(skipNum)
        .limit(pageSize)
        .sort({'post_created':-1})
        .populate('post_author')
        .populate('post_category')
        .exec(function(err,posts){
          if(err)next(err);
          if(!!posts&&posts.length>0){
            applocal.set('posts',posts);
            res.render('admin/index',{
              title:'NODEJS后台管理',
              posts:posts,
              pageTotal:pageTotal,
              pageNum : parseInt(pageNum),
              pageBaseUrl:pageBaseUrl,
              activeItem:'查看文章列表'
            })
          }else{
            res.jsonp(posts);
          }

        })
    })
  }

});
//更新文章
var updateCategoryName = null;
router.get('/post/update',function(req,res,next){
  var postId = req.query.postid;
  postData.findOne({_id:postId})
  .populate('post_author')
  .populate('post_category')
  .exec(function(err,post){
    if(err)next(err);
    updateCategoryName = post.post_category.name;
    res.render('admin/edit_post',{
      title:'NODEJS后台管理',
      smallTitle:'文章编辑',
      post:post
    })
  })
})
router.post('/post/update',function(req,res,next){
  var postId = req.query.postid;
  var postCategory = req.body.post_category;
  var postTitle = req.body.post_title;
  var postSource = req.body.post_source;
  var postContent = req.body.post_content;
  if(updateCategoryName == postCategory){
    postUpdate()
  }else{
    categoryData.findOne({name:postCategory},function(err,category){
      postUpdate(category)
    })
  }

  function postUpdate(category){
    if(!!category){
      postData.findOneAndUpdate({_id:postId},{
        $set:{
          post_title:postTitle,
          post_slug:slug(postTitle),
          post_source:postSource,
          post_content:postContent,
          post_category:category,
          post_lastmodified:new Date()
        }
      },function(err,data){
        if(err)next(err);
        /*postData.findOne({_id:postId},function(err,post){
          if(err)next(err);
          res.jsonp(post);
        })*/
        res.redirect('/admin/')
      })
    }else{
      postData.findOneAndUpdate({_id:postId},{
        $set:{
          post_title:postTitle,
          post_slug:slug(postTitle),
          post_source:postSource,
          post_content:postContent,
          post_lastmodified:new Date()
        }
      },function(err,data){
        if(err)next(err);
      /*  postData.findOne({_id:postId},function(err,post){
          if(err)next(err);
          res.jsonp(post);
        })*/
        res.redirect('/admin/')
      })
    }

  }


})
//删除文章
router.get('/post/delete',function(req,res,next){
  var postId = req.query.postid;
  postData.remove({_id:postId},function(err,data){
    if(err)next(err);
    res.redirect('/admin/');
  })
})
//添加文章
router.get('/post/add',function(req,res,next){
  res.render('admin/add_post',{
    title:title,
    smallTitle:'添加文章',
    activeItem:'添加文章'
  })
})
router.post('/post/add',function(req,res,next){
  var category = req.body.post_category,
      title = req.body.post_title,
      source = req.body.post_source,
      content = req.body.post_content,
      created = new Date(),

      author = applocal.get('loginUser')||'luq';
      var slugTitle = slug(title);

      categoryData.findOne({name:category},function(err,category){
        if(err)next(err);
        userData.findOne({user_name:author},function(err,authorObj){
          if(err)next(err);
          var post = new postData({
            post_title:title,
            post_category:category,
            post_source:source,
            post_slug:slugTitle,
            post_content:content,
            post_created:created,
            post_author:authorObj
          })
          post.save(function(err,data){
            if(err)next(err);
            res.redirect('/admin');
          })
        })
      })
})























