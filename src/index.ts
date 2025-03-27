import express from "express"
import { contentModel, linkModel, userModel } from "./model"
import mongoose from "mongoose"


import jwt from "jsonwebtoken"
import { userMiddlewear } from "./userMiddlewear"
import cors from "cors"
import { Random } from  './utils'
const JWT_SECRET_KEY='GRGREGREGRG'

const app=express()
app.use(express.json())
app.use(cors())
mongoose.connect('mongodb+srv://thakunipawan:mongodb@cluster0.f7a9c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')


app.post('/api/v1/register',async (req,res)=>{
    const { username, email, password } = req.body;

    await  userModel.create({
          username:username,
          email:email,
          password:password
    })

    res.json({
        message:"User is created"
    })
})

app.post('/api/v1/login',async (req,res)=>{

    const {email,password}=req.body;
try{
    const existingUser=await userModel.find({
        email:email,
        password:password
    })
    if(!existingUser){
        res.json({
            
            message:"wrong credentials"
        })
    }

        const token=jwt.sign({
            //@ts-ignore
            userId:existingUser._id
        },JWT_SECRET_KEY)
        res.json({
            token:token
        })
    }catch(e){
       res.json({
        message:"wrong"
       })
    }
    
})

app.post('/api/v1/content',userMiddlewear , async (req,res)=>{
    
    const {title,link}=req.body
try{
    await contentModel.create({
        title,
        link,
         //@ts-ignore
        userId:req.userId,
        tags:[]
    })
       res.json({
       
        
        message:"content has been created"
    })}
    catch(e){
        res.json({
            message:"error occured"
        })
    }
})

app.get('/api/v1/allcontent',userMiddlewear,async (req,res)=>{
    //@ts-ignore
    
    const userId=req.userId
    try{
        
   const content= await contentModel.find({
        userId:userId
    }).populate("userId","username")
    res.json({
          content
    })
}catch(err){
    res.json({
        message:"user not authenticate"
    })

}
})

app.delete('/api/v1/content',userMiddlewear,async (req,res)=>{
    //@ts-ignore
    const userId=req.userId;
    const contentId=req.body.contentId
    
  await contentModel.deleteOne({
    userId:userId,
    contentId
  })
  res.json({
    message:"content has been deleted succesfully"
  })

})

//this endpoint which user will send to the world ,this is just a hash url
app.post('/api/v1/brain/share',userMiddlewear,async(req,res)=>{
    const share=req.body.share
    if(share){
        await linkModel.create({
            //@ts-ignore
            userId:req.userId,
            hash:Random(10)
        })
    }else{
        await linkModel.deleteOne({
             //@ts-ignore
            userId:req.userId
        })

        
    }
    res.json({
        message:"share updated"
    })

})

//this end point another user will get and after clicking on this link or hash or url that user can get all the data related to that particular hash in oue case that would be content details
// app.get('/',async (req,res)=>{
//     const hash=req.params
//    const content= await linkModel.find({})
//    res.json({
//     content
//    })
// })


app.listen(4001)