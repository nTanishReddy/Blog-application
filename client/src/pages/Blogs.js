import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import toast from "react-hot-toast";
const Blogs = () => {
  const [blogs, setBlogs] = useState();
  //get blogs
  const getAllBlogs = async () => {
    try {
      const instance = axios.create({
        baseURL: "http://localhost:5000",
      });
      const { data } = await instance.get("/api/v1/blog/all-blogs");
      if (data && data.success) {
        const arr = data.blogs;
        const sortedarr = arr.sort((a, b) => {
          return new Date(b.updatedAt) - new Date(a.updatedAt);
        });
        setBlogs(sortedarr);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data?.message);
    }
  };
  useEffect(() => {
    getAllBlogs();
  }, []);
  return (
    <div>
      {blogs &&
        blogs.map((blog) => (
          <BlogCard
            id={blog._id}
            isUser={localStorage.getItem("userId") === blog.user?._id}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            username={blog.user?.username}
            time={blog.createdAt}
          />
        ))}
    </div>
  );
};

export default Blogs;
