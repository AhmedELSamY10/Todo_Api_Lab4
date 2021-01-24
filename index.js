require('./db_connection');
const todoHandler = require('./Controllers/todoHandler.js');
const auth = require('./Controllers/auth.js');
const express = require('express')

//---------------------------------------------------------------------------------------------------
const app = express()
//---------------------------------------------------------------------------------------------------
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//---------------------------------------------------------------------------------------------------
const port = 8000
//---------------------------------------------------------------------------------------------------
app.get('/', (req, res) => {
  res.send('Welcome to my small todo app')
})
//---------------------------------------------------------------------------------------------------
app.get('/todos', (req, res) => {
    todoHandler.showAllTodos(req,res)
  })
app.get('/users', async(req, res) => {
  auth.ShowAllUsers(req,res)
});
//---------------------------------------------------------------------------------------------------
app.get('/todos/:username', async(req, res) => { 
    
    todoHandler.findTodo(req,res);

});
//---------------------------------------------------------------------------------------------------
app.post('/todos', async(req, res) => {  
    todoHandler.addTodo(req,res);

});
//---------------------------------------------------------------------------------------------------
app.delete('/todos/:id', async(req, res) => { 

    todoHandler.deleteTodo(req,res);


});
//---------------------------------------------------------------------------------------------------
app.patch('/todos/:id', async(req, res) => {
    todoHandler.updateTodo(req,res);

});
//---------------------------------------------------------------------------------------------------
app.post('/reg', async(req, res) => {
auth.reg(req,res);
});
//---------------------------------------------------------------------------------------------------
app.post('/login',async (req, res) => {
    auth.login(req,res);
});
//---------------------------------------------------------------------------------------------------
app.post('/loout',async (req, res) => {
    auth.logout(req,res);
});
//---------------------------------------------------------------------------------------------------
app.use((req,res,next)=>{
    const now = new Date();
    console.log({method:req.method,now,url:req.url})
})
//---------------------------------------------------------------------------------------------------
app.use((req,res,next)=>{
  res.status(404)
  res.send({error:"internal server error"})
})
//---------------------------------------------------------------------------------------------------
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
//---------------------------------------------------------------------------------------------------
