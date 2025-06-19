import React from 'react';

const AdminDashboard = () => {
  const placeholderUsers = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-maroon dark:text-beige mb-6">Welcome Admin!</h1>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-mustard mb-4">User Management</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b-2 border-maroon dark:border-mustard">
              <th className="p-2">ID</th>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {placeholderUsers.map(user => (
              <tr key={user.id} className="border-b border-gray-200 dark:border-gray-700">
                <td className="p-2">{user.id}</td>
                <td className="p-2">{user.name}</td>
                <td className="p-2">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
