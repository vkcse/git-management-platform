import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

function Profile() {
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user/profile', {
          headers: { 'x-auth-token': localStorage.getItem('token') }
        });
        setUser(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    history.push('/login');
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Profile</h1>
        <Link to="/repos" className="text-blue-600 hover:underline">Repositories</Link>
      </div>
      <div className="border p-4 rounded-lg">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Total Repositories:</strong> {user.totalRepos}</p>
        <p><strong>Auto Review Enabled:</strong> {user.autoReviewRepos}</p>
        <button
          onClick={handleLogout}
          className="mt-4 py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;