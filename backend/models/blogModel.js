import mongoose, { mongo, Schema } from "mongoose";
import { type } from "os";

const blogSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    subTitle:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    catergory:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true
    },
    isPublished:{
        type:Boolean,
        required:true,
    }

},{timestamps:true})

const Blog=mongoose.model('blog',blogSchema);
export default Blog;