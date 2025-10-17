import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

export default function Dashboard() {
  const username = localStorage.getItem('user');
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState(null);
  const [showActionModal, setShowActionModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Form state for upload modal
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [file, setFile] = useState(null);
  const [type, setType] = useState('');


  const handleCardClick = (year) => {
    setSelectedYear(year);
    setShowActionModal(true);
  };

  const handleViewFiles = () => {
    setShowActionModal(false);
    navigate(`/dashboard/${selectedYear.replace(' ', '-').toLowerCase()}`);
  };

  const handleUploadFile = () => {
    setShowActionModal(false);
    setShowUploadModal(true);
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!selectedYear || !courseName || !courseCode || !file) {
      alert('Please fill all fields');
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("year", selectedYear);
    formData.append("courseName", courseName);
    formData.append("courseCode", courseCode);
    formData.append("type", type);
  
    try {
      const response = await fetch("http://localhost:5000/api/uploads", {
        method: "POST",
        body: formData,
      });
  
      const data = await response.json();
      if (response.ok) {
        alert("File uploaded successfully!");
        setShowUploadModal(false);
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed");
    }


    alert(`Uploaded ${file.name} for ${selectedYear}`);
    setShowUploadModal(false);
    setCourseName('');
    setCourseCode('');
    setFile(null);
  };



  return (
    <div className="container">
      <h2>Welcome, {username} 👋</h2>
      <p>Click on a year to upload or view files</p>
      <div className="cards">
        {['1st Year', '2nd Year', '3rd Year', '4th Year'].map((year) => (
          <div key={year} className="card" onClick={() => handleCardClick(year)}>
            {year}
          </div>
        ))}
      </div>

      {/* Action Modal */}
      {showActionModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>{selectedYear}</h3>
            <p>What would you like to do?</p>
            <div className="modal-buttons">
              <button onClick={handleViewFiles}>View Files</button>
              <button onClick={handleUploadFile}>Upload File</button>
              <button onClick={() => setShowActionModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Upload File for {selectedYear}</h3>
            <form onSubmit={handleUploadSubmit} className="upload-form">
              <select value={selectedYear} disabled>
                <option>{selectedYear}</option>
              </select>
              <input
                type="text"
                placeholder="Course Name"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Course Code"
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
              />
              {/* Test / Exam dropdown */}
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="">Select Type</option>
                    <option value="Test">Test</option>
                    <option value="Exam">Exam</option>
                </select>

              <input type="file" onChange={(e) => setFile(e.target.files[0])} />
              <button type="submit">Upload</button>
              <button type="button" onClick={() => setShowUploadModal(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
