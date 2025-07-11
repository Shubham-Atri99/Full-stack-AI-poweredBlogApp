import express from "express";
import { addBlog, addComment, deleteBlogbyId, displayBlogbyId, generateContent, getblogComment, listAllblogs, togglepublish } from "../cantroller/Blogcantroller.js";
import upload from "../middlewares/Image.js";
import auth from "../middlewares/auth.js";

const blogrouter=express.Router();

blogrouter.post("/add",upload.single('image'),auth,addBlog);
blogrouter.get("/all",listAllblogs);
blogrouter.get("/:BlogId",displayBlogbyId)
blogrouter.post("/delete",auth,deleteBlogbyId);
blogrouter.post("/toggle-publish",togglepublish);
blogrouter.post("/add-comment",addComment)
blogrouter.post("/comments",getblogComment)
blogrouter.post("/generate",auth,generateContent)

export default blogrouter;