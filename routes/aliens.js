const express = require('express')
const router = express()
const Alien = require('../models/alien')


router.get('/', async(req,res) => {
    try{
           const aliens = await Alien.find()
           res.status(200).json(aliens)
    }catch(err){
        res.render()
    }
})

router.get('/:id', async(req,res) => {
    try{
           const alien = await Alien.findById(req.params.id)
           res.status(200).json(alien)
    }catch(err){
        res.status(500).json({message:err})
    }
})


router.post('/', async(req,res) => {
    const alien = new Alien({
        name: req.body.name,
        tech: req.body.tech,
        sub: req.body.sub
    })

    try{
        const a1 =  await alien.save() 
        res.status(200).json(a1)
    }catch(err){
        res.json({message:err})
    }
})

router.patch('/:id',async(req,res)=> {
    try{
        const alien = await Alien.findById(req.params.id) 
        alien.sub = req.body.sub
        const a1 = await alien.save()
        res.status(200).json(a1)   
    }catch(err){
        res.status(500).json({message:err})
    }

})

router.delete('/:id',async (req,res) => {
    try{
        const alien = await Alien.findByIdAndRemove(req.params.id) 
        res.status(200).json(alien)   
    }catch(err){
        res.status(500).json({message:err})
    }
})

module.exports = router