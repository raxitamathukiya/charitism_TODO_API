const mongoose=require("mongoose")
const connection=require("../db")
const todoSchema=mongoose.Schema({
    Task_name: {type:String,require:true},
    Task_status: {type:String,require:true},
})


const todoModel=mongoose.model("TODO",todoSchema)

module.exports={
    todoModel
}