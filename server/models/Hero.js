const mongoose = require("mongoose")



const schema = new mongoose.Schema({
  name:{type:String},
  avatar:{type:String},
  title:{type:String},
  categories:[{type:mongoose.SchemaTypes.ObjectId,ref:"Category"}],
  scores:{
    difficult:{type:Number},
    skill:{type:Number},
    attack:{type:Number},
    survive:{type:Number},
  },
  skills:[{
    icon:{type:String},
    name:{type:String},
    description:{type:String},
    tips:{type:String}
  }],
  // 这里我们的装备也是关联到物品的那个表里面的，所以这里不能单纯的定义类型，而是要定义成关联字段
  items1:[{type:mongoose.SchemaTypes.ObjectId,ref:"Item"}],
  items2:[{type:mongoose.SchemaTypes.ObjectId,ref:"Item"}],
  usageTips:{type:String},
  batterTips:{type:String},
  teamTips:{type:String},
  partners:[{
    hero:{type:mongoose.SchemaTypes.ObjectId,ref:"Hero"},
    description:{type:String}
  }]
})


module.exports = mongoose.model("Hero",schema)