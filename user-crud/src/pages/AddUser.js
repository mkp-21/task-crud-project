import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const navigate = useNavigate();  // Replace useHistory with useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = { name, email, password, dob };

    axios.post("http://localhost/task_crud_php/user-crud-api/index.php", userData)
      .then(response => {
        alert(response.data.message);
        navigate('/');  // Replace history.push with navigate
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="form-container">
      <h2>Add New User</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <label>Date of Birth:</label>
        <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} required />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddUser;
