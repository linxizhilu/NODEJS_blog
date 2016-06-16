// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var replyData = new Schema({
      reply_comment: {type:Schema.Types.ObjectId,ref:'commentData'},
      reply_author:{type:String,require:true},
      reply_created:{type:Date,default:Date.now},
      reply_content:{type:String,require:true}
    });

mongoose.model('replyData', replyData);
