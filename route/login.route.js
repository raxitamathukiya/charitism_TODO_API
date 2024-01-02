const express=require("express")
const loginRoute=express.Router()
const {loginModel}=require("../model/login.model")
const {connection}=require("../db")
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
require ('dotenv').config()

loginRoute.post('/register',async(req,res)=>{
    try {
        const { name,email,password } = req.body;
    bcrypt.hash(password, 10, async(err, hash)=> {
      const adddata=new loginModel({name,email,password:hash })
      await adddata.save()
      res.status(200).json({ msg: 'User created successfully' });
  });
} 
     catch (error) {
        console.log(error)
    }
})

loginRoute.post('/login',async(req,res)=>{
    try {
        const { email, password } = req.body;
        const user = await loginModel.findOne({ email }); 
        if (!user) {
          return res.status(401).json({ msg: 'Invalid Credentials' });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
          return res.status(401).json({ msg: 'Invalid Credentials' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.SecretKey, {
          expiresIn: '7d'
        });
        res.status(200).json({ msg: 'Login Successfully' ,token:token,userid:user._id});
    } catch (error) {
        console.log(error)
    }
})

module.exports={
    loginRoute
}