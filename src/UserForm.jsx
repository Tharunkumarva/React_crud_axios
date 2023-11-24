// UserForm.jsx
import React, { useState, useEffect } from 'react';

function UserForm({ selectedUser, addUser, editUser }) {
  const [user, setUser] = useState({ name: '', email: '' });

  useEffect(() => {
    if (selectedUser) {
      setUser(selectedUser);
    } else {
      setUser({ name: '', email: '' });
    }
  }, [selectedUser]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedUser) {
      editUser(user);
    } else {
      addUser(user);
    }
  };

  return (
    <div>
      <h2>User Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={user.name} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="text" name="email" value={user.email} onChange={handleChange} />
        </label>
        <button type="submit">{selectedUser ? 'Edit User' : 'Add User'}</button>
      </form>
    </div>
  );
}

export default UserForm;
