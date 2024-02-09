import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import toast from "react-hot-toast";

const BlogDetails = () => {
  const [inputs, setInputs] = useState({});
  const [blog, setBlog] = useState({});
  const id = useParams().id;
  const navigate = useNavigate();

  //get blog details
  const getBlogDetail = async () => {
    try {
      const instance = axios.create({
        baseURL: "http://localhost:5000",
      });
      const { data } = await instance.get(`/api/v1/blog/get-blog/${id}`);
      if (data?.success) {
        setBlog(data.blog);
        setInputs({
          title: data.blog?.title,
          description: data.blog?.description,
          image: data.blog?.image,
        });
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogDetail();
  }, [id]);
  console.log(blog);

  //input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  //form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const instance = axios.create({
        baseURL: "http://localhost:5000",
      });
      const { data } = await instance.put(`/api/v1/blog/update-blog/${id}`, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: localStorage.userId,
      });
      if (data?.success) {
        toast.promise("Blog Updated");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data?.message);
    }
    console.log(inputs);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          width={"60%"}
          border={3}
          borderRadius={10}
          padding={3}
          margin={"auto"}
          boxShadow={"10px 10px 20px #ccc"}
          display={"flex"}
          flexDirection={"column"}
          marginTop={"30px"}
        >
          <Typography
            variant="h2"
            textAlign={"center"}
            fontWeight="bold"
            padding={3}
            color={"gray"}
          >
            Modify the Post
          </Typography>

          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Title
          </InputLabel>
          <TextField
            name="title"
            value={inputs.title}
            margin="normal"
            variant="outlined"
            onChange={handleChange}
            required
          ></TextField>

          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Description
          </InputLabel>
          <TextField
            name="description"
            value={inputs.description}
            margin="normal"
            variant="outlined"
            onChange={handleChange}
            required
          ></TextField>

          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Image URL
          </InputLabel>
          <TextField
            name="image"
            value={inputs.image}
            margin="normal"
            variant="outlined"
            onChange={handleChange}
            required
          ></TextField>

          <Button type="submit" color="warning" variant="contained">
            Update
          </Button>
        </Box>
      </form>
    </>
  );
};

export default BlogDetails;
