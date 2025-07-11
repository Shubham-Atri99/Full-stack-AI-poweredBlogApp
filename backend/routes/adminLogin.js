import express from "express";
import { adminloginHandler, approveCommentbyId, dashboardData, deleteComment, showAllBlogs, showAllcomments } from "../cantroller/adminLoginhandler.js";

const adminRouter=express.Router();

adminRouter.post("/login",adminloginHandler)
adminRouter.get("/comments",showAllcomments)
adminRouter.get("/blogs",showAllBlogs)
adminRouter.post("/delete-comment",deleteComment)
adminRouter.post("/approve-comment",approveCommentbyId)
adminRouter.get("/dashboard",dashboardData)



export default adminRouter;

