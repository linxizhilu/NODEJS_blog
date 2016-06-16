var express = require('express'),
    mongoose = require('mongoose'),
    router = express.Router()
    userData = mongoose.model('userData');
    var applocal = null;
module.exports = function (app) {
  app.use('/login', router);
  applocal = app;
};
router.get('/', function (req, res, next) {
  res.render('blog/login',{
    title:'登录页面'
  })
});
router.post('/',function(req,res,next){
  var user_name = req.body.user_name;
  var user_password = req.body.user_password;
  userData.find({user_account:user_name,user_password:user_password},function(err,user){
    if(err)next(err);
    if(user.length>0){
      res.render('blog/login',{
        title:'登录页面',
        errStr:true
      })
    }else{
      applocal.set('logined',true);
      applocal.set('loginUser',user_name);
        res.redirect('/admin')
    }
  })
})
