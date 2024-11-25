const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: Number, required: true },
  role: { 
    type: String, 
    enum: ['admin', 'user'], 
    required: true 
  },
}, 
{ timestamps: true }); 


const employeeSchema = new mongoose.Schema({
  uniqueId: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: false, 
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobileNo: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'], 
  },
  searchCourse: {
    type: String,
  },
  createDate: {
    type: Date,
    default: Date.now, 
  },
  actions: {
    type: String,
    default: 'Pending', 
  },
});




module.exports = {
  User: mongoose.model('User', userSchema),
  Employee: mongoose.model('Employee', employeeSchema)
};
