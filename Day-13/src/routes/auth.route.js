const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const crypto = require('crypto')

const Router = express.Router();

Router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const isUserAlreadyExist = await userModel.findOne({ email });

  if (isUserAlreadyExist) {
    return res.status(409).json({
      meassage: "User already exsist with this email try another eamil",
    });
  }

  const hashPassword = crypto.createHash('md5').update(password).digest('hex');

  const user = await userModel.create({ name, email, password:hashPassword });

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("jwt_token", token);

  res.status(201).json({ message: "user created successfully", user, token });
});

Router.post('/login',async (req,res)=>{
  const {email,password} = req.body
 
  const User = await userModel.findOne({email})

  if(!User){
    return res.status(404).json({message:"User not found"})
  }

  const isPasswordMachted = User.password == crypto.createHash('md5').update(password).digest('hex');

  if(!isPasswordMachted){
    return res.status(401).json({message:"Invalid password"})
  }

 const token =  jwt.sign(
    {id:User._id},
    process.env.JWT_SECRET
  )

  res.cookie("jwt_token",token);

  res.status(200).json({message:"User logedin successfully" , User})

})

module.exports = Router;
