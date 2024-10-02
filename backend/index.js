const express = require("express")
const cors=require("cors")
const mongooes=require("mongoose")
const app=express()
require('dotenv').config();

app.use(cors())
app.use(express.json({limit:"10mb"}))
const port=process.env.PORT || 8080

//MONGODB CONNECTON
const apiUrl = import.meta.env.VITE_API_URL;
console.log(apiUrl)

app.get("/",(req,res)=>{
   res.send("Server is running ")
}),
app.post("/signup",(req,res)=>{
   console.log(req.body)
})

app.listen(port,()=>console.log(`Server is running on ${port}`))


