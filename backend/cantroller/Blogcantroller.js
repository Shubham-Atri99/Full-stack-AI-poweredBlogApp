import ImageKit from "imagekit";
import Blog from "../models/blogModel.js";
import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import comment from "../models/Comments.js";
import main from "../gemini.js";


const imagekit = new ImageKit({
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGE_KIT_URL_ENDPOINT,
});

export const addBlog = async (req, res) => {
  try {
    const {
      title,
      subTitle,
      description,
      catergory,
      isPublished,
    } = JSON.parse(req.body.blog);

    const imageFile = req.file;

    if (!title || !description || !catergory || !imageFile) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const fileBuffer = fs.readFileSync(imageFile.path);

    const uploadResponse = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blogs",
    });

    fs.unlinkSync(imageFile.path);

    const image = imagekit.url({
      path: uploadResponse.filePath,
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: "1280" },
      ],
    });

    await Blog.create({
      title,
      subTitle,
      description,
      catergory,
      image,
      isPublished,
    });

    res.json({ success: true, message: "Blog added successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const listAllblogs= async  (req,res)=>{
  try {
    const blogs= await Blog.find({isPublished:true})
    res.json({success:true,blogs})
  } catch (error) {
    res.json({success:false,message:error.message})
  }
}

export const displayBlogbyId = async (req, res) => {
  try {
    const { BlogId } = req.params;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(BlogId)) {
      return res.status(400).json({ success: false, message: "Invalid Blog ID format" });
    }

    const blog = await Blog.findById(BlogId);

    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    res.json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const deleteBlogbyId=async(req,res)=>{
  try {
    const {id}=req.body;
    const blog= await Blog.findByIdAndDelete(id)
    //delete all comments
    await comment.deleteMany({blog:id})
    
     res.json({success:true,message:"blog deleted sucessfully"})
  } catch (error) {
     res.json({success:false,message:error.message})
  }
}

export const togglepublish=async(req,res)=>{
  try {
    const {id}=req.body;
  const blog=await Blog.findById(id);
  blog.isPublished=!blog.isPublished;
    await blog.save({ validateBeforeSave: false });
  

  res.json({success:true,message:"status updated"})
  } catch (error) {
    res.json({success:true,message:error.message})
  }

}

export const addComment= async(req,res)=>{
  try {
    const {blog,name,content}=req.body;
  await comment.create({
    blog,name,content
  });
  res.json({success:true,message:"comment added for reveiew"})
  } catch (error) {
    res.json({success:false,message:error.message})
  }
}

export const getblogComment= async(req,res)=>{
  try {
    const {blogId}=req.body;
    const comments= await comment.find({blog:blogId,isApproved:true}).sort({createdAt:-1})
    res.json({success:true,comments})
  } catch (error) {
     res.json({success:false,message:error.message})
  }
}

export const generateContent=async(req,res)=>{
  try {
    const {prompt}=req.body
    const content=await main(prompt+'generate a blog content for this topic in simple text format')
    res.json({success:true,content})
  } catch (error) {
    res.json({success:false,message:error.message})
  }
}