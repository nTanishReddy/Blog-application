import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import toast from "react-hot-toast";
const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  //get user blogs
  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem("userId");
      const instance = await axios.create({
        baseURL: "http://localhost:5000",
      });
      const { data } = await instance.get(`/api/v1/blog/user-blog/${id}`);
      if (data?.success) {
        const arr = data.userBlog.blogs;
        const sortedarr = arr.sort((a, b) => {
          return new Date(b.updatedAt) - new Date(a.updatedAt);
        });
        setBlogs(sortedarr);
        // setBlogs(data?.userBlog.blogs);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      // toast.error(error.response.data?.message);
    }
  };
  useEffect(() => {
    getUserBlogs();
  }, []);
  return (
    <div>
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
          <BlogCard
            id={blog._id}
            isUser={true}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            username={blog.user?.username}
            time={blog.createdAt}
          />
        ))
      ) : (
        <h1>You have not yet posted any blog</h1>
      )}
    </div>
  );
};

export default UserBlogs;
