const express=require("express")
const {connection}=require("./db")
const {todoRoute}=require("./route/todo.route")
const {loginRoute}=require("./route/login.route")
const cors=require("cors")
require ('dotenv').config()
const app=express()
app.use(express.json())
app.use(cors())
 app.get("/",async(req,res)=>{
      try {
         res.json('welcome to the TODO API')
      } catch (error) {
         console.log(error)
      }
 })
 app.use("/auth",loginRoute)
app.use("/todo",todoRoute)

app.listen(process.env.port,async()=>{
   try {
    await connection
    console.log("coneect to the db")
   } catch (error) {
    console.log(error)
   }
   console.log("server is running")
})

