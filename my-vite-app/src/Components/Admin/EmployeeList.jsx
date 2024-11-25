import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import './employeelist.css';
import { useNavigate } from 'react-router-dom';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]); 
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/employees'); 
        setEmployees(response.data.data); 
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleCreateBtn = () => {
    navigate('/createemp');
  };

  const handleedit = (uniqueId) => {
    navigate(`/createemp?uniqueId=${uniqueId}`);
  };

  const handleDelete = async (uniqueId) => {
    try {
      await axios.delete(`http://localhost:4000/api/employees/${uniqueId}`);
      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee.uniqueId !== uniqueId)
      );
      alert(`Employee with Unique ID ${uniqueId} deleted successfully.`);
    } catch (error) {
      console.error(`Error deleting employee with ID ${uniqueId}:`, error);
      alert(`Error deleting employee with ID ${uniqueId}.`);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchQuery)
  );

  return (
    <>
      <Header />
      <table border="1" style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
        <thead>
          <tr>
            <th colSpan={8} style={{ textAlign: "right" }}>Total Count: {filteredEmployees.length}</th>
            <th colSpan={4} style={{ textAlign: "right" }}>
              <input 
                onChange={handleSearch} 
                value={searchQuery} 
                type="text" 
                placeholder="Search" 
              />
              <button onClick={handleCreateBtn} className="create">Create Employee</button>
            </th>
          </tr>
          <tr>
            <th>Unique ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile No.</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Search Course</th>
            <th>Create Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.uniqueId}</td>
              <td>
                <img 
                  src={employee.image || 'https://via.placeholder.com/50'} 
                  alt={employee.name} 
                  width="50" 
                  height="50" 
                  style={{ borderRadius: '50%' }} 
                  onError={(e) => (e.target.src = 'https://via.placeholder.com/50')} 
                />
              </td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.mobileNo}</td>
              <td>{employee.designation}</td>
              <td>{employee.gender}</td>
              <td>{employee.searchCourse}</td>
              <td>{new Date(employee.createDate).toLocaleDateString()}</td>
              <td>
                <div style={{ display: "flex", gap: "15px" }}>
                  <button onClick={() => handleedit(employee.uniqueId)}>Edit</button>
                  <button onClick={() => handleDelete(employee.uniqueId)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default EmployeeList;
