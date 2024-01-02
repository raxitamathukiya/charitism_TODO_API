const mongoose=require("mongoose")
const connection=require("../db")
const loginSchema=mongoose.Schema({
    name: {type:String,require:true},
    email: {type:String,require:true},
    password:{type:String,require:true}
})


const loginModel=mongoose.model("Login",loginSchema)

module.exports={
    loginModel
}