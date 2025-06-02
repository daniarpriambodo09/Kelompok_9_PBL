import React, { useEffect, useState } from 'react';

function TodayCard({ idCity }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!idCity) return;

    fetch(`http://localhost:8000/data_hari_ini/${idCity}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch weather data');
        return res.json();
      })
      .then((data) => {
        setWeather(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [idCity]);

  if (loading) return <div>Loading...</div>;
  if (!weather) return <div>Tidak ada data cuaca tersedia.</div>;

  const date = new Date(weather.TANGGAL);
  const tanggal = new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);

  const now = new Date();
  const currentTime = new Intl.DateTimeFormat('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(now);

  const timeStr = `${tanggal} pukul ${currentTime}`;

  // Gunakan Cuaca dari API langsung
  const cuacaDesc = weather.Cuaca || '-';
  const condition = cuacaDesc.toLowerCase();
  let icon = '☁️'; // default

  if (condition.includes('cerah')) icon = '☀️';
  else if (condition.includes('hujan')) icon = '🌧️';


  const humidity = weather.RH_AVG ?? '-';
  let humidityDesc = '-';
  if (humidity !== '-') {
    if (humidity > 75) humidityDesc = 'Lembab (Gerah)';
    else if (humidity < 40) humidityDesc = 'Kering';
    else humidityDesc = 'Nyaman';
  }

  return (
    <div className="today-card">
      <div>
        <div className="location-time">
          <div className="location">{weather.Kota || 'Kota Tidak Diketahui'}</div>
          <div className="time">{timeStr}</div>
        </div>

        <div className="current-weather">
          <div className="temp">{weather.TAVG}°</div>
          <div className="weather-icon" style={{ fontSize: '40px' }}>{icon}</div>
        </div>

        <div className="weather-desc">{cuacaDesc}</div>

        <div className="high-low">
          <div className="high">H: {weather.TX}°</div>
          <div className="low">L: {weather.TN}°</div>
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <span>Kelembapan: <span className="value">{humidityDesc}</span></span>
        </div>
      </div>
    </div>
  );
}

export default TodayCard;
