import React from 'react'
import Header from './Header'

const Edit = () => {
  return (
       <>
       <Header/>
        <form>
    <h1>Edit Employee</h1>
<input type="text" placeholder="Enter Name" />
<input type="email" placeholder="Enter Email" />
<input type="tel" placeholder="Mobile No" />

<select className='dropdown'>
  <option value="">Select</option>
  <option value="HR">HR</option>
  <option value="Manager">Manager</option>
  <option value="Sales">Sales</option>
</select>

<div className='radio-btn'>
  <label>
    <input type="radio" name="gender" value="male" />
    Male
  </label>
  <label>
    <input type="radio" name="gender" value="female" />
    Female
  </label>
</div>
<input type="file" id="imageUpload" name="image" accept="image/*" />
<button>Update</button>

    </form>
   
       </>
   
  )
}

export default Edit
