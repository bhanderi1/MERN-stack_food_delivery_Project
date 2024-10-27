const User = require('../Model/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.signup = async (req, res) => {
    try {
        let {name, email, password, profilImage } = req.body
        let user = await User.findOne({ email: email, isDelete: false })
        if (user) {
            return res.status(400).json({ message: "User already exist" })
        }
        let imagePath = "";
        if (req.file) {
            imagePath = req.file.path.replace(/\\/g, "/")
        }
        const hashPassword = await bcrypt.hash(password, 10)
        console.log(hashPassword);

        user = await User.create({
            name: name,
            email: email,
            password: hashPassword,
            profileImage: imagePath
        })
        res.status(201).json({ message: "User Register successfully...", user })
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'internal server erro' });
    }
}

exports.signIn = async(req,res)=>{
    try{
        let user = await User.findOne({email:req.body.email, isDelete:false})
        if(!user){
            return res.json({message:"User not found..."})
        }
        let comparePassword = await bcrypt.compare(req.body.password, user.password)
        if(!comparePassword){
            return res.json({message:"Email password not matched..."})
        }
        let token = await jwt.sign({userId:user._id}, process.env.JWT_SECRATE)
        res.cookie("auth_token", token ,{httpOnly:true , secure:false , sameSite:'Lax'})
        res.status(200).json({message:"Login Successfully" , token , user})
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'internal server erro' });
    } 
}

exports.userProfile = async(req,res)=>{
    try{
        let user = await User.findOne({_id:req.user._id})
        // console.log(user);
        res.status(200).json({message:"Show User Profile", user})
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'internal server erro' });
    } 
}

exports.updateUser = async(req,res)=>{
    try{
       let user= req.user
       user = await User.findByIdAndUpdate(user._id ,{$set:{...req.body}} , {new:true})
       res.status(200).json({user , message: "Password update successfully..."})
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'internal server erro' });
    } 
}

exports.deleteUser = async(req,res)=>{
    try{
      let user = req.user
      if(!user){
         return res.status(404).json({message:"Usre not found..."})
      }
      user = await User.findByIdAndUpdate(usre._id , {isDelete:true}, {new:true})
      res.status(200).json({message:"User Delete Successfully..."})
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'internal server erro' });
    } 
}

exports.logout = async (req, res) => {
    try {
        res.clearCookie('auth_token'); 
        console.log('User Logout');
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

