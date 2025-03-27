import mongoose from "mongoose";



const userSchema=new mongoose.Schema({
    username:'string',
    email:'string',
    password:'string'
})

export const userModel=mongoose.model('User',userSchema)
const contentShema=new mongoose.Schema({
    title:'string',
    link:'string',
   tags:[{type:mongoose.Types.ObjectId}],
    userId:{type:mongoose.Types.ObjectId}


})
export const contentModel=mongoose.model('Content',contentShema)

export const linkSchema=new mongoose.Schema({
    hash:'string',
    userId:{type:mongoose.Types.ObjectId}
})
export const linkModel=mongoose.model('Schema',linkSchema)

