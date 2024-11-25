const express = require("express");
const app = express();
const PORT = 4000;
const cors = require("cors");
const mongoose = require("mongoose");
const {User,Employee} = require("./Schema");

mongoose
  .connect(
    "mongodb+srv://shaikadil9299:POP5DTKHsIOFuym2@cluster0.tkwlj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("MongoDB is connected successfully");
  })
  .catch((err) => {
    console.log("Mongoose is not connected", err);
  });

app.use(cors());
app.use(express.json()); // Use express.json() to parse JSON requests

// Login route with plain password comparison (without bcrypt)
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
      
    }
      console.log(username,password)
    const user = await User.findOne({ username });
       
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    console.log("User found:", user); 
    const isPasswordCorrect = user.password == password;
    console.log(isPasswordCorrect,user.password,password)

    if (isPasswordCorrect) {
      return res.status(200).json({
        message: "Login successful",
        user
       
      });
    } else {
      return res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (err) {
    console.error("Error:", err.message);
    return res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

// app.get('/api/employees',(req,res)=>{
//      res.json({})
// })

// API to create employee
app.post('/api/employees', async (req, res) => {
  try {
    const {
      uniqueId, image, name, email, mobileNo,
      designation, gender, searchCourse, actions
    } = req.body;
    console.log(uniqueId, image, name, email, mobileNo,
      designation, gender, searchCourse, actions)

    // Create a new employee
    const employee = new Employee({
      uniqueId,
      name,
      email,
      mobileNo,
      designation,
      gender,
      searchCourse,
      actions,
    });

    // Save the employee to the database
    const savedEmployee = await employee.save();

    res.status(201).json({
      message: 'Employee created successfully',
      // data: savedEmployee,
    });
  } catch (error) {
    console.error('Error creating employee:', error);
  }
});

app.put('/api/employees/:uniqueId', async (req, res) => {
  try {
    const { uniqueId } = req.params; // Get uniqueId from request parameters
    const updateData = req.body; // Get update data from request body

    // Find the employee by uniqueId and update the fields
    const updatedEmployee = await Employee.findOneAndUpdate(
      { uniqueId },
      updateData,
      { new: true, runValidators: true } // Return updated document and run schema validations
    );

    if (!updatedEmployee) {
      return res.status(404).json({
        message: `Employee with uniqueId ${uniqueId} not found.`,
      });
    }

    res.status(200).json({
      message: 'Employee updated successfully',
      data: updatedEmployee,
    });
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
});

app.get('/api/employees', async (req, res) => {
  try {
    // Fetch all employees from the database
    const employees = await Employee.find();

    // Check if there are employees
    if (employees.length === 0) {
      return res.status(404).json({
        message: 'No employees found.',
      });
    }

    res.status(200).json({
      message: 'Employees retrieved successfully',
      data: employees,
    });
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
});

app.get('/api/employees/:uniqueId', async (req, res) => {
  try {
    const { uniqueId } = req.params; // Extract uniqueId from URL parameters

    // Find the employee by uniqueId
    const employee = await Employee.findOne({ uniqueId });

    // Check if the employee exists
    if (!employee) {
      return res.status(404).json({
        message: `Employee with uniqueId ${uniqueId} not found.`,
      });
    }

    res.status(200).json({
      message: 'Employee retrieved successfully',
      data: employee,
    });
  } catch (error) {
    console.error('Error fetching employee:', error);
    res.status(500).json({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
});

app.delete('/api/employees/:uniqueId', async(req,res)=>{
   try{
    const { uniqueId } = req.params; 
    const deletedEmployee = await Employee.findOneAndDelete({uniqueId}); 

    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
   }

   res.status(200).json({ message: 'Employee deleted successfully', data: deletedEmployee });
  }
   catch (err){
    console.log('Error deleting employee:', err);
    res.status(500).json({ message: 'Internal server error' });
   }
})

// Start the server"_id
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
