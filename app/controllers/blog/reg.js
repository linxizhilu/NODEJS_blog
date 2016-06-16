var express = require('express'),
    mongoose = require('mongoose'),
    router = express.Router()
    userData = mongoose.model('userData');
module.exports = function (app) {
  app.use('/reg', router);
};
router.get('/', function (req, res, next) {
  res.render('blog/reg',{
    title:'注册页面'
  })
});
router.post('/',function(req,res,next){
  var user_name = req.body.user_name;
  var user_password = req.body.user_password;
  userData.find({user_account:user_name},function(err,user){
    if(err)next(err);
    if(user.length>0){
      res.render('blog/reg',{
        title:'注册页面',
        hasReged:true
      })
    }else{
       var user = new userData({
         user_name:user_name,
         user_account:user_name,
         user_password:user_password,
         user_created: new Date()
       })
      user.save(function(err,newuser){
        if(err)next(err);
        console.log(newuser)
        res.render('blog/reg',{
          title:'注册页面',
          regSuc:true
        })
      })
    }
  })
})
