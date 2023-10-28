const express = require('express');
const router = express.Router();
const userSchema = require('../model/userSchema')
const bcrypt = require('bcryptjs')
const postSchema=require('../model/postSchema')
const commentSchema=require('../model/commentSchea')


router.put('/:id',async(req,res)=>{
    try {
        if(req.body.password){
            const salt= await bcrypt.genSalt(10)
            req.body.password=await bcrypt.hashSync(req.body.password,salt)
        }
        const updatedUser=await userSchema.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.delete('/:id',async(req,res)=>{
    try {
        const {id}=req.params
        await userSchema.findByIdAndDelete(id);
        await postSchema.deleteMany({userId:id});
        await commentSchema.deleteMany({userId:id});
        res.status(200).json("User is successfuly deleted")

    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/:id',async(req,res)=>{
    try {
        const {id}=req.params
        const user=await userSchema.findById(id)
        const {password,...info}=user._doc
        res.status(200).json(info)
    } catch (error) {
        res.status(500).json({msg:"User not found"})
    }
})

module.exports=router