import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to Git Management
        </h2>
        <div className="mt-8 space-y-6">
          <a
            href="http://localhost:5000/api/auth/github"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-900"
          >
            Sign in with GitHub
          </a>
          <a
            href="http://localhost:5000/api/auth/gitlab"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
          >
            Sign in with GitLab
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;