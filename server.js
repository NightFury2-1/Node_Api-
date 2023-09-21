const express = require("express")
const app=express()

app.get("/hello",(req,res)=>{
  res.send("Hello Arif ")
})

app.listen(3000, ()=>{
    console.log("node api ")
})