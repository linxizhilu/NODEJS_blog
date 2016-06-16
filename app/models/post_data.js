// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var postData = new Schema({
  post_title: {type:String,require:true},
  post_author:{type:Schema.Types.ObjectId,ref:'userData'},
  post_category:{type:Schema.Types.ObjectId,ref:'categoryData'},
  post_content:{type:String,require:true},
  post_slug:{type:String,require:true},
  post_meta:{
    fav:{type:Number,default:0}
  },
  post_published:{type:Boolean,default:false},
  post_created:{type:Date,default:Date.now},
  post_lastmodified:{type:Date},
  post_commentnum:{type:Number,default:0},
  post_index:{type:Number,default:0},
  post_source:{type: String}
});

mongoose.model('postData', postData);
