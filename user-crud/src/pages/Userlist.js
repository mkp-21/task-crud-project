import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/UserList.css'; 

const Userlist = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost/task_crud_php/user-crud-api/index.php")
      .then(response => setUsers(response.data))
      .catch(error => console.log(error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost/task_crud_php/user-crud-api/index.php?id=${id}`)
      .then(response => {
        alert(response.data.message);
        setUsers(users.filter(user => user.id !== id));
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="user-list">
      <h2>User List</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>SR Number</th>
            <th>Name</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td> 
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.dob}</td>
              <td>
                <Link to={`/edit/${user.id}`} className="edit-btn">Edit</Link>
                <button onClick={() => handleDelete(user.id)} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Userlist;
