import React from 'react';

function ForecastCard({ day, date, icon, desc, high, low }) {
  return (
    <div className="forecast-card">
      <h3>{day}</h3>
      <p>{date}</p>
      <div className="weather-icon" style={{ fontSize: '48px', margin: '10px 0' }}>
        {icon}
      </div>
      <p>{desc}</p>
      <p>{high} / {low}</p>
    </div>
  );
}

export default ForecastCard;
