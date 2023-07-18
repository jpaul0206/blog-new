const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//create schema
const blogSchema = new Schema({
    title:{
        type:String,
        required:true
    },

    snippet:{
        type: String,
        required:true
    },

    body:{
        type:String,
        required:true
    }
},{timestamps:true});


//create model for that schema // the first attribute is the singular of the collections name u have made in mongoose
const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;