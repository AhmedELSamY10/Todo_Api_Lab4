const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
    id: { type: String },
    username: { type: String, min: 20 , unique: true,required: true},
    password: { type: String, min: 20 ,required: true},
    logged: { type: String,maxlength:5 ,enum:["in","out"],default:"out"},
  });
  
  const user = mongoose.model('user',schema)

  module.exports = user;