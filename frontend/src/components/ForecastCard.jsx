import React from 'react';

function ForecastCard({ day, date, icon, desc, high, low }) {
  return (
    <div className="forecast-card" style={styles.card}>
      <h3 style={styles.day}>{day}</h3>
      <p style={styles.date}>{date}</p>

      <div className="weather-icon" style={styles.icon}>
        {icon}
      </div>

      <p style={styles.desc}>{desc}</p>

      <p style={styles.temp}>
        <span style={styles.high}>{high}°C</span> / <span style={styles.low}>{low}°C</span>
      </p>
    </div>
  );
}

const styles = {
  card: {
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '1rem',
    padding: '1rem',
    margin: '0.5rem',
    width: '140px',
    textAlign: 'center',
    color: '#fff',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  },
  day: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    margin: '0',
  },
  date: {
    fontSize: '0.9rem',
    color: '#ccc',
    margin: '0.2rem 0',
  },
  icon: {
    fontSize: '48px',
    margin: '0.5rem 0',
  },
  desc: {
    fontSize: '0.95rem',
    margin: '0.3rem 0',
  },
  temp: {
    fontSize: '0.95rem',
    fontWeight: 'bold',
    marginTop: '0.5rem',
  },
  high: { color: '#ffcc00' },
  low: { color: '#66ccff' },
};

export default ForecastCard;
