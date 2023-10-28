const express = require('express');
const router = express.Router();
const postSchema=require('../model/postSchema')
const commentSchema=require('../model/commentSchea')



router.post('/create',async(req,res)=>{
    try {
        
        const comment=new commentSchema(req.body)
        const commentSave=await comment.save()
        res.status(200).json(commentSave)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.put('/:id',async(req,res)=>{
    try {
        const {id}=req.params
        const updatedComment=await commentSchema.findByIdAndUpdate(id,{$set:req.body},{new:true})
        res.status(200).json(updatedComment)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.delete('/:id',async(req,res)=>{
    try {
        const {id}=req.params
        await commentSchema.findByIdAndDelete(id);
        res.status(200).json("User is successfuly deleted")

    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/post/:postId',async(req,res)=>{
    try {
        const comments=await commentSchema.find({postId:req.params.postId})
        res.status(200).json(comments)
        // const {postId}=req.params.postId
        // const comments=await commentSchema.find(postId)
        // res.status(200).json(comments.comment)
    } catch (error) {
        res.status(500).json({msg:"User not found"})
    }
})


router.get('/',async(req,res)=>{
    try {
        const posts=await postSchema.find({})
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({msg:"User not found"})
    }
})


router.get('/user/:userId',async(req,res)=>{
    try {
        const {userId}=req.params.userId
        const posts=await postSchema.find(userId)
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({msg:"User not found"})
    }
})

module.exports=router