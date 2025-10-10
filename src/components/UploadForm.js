import React, { useState } from 'react';
import '../App.css';

export default function UploadForm() {
  const [year, setYear] = useState('');
  const [type, setType] = useState('');
  const [file, setFile] = useState(null);
  const [uploads, setUploads] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!year || !type || !file) {
      alert('Please fill all fields');
      return;
    }

    const newUpload = {
      id: Date.now(),
      year,
      type,
      filename: file.name,
    };

    setUploads([...uploads, newUpload]);
    setYear('');
    setType('');
    setFile(null);
    alert(`Uploaded ${file.name} for ${year} - ${type}`);
  };

  return (
    <div className="container">
      <h2>Upload ICT Files</h2>
      <form onSubmit={handleSubmit}>
        <select value={year} onChange={(e) => setYear(e.target.value)}>
          <option value="">Select Year</option>
          <option value="1st Year">1st Year</option>
          <option value="2nd Year">2nd Year</option>
          <option value="3rd Year">3rd Year</option>
          <option value="4th Year">4th Year</option>
        </select>

        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">Select Type</option>
          <option value="Test">Test</option>
          <option value="Exam">Exam</option>
        </select>

        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">Upload</button>
      </form>

      {uploads.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h3>Uploaded Files</h3>
          <ul>
            {uploads.map((u) => (
              <li key={u.id}>
                📄 {u.filename} — {u.year} ({u.type})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
