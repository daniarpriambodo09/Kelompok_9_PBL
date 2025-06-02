// components/ForecastSection.jsx
import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import ForecastCard from './ForecastCard';

function ForecastSection() {
  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    fetch('/weather_data_surabaya.csv')
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          complete: (results) => {
            // Ambil 5 hari mulai dari index ke-1 (besok)
            const formatted = results.data.slice(1, 8).map(item => ({
              day: getDayName(item.time),
              date: formatDate(item.time),
              icon: mapWeatherToIcon(item.rain_condition),  // fungsi emoji cuaca
              desc: item.rain_condition,
              high: item.temperature_2m_max ? `${item.temperature_2m_max}°` : '',
              low: item.temperature_2m_min ? `${item.temperature_2m_min}°` : ''
            }));

            setForecastData(formatted);
          }
        });
      });
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    if (isNaN(date)) return 'Invalid Date';
    return `${date.getDate()} ${date.toLocaleString('id-ID', { month: 'long' })}`;
  };

  const getDayName = (dateStr) => {
    const date = new Date(dateStr);
    if (isNaN(date)) return 'Hari';
    return date.toLocaleDateString('id-ID', { weekday: 'long' });
  };

  const mapWeatherToIcon = (condition) => {
    const c = (condition || '').toLowerCase();

    if (c.includes('tidak hujan')) return '⛅';  // tidak hujan = berawan atau cerah
    if (c.includes('hujan')) return '🌧️';       // hujan
    return '☁️';                                 // fallback/default
  };

  return (
    <div className="forecast-section">
      <h2>Prakiraan {forecastData.length} Hari</h2>
      <div className="forecast-cards">
        {forecastData.map((forecast, index) => (
          <ForecastCard 
            key={index}
            day={forecast.day}
            date={forecast.date}
            icon={forecast.icon}
            desc={forecast.desc}
            high={forecast.high}
            low={forecast.low}
          />
        ))}
      </div>
    </div>
  );
}

export default ForecastSection;
