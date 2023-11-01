const express = require('express');
const router = express.Router();
const userSchema=require("../model/userCredentialModel")




router.get("/",(req,res)=>{
    res.send("hi")
})

router.post("/signup",(req,res)=>{
    console.log(req.body)
    let {name,email,password}=req.body
    let user= new userSchema({
        name,
        email,
        password
    })
    user.save()
    res.send("data reached")
    
})
router.post("/checkuser",async (req,res)=>{
    console.log(req.body);
    let {email,password}=req.body
    let userExist= await userSchema.findOne({email:email})
    console.log("user===",userExist)
    if (userExist){
        console.log("user exist");
        if(password===userExist.password){
            res.send(true)
        }else{
            res.send(false)
        }

    } 
    else {
        console.log("user doesn't exist");
        res.send(false)
    }
})


module.exports = router;