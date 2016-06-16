// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var commentData = new Schema({
      comment_post: {type:Schema.Types.ObjectId,ref:'postData'},
      comment_author:{type:String,require:true},
      comment_created:{type:Date,default:Date.now},
      comment_content:{type:String,require:true}
    });

mongoose.model('commentData', commentData);
