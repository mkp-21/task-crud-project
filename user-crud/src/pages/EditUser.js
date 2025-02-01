import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';  // Import useNavigate

const EditUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();  // Replace useHistory with useNavigate

  useEffect(() => {
    axios.get(`http://localhost/task_crud_php/user-crud-api/index.php?id=${id}`)
      .then(response => {
        const user = response.data;
        setName(user.name);
        setEmail(user.email);
        setDob(user.dob);
      })
      .catch(error => console.log(error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = { name, email, password, dob };

    axios.put(`http://localhost/task_crud_php/user-crud-api/index.php?id=${id}`, userData)
      .then(response => {
        alert(response.data.message);
        navigate('/');  // Replace history.push with navigate
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="form-container">
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <label>Date of Birth:</label>
        <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} required />

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditUser;
