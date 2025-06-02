import React, { useEffect, useState } from 'react';
import ForecastCard from './ForecastCard';

function ForecastSection({ idCity = 1 }) {
  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    if (!idCity) return;

    fetch(`http://127.0.0.1:8000/prediksi_cuaca/${idCity}/7day`)
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map(item => {
          const date = new Date(item.TANGGAL);
          return {
            date: `${date.getDate()} ${date.toLocaleString('id-ID', { month: 'long' })}`,
            day: date.toLocaleDateString('id-ID', { weekday: 'long' }),
            icon: mapWeatherToIcon(item.Cuaca),
            desc: item.Cuaca,
            high: item.TX,
            low: item.TN,
          };
        });
        setForecastData(formatted);
      })
      .catch((err) => console.error('Gagal ambil data: ', err));
  }, [idCity]);

  const mapWeatherToIcon = (condition) => {
    const c = (condition || '').toLowerCase();
    if (c.includes('tidak hujan') || c.includes('cerah') || c.includes('berawan')) return '⛅';
    if (c.includes('hujan')) return '🌧️';
    return '☁️';
  };

  return (
    <div className="forecast-section">
      <h2>Prakiraan 7 Hari</h2>
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
