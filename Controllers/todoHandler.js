const todo =require('../models/todo')


 async function showAllTodos(req, res) {
    const t = await todo.find({})
           res.send(t);    
}

async function addTodo(req,res){
    const{username, title, des,status}=req.body
    const User = await user.find({username:username,logged:'in'});
    if(User[0]){
    await todo.create({username,title,des,status},(err,todo)=>{
         if(err){
             res.statusCode=422;
             res.send({succ:false,reason:"wrong or missing fields"})
         }
         else
         res.send({succ:true})
     })
    }
    else{
        res.send("you should log in first")   
    }
}
async function updateTodo(req,res){
       
  const{ title, des,status}=req.body
  const todoOwner = await todo.findOne({ _id: req.params.id });
    const Logged = await user.find({username: todoOwner.username,logged:"in"});
    if(Logged[0]&&todoOwner)
    { 
  const updatedAt = await new Date();
  await todo.updateOne({_id: req.params.id }, { $set: {title:title, des:des,status:status ,updatedat: updatedAt}})
  res.send("updated succ")
}
else{
    res.send("update fail ")
}


}
async function deleteTodo(req,res){
    const todoOwner = await todo.findOne({ _id: req.params.id });
    const Logged = await user.find({username: todoOwner.username,logged:"in"});
    if(Logged[0]&&todoOwner)
    {  
   await todo.deleteOne({ _id: req.params.id });
    res.send("deleted succ")
    }
    else{
        res.send("delete fail")
    }
}
async function findTodo(req,res){
    const username = req.params.username;
    const t =await todo.find({username:username})
    if(t[0])
    res.send(t)
    else
    res.send("no todos with username")
}

module.exports = { showAllTodos,addTodo,updateTodo,deleteTodo,findTodo};
