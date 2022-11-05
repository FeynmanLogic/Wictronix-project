const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const blogSchema=new Schema({
title:{
    type:String,
    required:true
},
snippet:{
    type:String,
    required:true
}

},{timestamps:true});
const Blog=mongoose.model('Blog',blogSchema);//name of the argument is important as it will
                                //pluralize it and then look for that collection.
module.exports=Blog;