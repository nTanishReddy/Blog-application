const express = require("express");
const {
  getAllBlogsController,
  createBlogController,
  getBlogByIdController,
  updateBlogController,
  deleteBlogController,
  userBlogController,
} = require("../controller/blogController");

//router object
const router = express.Router();

//routes
//Get all blogs  || GET
router.get("/all-blogs", getAllBlogsController);

//Create blog || POST
router.post("/create-blog", createBlogController);

//GET || get single blog
router.get("/get-blog/:id", getBlogByIdController);

//PUT || update blog
router.put("/update-blog/:id", updateBlogController);

//DELETE || delete blog
router.delete("/delete-blog/:id", deleteBlogController);

//GET || User blog
router.get("/user-blog/:id", userBlogController);

module.exports = router;
