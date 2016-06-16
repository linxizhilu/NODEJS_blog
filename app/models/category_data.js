// category model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var categoryData = new Schema({
  name: {type:String,require:true},
  slug:{type:String,require:true},
  created:{type:Date,default:Date.now}
});
mongoose.model('categoryData', categoryData);
