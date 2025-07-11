import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";
import Blog from "../models/blogModel.js";
import comment from "../models/Comments.js";

export const adminloginHandler = (req, res) => {
  try {
    const { email, password } = req.body;
    console.log( process.env.AdminEmail,process.env.AdminPass);
    
    if (
      email !== process.env.AdminEmail ||
      password !== process.env.AdminPass
    ) {
      return res.json({
        success: false,
        error: "Invalid credentials",
      });
    }

    const token = jwt.sign({ email }, process.env.secret);
    res.json({ success: true, token });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
export const showAllBlogs= async(req,res)=>{
 try {

   const blogs =await Blog.find({}).sort({createdAt:-1});
   res.json({success:true,blogs})
 } catch (error) {
  res.json({success:false,message:error.message})
 }
  
}
export const showAllcomments= async(req,res)=>{
 try {

   const comments = await comment.find({}).populate("blog").sort({createdAt:-1});
   res.json({success:true,comments})
 } catch (error) {
  res.json({success:false,message:error.message})
 }
  
}

export const dashboardData=async(req,res)=>{
  try {
    const recentblogs= await Blog.find({}).sort({createdAt:-1}).limit(5);
    const blogs= await Blog.countDocuments();
    const comments=  await comment.countDocuments();
    const drafts= await Blog.countDocuments({isPublished:false})
    const dashboardDATA={
      blogs,comments,drafts,
      recentBlogs:recentblogs
    }
    res.json({success:true,dashboardDATA})
  } catch (error) {
    res.json({success:false,message:error.message})
  }
}

export const deleteComment=async(req,res)=>{
  try {
    const {id}=req.body;
    await comment.findByIdAndDelete(id);
res.json({success:true,message:"comment deleted sucessfully"})
  } catch (error) {
    res.json({success:false,message:error.message})
  }
}

export const approveCommentbyId=async(req,res)=>{
  try {
    const {id}=req.body;
    await comment.findByIdAndUpdate(id,{isApproved:true});
res.json({success:true,message:"comment approved"})
  } catch (error) {
    res.json({success:false,message:error.message})
  }
}
