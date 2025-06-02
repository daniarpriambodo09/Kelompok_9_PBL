import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Circle, Popup } from 'react-leaflet';
import Papa from 'papaparse';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const center = [-7.2575, 112.7521]; // Koordinat Surabaya

function WeatherMap() {
  const [weatherData, setWeatherData] = useState(null);
  const [activeTab, setActiveTab] = useState('Suhu');
  const tabs = ['Suhu', 'Curah Hujan', 'Angin', 'Kelembaban'];

  useEffect(() => {
    fetch('/weather_data_surabaya.csv')
      .then(res => res.text())
      .then(text => {
        const result = Papa.parse(text, { header: true });
        setWeatherData(result.data[0]); // Ambil baris pertama (paling baru)
      });
  }, []);

  const getColorByTemperature = (temp) => {
    const t = parseFloat(temp);
    if (t > 32) return '#ef4444'; // Panas
    if (t > 28) return '#f59e0b'; // Hangat
    if (t > 24) return '#10b981'; // Sejuk
    return '#3b82f6';             // Dingin
  };

  const getColorByRain = (rain) => {
    const r = parseFloat(rain);
    if (r > 50) return '#2563eb';  // Hujan lebat
    if (r > 20) return '#3b82f6';  // Sedang
    if (r > 5) return '#60a5fa';   // Ringan
    return '#93c5fd';              // Hampir tidak ada
  };

  const getColorByWind = (wind) => {
    const w = parseFloat(wind);
    if (w > 40) return '#7c3aed';   // Sangat kencang
    if (w > 25) return '#8b5cf6';   // Kencang
    if (w > 10) return '#a78bfa';   // Sedang
    return '#ddd6fe';               // Lemah
  };

  const getColorByHumidity = (hum) => {
    const h = parseFloat(hum);
    if (h > 85) return '#064e3b';   // Sangat lembap
    if (h > 70) return '#047857';   // Lembap
    if (h > 50) return '#10b981';   // Normal
    return '#6ee7b7';               // Kering
  };

  const getCircleInfo = () => {
    if (!weatherData) return null;

    switch (activeTab) {
      case 'Suhu':
        return {
          value: weatherData.temperature_2m_max,
          label: 'Suhu Maksimum',
          unit: '°C',
          color: getColorByTemperature(weatherData.temperature_2m_max)
        };
      case 'Curah Hujan':
        return {
          value: weatherData.rain_sum,
          label: 'Curah Hujan',
          unit: 'mm',
          color: getColorByRain(weatherData.rain_sum)
        };
      case 'Angin':
        return {
          value: weatherData.windspeed_10m_max,
          label: 'Kecepatan Angin',
          unit: 'km/jam',
          color: getColorByWind(weatherData.windspeed_10m_max)
        };
      case 'Kelembaban':
        return {
          value: weatherData.kelembapan,
          label: 'Kelembaban',
          unit: '%',
          color: getColorByHumidity(weatherData.kelembapan)
        };
      default:
        return null;
    }
  };

  const circleData = getCircleInfo();

  const blueIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  return (
    <div className="weather-map">
      <h3>Peta Persebaran Cuaca</h3>

      <div style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '1rem',
        flexWrap: 'wrap'
      }}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(tab)}
            style={{
              backgroundColor: activeTab === tab ? '#ffffff' : 'rgba(255,255,255,0.1)',
              color: activeTab === tab ? '#1e293b' : '#ffffff',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="map-container" style={{ height: '400px', marginBottom: '1rem' }}>
        <MapContainer center={center} zoom={12} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />

          <Marker position={[-7.274, 112.767]} icon={blueIcon}>
            <Popup>Lokasi: Gebang Putih</Popup>
          </Marker>

          {circleData && circleData.value !== undefined && circleData.value !== '' && (
            <Circle
              center={center}
              radius={3000}
              pathOptions={{ color: circleData.color, fillColor: circleData.color, fillOpacity: 0.5 }}
            >
              <Popup>
                <div>
                  <strong>{circleData.label}:</strong> {circleData.value} {circleData.unit}<br />
                  <strong>Kondisi:</strong> {weatherData?.rain_condition}
                </div>
              </Popup>
            </Circle>
          )}
        </MapContainer>
      </div>

      {/* Legend */}
      {activeTab === 'Suhu' && (
        <div className="map-legend">
          <div className="legend-item"><div className="legend-color" style={{ backgroundColor: '#ef4444' }}></div><span>Panas (&gt;32°)</span></div>
          <div className="legend-item"><div className="legend-color" style={{ backgroundColor: '#f59e0b' }}></div><span>Hangat (28-32°)</span></div>
          <div className="legend-item"><div className="legend-color" style={{ backgroundColor: '#10b981' }}></div><span>Sejuk (24-28°)</span></div>
          <div className="legend-item"><div className="legend-color" style={{ backgroundColor: '#3b82f6' }}></div><span>Dingin (&lt;24°)</span></div>
        </div>
      )}

      {activeTab === 'Curah Hujan' && (
        <div className="map-legend">
          <div className="legend-item"><div className="legend-color" style={{ backgroundColor: '#2563eb' }}></div><span>Lebat (&gt;50mm)</span></div>
          <div className="legend-item"><div className="legend-color" style={{ backgroundColor: '#3b82f6' }}></div><span>Sedang (20-50mm)</span></div>
          <div className="legend-item"><div className="legend-color" style={{ backgroundColor: '#60a5fa' }}></div><span>Ringan (5-20mm)</span></div>
          <div className="legend-item"><div className="legend-color" style={{ backgroundColor: '#93c5fd' }}></div><span>Hampir Tidak Ada (&lt;5mm)</span></div>
        </div>
      )}

      {activeTab === 'Angin' && (
        <div className="map-legend">
          <div className="legend-item"><div className="legend-color" style={{ backgroundColor: '#7c3aed' }}></div><span>Sangat Kencang (&gt;40)</span></div>
          <div className="legend-item"><div className="legend-color" style={{ backgroundColor: '#8b5cf6' }}></div><span>Kencang (25-40)</span></div>
          <div className="legend-item"><div className="legend-color" style={{ backgroundColor: '#a78bfa' }}></div><span>Sedang (10-25)</span></div>
          <div className="legend-item"><div className="legend-color" style={{ backgroundColor: '#ddd6fe' }}></div><span>Lemah (&lt;10)</span></div>
        </div>
      )}

      {activeTab === 'Kelembaban' && (
        <div className="map-legend">
          <div className="legend-item"><div className="legend-color" style={{ backgroundColor: '#064e3b' }}></div><span>Sangat Lembap (&gt;85%)</span></div>
          <div className="legend-item"><div className="legend-color" style={{ backgroundColor: '#047857' }}></div><span>Lembap (70-85%)</span></div>
          <div className="legend-item"><div className="legend-color" style={{ backgroundColor: '#10b981' }}></div><span>Normal (50-70%)</span></div>
          <div className="legend-item"><div className="legend-color" style={{ backgroundColor: '#6ee7b7' }}></div><span>Kering (&lt;50%)</span></div>
        </div>
      )}
    </div>
  );
}

export default WeatherMap;
