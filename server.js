const express = require("express")
const mongoose = require("mongoose")
const Product = require("./models/productModel")
const app=express()
app.use(express.json())


app.get("/hello",(req,res)=>{
  res.send("Hello Arif ");
})

app.post("/product",async(req,res)=>{
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message:error.message});
  }
})

app.put("/product/:id",async(req,res)=>{
  try {
    const {id}=req.params;
    const product=await Product.findByIdAndUpdate(id,req.body);
    if(!product){
      res.status(404).json({message:`Cannot update the data with id ${id}`})
    }else{
      const updatedProduct=await Product.findById(id);
      res.status(200).json(updatedProduct);
    }
  } catch (error) {
    res.status(500).json({message:error.message});
  }
})

app.get("/product/:id",async(req,res)=>{
  try {
    const {id}=req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({message:error.message});
  }
})

app.get("/prod",async(req,res)=>{
  try {
    const product=await Product.find({});
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({message:error.message})
  }
})

app.delete("/product/:id", async(req,res)=>{
  try {
    const {id}=req.params;
    const product=await Product.findByIdAndDelete(id);
    if(!product){
      res.status(404).json({message:`Cannot update the data with id ${id}`});
    }else{
      res.status(200).json(product);
    }
  } catch (error) {
    res.status(500).json({message:error.message})
  }
})


mongoose.
connect('mongodb+srv://arifnawas:arifnawas123@cluster0.dca0ccp.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(()=>{
  app.listen(3000, ()=>{
    console.log("node api ")
})
  console.log("Successfully connected to mongodb")
}).catch(()=>{
  console.log(error)
})