const mongoose=require("mongoose");
const itemSchema=new mongoose.Schema({
 type:{type:String,enum:["Lost","Found"],required:true},
 itemName:{type:String,required:true,trim:true},
 category:{type:String,required:true,trim:true},
 description:{type:String,required:true,trim:true},
 location:{type:String,required:true,trim:true},
 date:{type:String,required:true},
 contactName:{type:String,required:true,trim:true},
 contact:{type:String,required:true,trim:true}
},{timestamps:true});
module.exports=mongoose.model("Item",itemSchema);