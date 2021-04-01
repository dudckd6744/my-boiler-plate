const express = require("express");
const Router  = express.Router();
const { User } = require("../model/User");
const { auth } = require("../middleware/auth");


Router.get("/auth",auth,(req,res)=>{
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        id:req.user.id,
        name:req.user.name,
        role:req.user.role,
        image:req.user.image,
        isDelete:req.user.isDelete
    })
})

Router.post("/register",(req,res) => {
    console.log(req.body)
    const user = new User(req.body)

    user.save((err,users)=>{
        if(err) return res.status(400).json({success:false, err})
        console.log(users)

        return res.status(200).json({success:true})
    })
})

Router.post("/login",(req,res) =>{

    User.findOne({"id":req.body.id},(err,user)=>{
        if(!user) 
        return res.status(400)
        .json({loginSuccess:false, message:"Auth failed, id is not found"})

        user.comparePassword(req.body.password, (err,isMatch)=>{
            if(!isMatch) return res.json({
                loginSuccess:false, message:"Wrong password"
            })

            user.generateToken((err,user)=>{
                if(err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
                res.cookie('w_auth',user.token)
                .status(200).json({loginSuccess:true, userId:user._id})
            })
        })
    })
})

Router.get("/logout",auth, (req,res)=> {
    User.findByIdAndUpdate({"_id":req.user._id}, {token:"",tokenExp:""},(err,doc)=>{
        if(err) return res.status(400).json({success:false, err});
        return res.status(200).json({ success:true})
    })
})

module.exports = Router;