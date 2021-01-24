const user =require('../models/user')
const { nanoid } = require('nanoid')


async function ShowAllUsers(req,res){
    const u = await user.find({})
    res.send(u);    
}

async function login(req,res){
    const User = await user.find({username: req.body.username,password:req.body.password});
    if(User[0])
    {   
        await user.updateOne({username: req.body.username }, { $set: { logged: 'in' }})
        res.send("login succ")
    }
    else{
        res.send("login falid")
    }
}
async function logout(req,res){
    const User = await user.find({username: req.body.username,password:req.body.password});
    console.log(User);
    if(User[0])
    {   
        await user.updateOne({username: req.body.username }, { $set: { logged: 'out' }})
        res.send("logout succ")
    }
    else{
        res.send("logout falid")
    }
}

async function reg(req,res){
    if(req.body)
    {
    await user.create({ id : nanoid(5),username:req.body.username,password:req.body.password})
    res.send("user reg succ")  
    }
    else{
        res.send("user reg faild")   
    }
}

module.exports = {ShowAllUsers,login,logout,reg};
