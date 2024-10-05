const express = require("express")// import express
const cors = require("cors") //import cors
const mongooes = require("mongoose") //import mongooes
const app = express()
const dotenv = require("dotenv");//import dot env
dotenv.config();// accessing value from the .env file 
 
app.use(cors()) //use the cores 

//Use the middleware for read the json data
app.use(express.json({ limit: "10mb" }))
//port define 
const PORT = process.env.PORT || 5000;// defining the port 
//MONGODB CONNECTON
console.log(process.env.MONGODB_URL)
mongooes.connect(process.env.MONGODB_URL)
   .then(() => console.log("Connect to database"))//connect to database
   .catch((err) => console.log(err))// error is displayed
//user schema
const userSchema = mongooes.Schema({
   firstName: String,
   lastName: String,
   email: {
      type: String,
      unique: true
   },
   password: String,
   conformPassword: String,
   image: String
})
//user model
const userModel =mongooes.model("user",userSchema)


app.get("/", (req, res) => {
   res.send("Server is running ")
}),
   // Sign up api
   app.post("/signup", (req, res) => {
      console.log(req.body)
      const {email}=req.body// access email from frontend
      userModel.findOne({email:email},(result,err)=>{
         console.log(result)
         console.log(err)
         //Check email is available or not 
         if(result){
            res.send({message:"email id is already register",alert:false})
         }
         else{
            const data= userModel(req.body)
            const save = data.save()  
            res.send({message: "Successfully sign up",alert:true})
         }

      })
   });

   //Login api
   app.post("/login",(req,res)=>{
      console.log(req.body)
      const {email}=req.body;
       userModel.findOne({email:email},(result,err)=>{
         if(result){
   
           const datasend ={
            _id:result._id,
            firstName:result.firstName,
            lastName:result.lastName,
            email:result.email,
            image:result.image,
           };
           console.log(datasend)
           res.send({message:"login is successfully",alert:true,data : datasend});
         }
         else{
            res.send({message:"Email is not register, please signup ",alert:false,});

         }
       })
   })


//product schema
const ProductSchema = mongooes.Schema({
   name: String,
   category: String,
   iamge: String,
   price: String,
   description: String,
});
//product model
const ProductModel = mongooes.model("Product", ProductSchema);

//save new Product api
app.post("/uploadProduct", (req, res) => {
   console.log(req.body);
})

app.listen(PORT, () => console.log(`Server is running on ${PORT}`))


