const express= require("express")
const colors= require('colors')
const dotenv= require("dotenv").config()
const dbconnect=require("./config/db")

dbconnect()
const app = express()






const port= process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`The server is running on ${port} port`.bgGreen.white)
})
