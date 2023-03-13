const express = require('express');
const Task = require('../models/Task');
const router= new express.Router();


// add task
router.post('/task', async (req,res)=>{
    const task= new Task(req.body)
    try{
        await task.save()
        res.status(201).send(task)
    }
    catch{
        res.status(500).send()

    }
});

// get tasks
router.get('/tasks', async (req,res)=>{
    const tasks = await Task.find({})
    try{
        res.status(200).send(tasks)
    }
    catch{
        res.status(500).send()
    }
});

// get task by id
router.get('/tasks/:id', async (req, res) => {
    try{
    const _id= req.params.id
    const task = await Task.findById(_id)

        res.status(200).send(task)
    } catch(e){
       return res.status(500).send(e)
    }
});

// update task 

router.patch('/task/:id', async (req, res) => {
    const updates=Object.keys(req.body)
    const allowedUpdates = ['task','status']
    const isValidation= updates.every((update)=>allowedUpdates.includes(update))

    if(!isValidation){
        return res.status(400).send({error: "Invalid update!!!"})
    }
    try{
        const _id= req.params.id
        const param= req.body

        const task = await Task.findById(_id)
        updates.forEach((update)=> task[update]=param[update]);
        // const task = await Task.findByIdAndUpdate(_id, param, {new: true, runValidators:true})

        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }
    catch(err){
        res.status(500).send(err)
    }
});

// delete task

router.delete('/task/:id', async(req,res)=>{

    try{
    const task= await Task.findByIdAndDelete(req.params.id)

    if(!task){
        res.status(404).send({error:"Task not found"});
    }
    res.send({success:"Task deleted successfully", task})
}
catch(err){
    res.status(500).send(err)
}
});

module.exports = router;