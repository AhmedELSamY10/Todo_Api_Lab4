const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
    username: { type: String, min: 5 ,required: true},
    title: { type: String, min: 5 ,maxlength:20,required: true},
    des: { type: String, min: 10,maxlength:500 },
    status: { type:String, default:"to-do",enum:["in-progress","to-do","done"] },
    createdat: { type: Date, default: Date.now },
    updatedat: { type: Date, default: Date.now }

  });
  
  const todo = mongoose.model('todo',schema)

  module.exports = todo;  