import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../App.css';

export default function YearFiles() {
  const { year } = useParams();
  const [uploads, setUploads] = useState([]);

  // Get all uploaded files from localStorage (or however you store them)
  useEffect(() => {
    const allUploads = JSON.parse(localStorage.getItem('uploads') || '[]');
    // Filter uploads by year
    const filtered = allUploads.filter(u => u.year.toLowerCase() === year.replace('-', ' '));
    setUploads(filtered);
  }, [year]);

  return (
    <div className="container">
      <h2>Files for {year.replace('-', ' ').toUpperCase()}</h2>
      <Link to="/dashboard">
        <button>Back to Dashboard</button>
      </Link>

      {uploads.length > 0 ? (
        <ul style={{ marginTop: '20px' }}>
          {uploads.map((u) => (
            <li key={u.id}>
              📄 {u.filename} — {u.year} ({u.type})
            </li>
          ))}
        </ul>
      ) : (
        <p>No files uploaded yet for this year.</p>
      )}
    </div>
  );
}
