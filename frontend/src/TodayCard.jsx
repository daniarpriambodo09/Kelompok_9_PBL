// components/TodayCard.jsx
import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

function TodayCard() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetch('/weather_data_surabaya.csv')
      .then(res => res.text())
      .then(csvText => {
        Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          complete: (result) => {
            const data = result.data[0]; // baris pertama = cuaca hari ini
            setWeather(data);
          }
        });
      });
  }, []);

  if (!weather) return <div>Loading...</div>;

  const date = new Date(weather.time);

  // Format tanggal dan jam mengikuti waktu lokal pengguna (tanpa timeZone)
  const tanggal = new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);

  const jam = new Intl.DateTimeFormat('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);

  const timeStr = `${tanggal} pukul ${jam}`;

  // Logika icon dan deskripsi hanya dua kondisi: Hujan atau Cerah
  const condition = (weather.rain_condition || '').toLowerCase();
  const isRain = condition.includes('rain') || condition.includes('hujan');
  const icon = isRain ? '🌧️' : '☀️';
  const description = isRain ? 'Hujan' : 'Cerah';

  // Logika kelembapan: kalau kelembapan > 75% dianggap lembab (gerah), < 40% kering, sisanya nyaman
  const humidity = weather.kelembapan ?? '-';
  let humidityDesc = '-';
  if (humidity !== '-') {
    if (humidity > 75) humidityDesc = 'Lembab (Gerah)';
    else if (humidity < 40) humidityDesc = 'Kering';
    else humidityDesc = 'Nyaman';
  }

  // Tekanan udara dari tekanan_udara
  const pressure = weather.tekanan_udara ?? '-';

  // UV index ambil dari uv_index
  const uvIndex = weather.uv_index ?? '-';

  return (
    <div className="today-card">
      <div>
        <div className="location-time">
          <div className="location">{weather.city || 'Surabaya'}</div>
          <div className="time">{timeStr}</div>
        </div>

        <div className="current-weather">
          <div className="temp">{weather.temperature_2m_max}°</div>
          <div className="weather-icon" style={{ fontSize: '40px' }}>{icon}</div>
        </div>

        <div className="weather-desc">{description}</div>

        <div className="high-low">
          <div className="high">H: {weather.temperature_2m_max}°</div>
          <div className="low">L: {weather.temperature_2m_min}°</div>
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <span>Kelembapan: <span className="value">{humidityDesc}</span></span>
        </div>

        <div className="detail-item">
          <span>Tekanan: <span className="value">{pressure} hPa</span></span>
        </div>

        <div className="detail-item">
          <span>Angin: <span className="value">{weather.windspeed_10m_max} km/h</span></span>
        </div>

        <div className="detail-item">
          <span>UV Index: <span className="value">{uvIndex}</span></span>
        </div>
      </div>
    </div>
  );
}

export default TodayCard;
