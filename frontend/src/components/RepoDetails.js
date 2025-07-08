import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function RepoDetails() {
  const { id } = useParams();
  const [repo, setRepo] = useState(null);

  useEffect(() => {
    const fetchRepo = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/repos/${id}`, {
          headers: { 'x-auth-token': localStorage.getItem('token') }
        });
        setRepo(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRepo();
  }, [id]);

  if (!repo) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/repos" className="text-blue-600 hover:underline mb-4 inline-block">
        Back to Repositories
      </Link>
      <h1 className="text-2xl font-bold mb-4">{repo.name}</h1>
      <div className="border p-4 rounded-lg">
        <p><strong>Stars:</strong> {repo.stars}</p>
        <p><strong>Default Branch:</strong> {repo.defaultBranch}</p>
        <p><strong>Auto Review:</strong> {repo.autoReview ? 'Enabled' : 'Disabled'}</p>
        <p><strong>Total Lines:</strong> {repo.lineCount}</p>
      </div>
    </div>
  );
}

export default RepoDetails;