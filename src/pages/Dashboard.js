import React from 'react';
import UploadForm from '../components/UploadForm';
import '../App.css';

export default function Dashboard() {
  const username = localStorage.getItem('user');

  return (
    <div>
      <div className="container">
        <h2>Welcome, {username} 👋</h2>
        <UploadForm />
      </div>
    </div>
  );
}
