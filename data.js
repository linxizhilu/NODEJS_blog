var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  output = require('lorem-ipsum'),
  userData = mongoose.model('userData'),
  postData = mongoose.model('postData'),
  slug = require('slug'),
   categoryData = mongoose.model('categoryData');

userData.count({},function(err,count){
    if(count ===0){
      var adminUser = new userData({
        user_name: 'luq',
        user_account: 'luq',
        user_password: '123'
      })
      adminUser.save(function (err, data) {
        if (err)console.log(err);
        userData.find(function (err, data) {
          console.log(data)
        })
      })
    }
  })
  var ary = ['JS','HTML','CSS','NODE'];
  categoryData.count(function(err,count){
    if(count ===0){
      ary.forEach(function(item){
        new categoryData({
          name: item,
          slug:item
        }).save();
      })
      categoryData.find(function(err,data){
        console.log(data);
      })
    }
  })
postData.count(function(err,count){
  if(count ==0){
    userData.findOne(function (err, user) {
      //console.log(user)
      categoryData.find(function(err,categorys){
        var num = 1
        console.log(categorys+'151515')
        categorys.forEach(function(category){
          console.log(category+'sdfsdf')
          for(var i=0;i<20;i++){
            console.log(num)
            var title = output({count:1,units:'sentence'});
            var post = new postData({
              post_title: title,
              post_author:user,
              post_category:category,
              post_content:output({count:30,units:'sentence'}),
              post_slug:slug(title),
              post_meta:{
                fav:0
              },
              post_published:true,
              post_comment:'',
              post_created:new Date(),
              post_index:num++
            })
            post.save(function(err,data){
            });
          }
        })
      })
    })
  }
})

commentData.count(function(err,count){
  if(count ===0){
    postData.find(function(err,posts){
      console.log(posts.length);
      posts.forEach(function(post){
        for(var j=0;j<5;j++) {
          var comment = new commentData({
            comment_post: post,
            comment_author: output({count:6,units:'words'}),
            comment_created:new Date(),
            comment_content: output({count:5,units:'sentence'})
          })
          comment.save(function(){

          });
        }
      })
    })
  }
})

