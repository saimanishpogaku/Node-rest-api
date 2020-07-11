const express = require('express')
const router = express()
const Posts = require('../models/posts')
//let errorTemplate = require('../templates/internalerror.html')

router.get('/', async(req,res) => {
    try{
           const posts = await Posts.find()
           res.status(200).json(posts)
    }catch(err){
        //res.render(errorTemplate)
        res.status(500).json({message:err})
    }
})

router.get('/:id', async(req,res) => {
    try{
           const post = await Posts.findById(req.params.id)
           res.status(200).json(post)
    }catch(err){
        res.status(500).json({message:err})
    }
})


router.post('/', async(req,res) => {
    const poster = new Posts({
        title: req.body.title,
        description: req.body.description
    })

    try{
        const a1 =  await poster.save() 
        res.status(200).json(a1)
    }catch(err){
        res.json({message:err})
    }
})

router.patch('/:id',async(req,res)=> {
    try{
        const post = await Posts.findById(req.params.id) 
        post.description = req.body.description
        const a1 = await post.save()
        res.status(200).json(a1)   
    }catch(err){
        res.status(500).json({message:err})
    }

})

router.delete('/:id',async (req,res) => {
    try{
        const post = await Posts.findByIdAndRemove(req.params.id) 
        res.status(200).json(post)   
    }catch(err){
        res.status(500).json({message:err})
    }
})

module.exports = router