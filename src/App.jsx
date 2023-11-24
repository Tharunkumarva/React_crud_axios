// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './UserList';
import UserForm from './UserForm';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const addUser = async (user) => {
    try {
      const response=await axios.post('https://jsonplaceholder.typicode.com/users', user);
      setUsers([...users,user])
      // fetchUsers();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const editUser = async (user) => {
    try {
      const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${user.id}`, user);
      setUsers((prevUsers) => prevUsers.map((u) => (u.id === user.id ? user : u)));
      // fetchUsers(); // Uncomment if you want to refetch users after editing
    } catch (error) {
      console.error('Error editing user:', error);
    } finally {
      setSelectedUser(null);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(`https://jsonplaceholder.typicode.com/users/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      // fetchUsers(); // Uncomment if you want to refetch users after deleting
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  const selectUser = (user) => {
    setSelectedUser(user);
  };

  return (
    <div>
      <h1>User CRUD Application</h1>
      <UserForm selectedUser={selectedUser} addUser={addUser} editUser={editUser} />
      <UserList users={users} deleteUser={deleteUser} selectUser={selectUser} />
    </div>
  );
}

export default App;
