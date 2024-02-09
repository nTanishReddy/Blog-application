const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

//create or register user
exports.registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //validation
    if (!username || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please fill all fields",
      });
    }

    //checking user exists or not
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(401).send({
        success: false,
        message: "User already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    //save new user if not exists
    const user = new userModel({ username, email, password: hashedPassword });
    await user.save();
    return res.status(201).send({
      success: true,
      message: "New User Created",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error in register callback",
      success: false,
      error,
    });
  }
};

//get all users from database
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    return res.status(200).send({
      userCount: users.length,
      success: true,
      message: "All users data",
      users,
    });
  } catch (error) {
    console.loge(error);
    return res.status(500).send({
      success: false,
      message: "Error in  Get All users",
      error,
    });
  }
};

//user login
exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please provide email or password",
      });
    }

    //finding user is registered or not
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "User is not registered on platform",
      });
    }
    //password verification
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invalid Username or Password",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Logged in successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Login Callback",
      error,
    });
  }
};
