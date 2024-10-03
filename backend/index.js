const express = require("express")// import express
const cors=require("cors") //import cors
const mongooes=require("mongoose") //import mongooes
const app=express()
const dotenv =require("dotenv");
dotenv.config();
// require('dotenv').config(); // accessing value from the .env file 
app.use(cors()) //use the cores 

//Use the middleware for read the json data
app.use(express.json({limit:"10mb"}))

const PORT =process.env.PORT || 5000;// defining the port 



//MONGODB CONNECTON

app.get("/",(req,res)=>{
   res.send("Server is running ")
}),
app.post("/signup",(req,res)=>{
   console.log(req.body)
})

app.listen(PORT,()=>console.log(`Server is running on ${PORT}`))


