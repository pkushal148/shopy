import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelpers.js";
import JWT from "jsonwebtoken";

const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;

    //validations
    if (!name) {
      return res.send({ message: "name is required" });
    }
    if (!email) {
      return res.send({ message: "email is required" });
    }
    if (!password) {
      return res.send({ message: "password is required" });
    }
    if (!phone) {
      return res.send({ message: "phone number is required" });
    }
    if (!address) {
      return res.send({ message: "address is required" });
    }
    if (!answer) {
      return res.send({ message: "answer is required" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "user already registered(email)",
      });
    }

    const existingUserPhone = await userModel.findOne({ phone });
    if (existingUserPhone) {
      return res.status(200).send({
        success: true,
        message: "user already registered(phone)",
      });
    }

    //register user
    const hashedPassword = await hashPassword(password);

    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
    }).save();

    return res.status(201).send({
      success: true,
      message: "user registered sccessfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "error in registering",
      error,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(404)
        .send({ success: false, message: "Invalid email or password" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User need to bee registerd first" });
    }

    const confirmPassword = await comparePassword(password, user.password);
    if (!confirmPassword) {
      return res
        .status(200)
        .send({ success: false, message: "Invalid password" });
    }

    const token = await JWT.sign(
      { _id: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "365d" }
    );

    return res.status(200).send({
      success: true,
      message: "Loggedin successfylly",
      user: {
        name: user.name,
        email: user.email,
        address: user.address,
        phone: user.phone,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "login failed",
      error,
    });
  }
};

const forgotPassWordController = async (req, res) => {
  try {
    const { email, answer, newpassword } = req.body;

    // console.log(req.body);
    if (!email) {
      return res
        .status(404)
        .send({ success: false, message: "Email is required" });
    }
    if (!newpassword) {
      return res
        .status(404)
        .send({ success: false, message: "Password is required" });
    }
    if (!answer) {
      return res
        .status(404)
        .send({ success: false, message: "Answer is required" });
    }
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "Wrong Email and Answer" });
    }

    const hashedPassword = await hashPassword(newpassword);

    await userModel.findById(user._id, { password: hashedPassword });

    return res.status(200).send({
      success: true,
      message: "Password changed successfylly",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Question answered wrong",
      error,
    });
  }
};

const testController = (req, res) => {
  console.log("hello");
};
export {
  registerController,
  loginController,
  testController,
  forgotPassWordController,
};
