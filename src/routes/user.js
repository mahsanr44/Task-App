const express = require('express')
const User = require('../models/User')
const router = new express.Router()
// add user
router.post('/users',async (req,res)=>{
    const user = new User(req.body)

    try{
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch(err){

        res.status(400).send(err);
    }
    
});

// get users
router.get('/users',async (req, res)=>{
    
    try{
        const users= await User.find({
        })
        res.send(users);
    }
    catch{

        res.status(500).send()
    }
    
});

// get user by id
router.get('/users/:id', async (req, res) => {
    try{
    const _id= req.params.id
    const user = await User.findById(_id)

        res.status(200).send(user);

    } catch{
        res.status(500).send()
    }
});

// update user

router.patch('/user/:id', async (req, res) =>{
    const updates= Object.keys(req.body)
    const allowedUpdates=['name', 'username', 'age','password']
    const isValidation= updates.every((update)=> allowedUpdates.includes(update))

    if(!isValidation){
        return res.status(400).send({error:"Invalid update!"})
    }
    try{
        const _id = req.params.id
        const param=req.body

        const user = await User.findById(_id)

        updates.forEach((update)=> user[update]= param[update])
        await user.save()
        // const user = await User.findByIdAndUpdate(_id, param, {new:true, runValidators:true});
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }
    catch(err){
        res.status(500).send(err)
    }
});

// delete user
router.delete('/user/:id', async (req, res)=>{
    try{
        const _id= req.params.id

    const user = await User.findByIdAndDelete(_id)
    if(!user){
        return res.status(404).send({error: 'User not found'});
    }
    res.send({success:"User successfully deleted",user});
}
    catch(err){
        res.status(500).send()
    }
});

// login user
router.post('/user/login', async (req, res)=>{
    try{
        const user = await User.findByCredentials(req.body.username, req.body.password)
        const token = await user.generateAuthToken()

        res.send({user,token})

    } catch(err){
        console.log(err);
        res.status(400).send({error:"User failed to login!",err});
    }
})

module.exports = router;