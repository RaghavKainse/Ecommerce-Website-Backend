const express=require('express')
const { adminLogin } = require('../controllers/auth.controller')
const { protectAdmin } = require('../middleware/auth.middleware')
const router=express.Router()

router.post("/login",adminLogin)
router.get('/dashboard',protectAdmin,(req,res)=>{
    res.status(200).json({message:"Welcome To Admin Dashboard",
        admin:req.user
    })
})

module.exports=router