// components/AdminLoginForm.js
// import React, { useState } from 'react';

const AdminLoginForm = () => {
//   const [password, setPassword] = useState('');

//   const handleLogin = () => {
//     // Replace 'yourAdminPassword' with the actual password you want to check
//     if (password === 'yourAdminPassword') {
//       onLogin();
//     } else {
//       alert('Incorrect password. Try again.');
//     }
//   };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white border border-gray-300 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
      <label htmlFor="password" className="block text-sm font-medium text-gray-600">
        Password:
      </label>
      <input
        type="password"
        id="password"
        name="password"
        // value={password}
        // onChange={(e) => setPassword(e.target.value)}
        // className="mt-1 p-2 border rounded-md w-full"
        // required
      />
      <button
        type="button"
        // onClick={handleLogin}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none"
      >
        Login
      </button>
    </div>
  );
};

export default AdminLoginForm;
