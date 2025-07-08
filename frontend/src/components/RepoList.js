import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'; 
import axios from 'axios';

function RepoList() {
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(null); 
  const history = useHistory();

  useEffect(() => {
    const fetchRepos = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        history.push('/login'); 
        return;
      }

      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/repos`, {
          headers: { 'x-auth-token': token },
        });
        setRepos(response.data);
        setError(null); 
      } catch (err) {
        console.error(err);
        setError('Failed to fetch repositories. Please try again later.');
      }
    };
    fetchRepos();
  }, [history]);

  const toggleAutoReview = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      history.push('/login');
      return;
    }

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/repos/${id}/auto-review`,
        {},
        {
          headers: { 'x-auth-token': token },
        }
      );
      setRepos(repos.map((repo) => (repo._id === id ? response.data : repo)));
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to update Auto Review setting.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Repositories</h1>
        <Link to="/profile" className="text-blue-600 hover:underline">
          Profile
        </Link>
      </div>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <div className="grid gap-4">
        {repos.map((repo) => (
          <div key={repo._id} className="border p-4 rounded-lg">
            <Link
              to={`/repos/${repo._id}`}
              className="text-lg font-semibold hover:underline"
            >
              {repo.name}
            </Link>
            <div className="mt-2">
              <label
                htmlFor={`auto-review-${repo._id}`}
                className="flex items-center space-x-2"
              >
                <input
                  id={`auto-review-${repo._id}`}
                  type="checkbox"
                  checked={repo.autoReview}
                  onChange={() => toggleAutoReview(repo._id)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span>Auto Review</span>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RepoList;