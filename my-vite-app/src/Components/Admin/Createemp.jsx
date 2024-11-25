import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';
import { useNavigate, useSearchParams } from 'react-router-dom';

const CreateEmployee = () => {
  const Nav = useNavigate()
  const [searchParams] = useSearchParams();
  const uniqueId = searchParams.get('uniqueId');


  const [formData, setFormData] = useState({
    uniqueId: '',
    image: null,
    name: '',
    email: '',
    mobileNo: '',
    designation: '',
    gender: '',
    searchCourse: '',
    actions: 'Pending',
  });



  useEffect(()=>{
      if(uniqueId){
        getEmployeeDetaiils();
      }
  },[uniqueId])
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(value)
  };


  const handleFileChange = (e) => {
    setFormData({...formData, image: e.target.files[0], 
    });
    console.log(e.target.files[0])
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    try {
      if(uniqueId){
        //edit -- put
      const response = await axios.put(`http://localhost:4000/api/employees/${uniqueId}`, formData)
      }else{

        const response = await axios.post('http://localhost:4000/api/employees', formData)
      }
       Nav('/employelist')
    
   
    } catch (error) {
      console.log('Error posting data:', error);
      alert('Failed to create employee.');
    }
  };

  const getEmployeeDetaiils =async () =>{
  const res=await   axios.get(`http://localhost:4000/api/employees/${uniqueId}`)
  setFormData(res?.data?.data)
  }
  return (
    <>
    <Header/>
     <form onSubmit={handleSubmit}>
      <h1>{uniqueId?"Edit Employe":"Create Employee"}</h1>
      <input type="text" name="uniqueId" placeholder="Enter Unique ID" value={formData.uniqueId} onChange={handleChange} required/>
      <input type="text" name="name" placeholder="Enter Name" value={formData.name} onChange={handleChange} required/>
      <input
        type="email"
        name="email"
        placeholder="Enter Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="tel"
        name="mobileNo"
        placeholder="Enter Mobile No"
        value={formData.mobileNo}
        onChange={handleChange}
        required
      />
      <select
        name="designation"
        value={formData.designation}
        onChange={handleChange}
        required
      >
        <option value="">Select Designation</option>
        <option value="HR">HR</option>
        <option value="Manager">Manager</option>
        <option value="Sales">Sales</option>
      </select>
      <div>
        <label>
          <input type="radio" name="gender" value="Male" onChange={handleChange}/>
          Male
        </label>
        <label>
          <input type="radio" name="gender" value="Female" onChange={handleChange}/>
          Female
        </label>
        <label>
          <input type="radio" name="gender" value="Other" onChange={handleChange}/>
          Other
        </label>
      </div>
      <input type="text" name="searchCourse" placeholder="Enter Search Course" value={formData.searchCourse}
        onChange={handleChange}/>
      <input type="file" name="image" accept="image/*" onChange={handleFileChange}/>
      <button type="submit">{uniqueId?"Update":"Submit"}</button>
    </form>
    
    </>
   
  );
};

export default CreateEmployee;
