const express=require("express")
const todoRoute=express.Router()
const {todoModel}=require("../model/todo.model")
const {connection}=require("../db")
require ('dotenv').config()
const {authMiddleware}=require('../middleware/auth.middleware')

todoRoute.post("/create",authMiddleware,async(req,res)=>{
    try {
        const data=req.body
        const add=new todoModel(data)
        await add.save()
        res.status(200).json({message:"New data added"})
    } catch (error) {
        console.log(error)
    }
})
todoRoute.put("/update/:id",authMiddleware,async(req,res)=>{
    try {
        const {id}=req.params 
        const update_data=req.body
        let data=await todoModel.findByIdAndUpdate({_id:id},update_data)
        res.status(200).json({message:'Data Update'})
    } catch (error) {
        console.log(error)
    }
})
todoRoute.delete("/delete/:id",authMiddleware,async(req,res)=>{
    try {
        const {id}=req.params 
    let data=await todoModel.findByIdAndDelete({_id:id})
    res.status(200).json({message:'Data deleted'})
    } catch (error) {
        console.log(error)
    }
})

todoRoute.get("/get",authMiddleware,async(req,res)=>{
    try {
        
    let data=await todoModel.find()
    res.status(200).json(data)
    } catch (error) {
        console.log(error)
    }
})


module.exports={
    todoRoute
}