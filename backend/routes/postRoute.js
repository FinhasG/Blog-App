const express = require('express');
const router = express.Router();
const userSchema = require('../model/userSchema')
const bcrypt = require('bcryptjs')
const postSchema=require('../model/postSchema')
const commentSchema=require('../model/commentSchea')
const verifySession=require ('../verifySession')



router.post('/create',async(req,res)=>{
    try {
        
        const newPost=new postSchema(req.body)
        const postSave=await newPost.save()
        res.status(200).json(postSave)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.put('/:id',async(req,res)=>{
    try {
        const {id}=req.params
        const updatedPost=await postSchema.findByIdAndUpdate(id,{$set:req.body},{new:true})
        res.status(200).json(updatedPost)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.delete('/:id',async(req,res)=>{
    try {
        const {id}=req.params
        await postSchema.findByIdAndDelete(id);
        res.status(200).json("post  successfuly deleted")

    } catch (error) {
        res.status(500).json(error)
    }
})



router.get('/',async(req,res)=>{
    try {
        const searchQuery=req.query
        const search={
            title:{$regex:searchQuery.search,$options:"i"}
        }
        const posts=await postSchema.find(searchQuery.search?search:null)
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({msg:"User not found"})
    }
})

router.get('/:id',async(req,res)=>{
    try {
        const {id}=req.params
        const user=await postSchema.findById(id)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({msg:"User not found"})
    }
})



router.get('/user/:userId',async(req,res)=>{
    try {
        // const {userId}=req.params.userId
        //const posts=await postSchema.find({userId})
        const posts=await postSchema.find({userId:req.params.userId})
        res.status(200).json(posts)
        
    } catch (error) {
        res.status(500).json({msg:"User not found"})
    }
})

module.exports=router