// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var userData = new Schema({
  user_name: {type:String,require:true},
  user_account: {type:String,require:true},
  user_password: {type:String,require:true},
  user_created:{type:Date,default:Date.now}
});
/*var ArticleSchema = new Schema({
  title: String,
  url: String,
  text: String
});

ArticleSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });*/

mongoose.model('userData', userData);
/*mongoose.model('ArticleSchema', ArticleSchema);*/
