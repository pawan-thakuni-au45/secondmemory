import mongoose from "mongoose";

const contentShema=new mongoose.Schema({
    title:'string',
    description:'string',
    contentId:mongoose.Types.ObjectId,
    userId:mongoose.Types.ObjectId


})

export const contentModel=mongoose.model('Content',contentShema)