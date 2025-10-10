import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

export default function Dashboard() {
  const username = localStorage.getItem('user');
  const navigate = useNavigate();

  const handleClick = (year) => {
    // Example: store selected year in localStorage or navigate
    localStorage.setItem('selectedYear', year);
    // Optionally navigate to Upload page if you want a separate page
    // navigate(`/dashboard/${year}`);
    alert(`You clicked ${year}`);
  };

  return (
    <div className="container">
      <h2>Welcome, {username} 👋</h2>
      <p>There are 4 years of ICT, click on the year you want to view ICT files for</p>
      <div className="cards">
        <div className="card" onClick={() => handleClick('1st Year')}>1st Year</div>
        <div className="card" onClick={() => handleClick('2nd Year')}>2nd Year</div>
        <div className="card" onClick={() => handleClick('3rd Year')}>3rd Year</div>
        <div className="card" onClick={() => handleClick('4th Year')}>4th Year</div>
      </div>
    </div>
  );
}
