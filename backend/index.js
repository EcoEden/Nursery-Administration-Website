const express = require("express")
const cors=require("cors")
const mongooes=require("mongoose")
const app=express()
require('dotenv').config();



app.use(cors())
app.use(express.json({limit:"10mb"}))
const PORT = process.env.PORT || 5000;

//MONGODB CONNECTON


app.get("/",(req,res)=>{
   res.send("Server is running ")
}),
app.post("/signup",(req,res)=>{
   console.log(req.body)
});


//Product Section 
const ProductSchema=mongooes.Schema({
   name: String,
   category: String,
   iamge: String,
   price:String,
   description: String,
});
const ProductModel=mongooes.model("ProductModel",ProductSchema);

//save new Product api
app.post("uploadProduct",(req,res)=>{
   res.send(                                                                                          )
})

app.listen(PORT,()=>console.log(`Server is running on ${PORT}`))


