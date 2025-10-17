import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../App.css";

export default function YearFiles() {
  const { year } = useParams();
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/uploads?year=${year.replace("-", " ")}`
        );
        const data = await response.json();
        console.log("data", data);
        
        setUploads(data);
      } catch (error) {
        console.error("Failed to fetch uploads:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUploads();
  }, [year]);

  if (loading) return <p className="loading-text">Loading files...</p>;

  return (
    <div className="files-container">
      <div className="files-header">
        <h2>{year.replace("-", " ").toUpperCase()} Files</h2>
        <Link to="/dashboard">
          <button className="btn-back">← Back</button>
        </Link>
      </div>

      {uploads.length > 0 ? (
        <div className="file-gallery">
          {uploads.map((file) => (
            <div key={file._id} className="file-card">
              <div className="file-thumb">
                {file.fileUrl.endsWith(".pdf") ? (
                  <iframe
                    src={`${file.fileUrl}#toolbar=0`}
                    title={file.filename}
                    className="file-preview"
                  />
                ) : file.fileUrl.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                  <img
                    src={file.fileUrl}
                    alt={file.filename}
                    className="file-preview"
                  />
                ) : (
                  <div className="file-icon">📄</div>
                )}
              </div>
              <div className="file-info">
                <h4>{file.filename}</h4>
                <p><strong>Course:</strong> {file.courseName}</p>
                <p><strong>Type:</strong> {file.type}</p>
                <p className="file-date">
                  {new Date(file.uploadDate).toLocaleDateString()}
                </p>
                <a
                  href={file.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-view"
                >
                  View File
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-files">No files uploaded yet for this year.</p>
      )}
    </div>
  );
}
