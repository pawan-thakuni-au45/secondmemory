import express from "express"
import { contentModel } from "./model"
import mongoose from "mongoose"

const app=express()
app.use(express.json())
mongoose.connect('mongodb+srv://thakunipawan:<db_password>@cluster0.f7a9c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
app.post('/content',(req,res)=>{
    const {title,description}=req.body
    const content=contentModel.create({
        title:title,
        discription:description
    })
    return res.json({
        content,
        message:"content is created "
    })
})

app.get('/getallcontent',(req,res)=>{
    const user=userId;
    const content=contentModel.find({
        user
    })
    res.json({
        content
    })
})
app.listen(4000)