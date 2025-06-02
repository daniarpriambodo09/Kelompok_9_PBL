// components/WeatherStats.jsx
import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import '../App.css'; // This line is crucial if App.css is in the parent directory

// Helper function to format month names
const getMonthName = (monthString) => {
  const [year, monthNum] = monthString.split('-');
  const date = new Date(year, parseInt(monthNum) - 1, 1);
  return date.toLocaleString('id-ID', { month: 'short' }); // "id-ID" for Indonesian month names
};

// Helper function for trend calculation
const calculateTrend = (data) => {
  if (data.length < 2) return 0;
  const currentMonthTotal = data[data.length - 1]?.total || 0;
  const lastMonthTotal = data[data.length - 2]?.total || 0;

  if (lastMonthTotal === 0) {
    return currentMonthTotal > 0 ? 'N/A' : '0.0'; // Avoid division by zero
  }
  return (((currentMonthTotal - lastMonthTotal) / lastMonthTotal) * 100).toFixed(1);
};

// Helper function for trend arrow display
const getTrendArrow = (data) => {
  const trend = parseFloat(calculateTrend(data));
  if (isNaN(trend)) return '';
  return trend > 0 ? '▲' : (trend < 0 ? '▼' : '▬');
};

// Helper function for trend color display
const getTrendColor = (data) => {
  const trend = parseFloat(calculateTrend(data));
  if (isNaN(trend)) return '#2c3e50';
  return trend > 0 ? '#28a745' : (trend < 0 ? '#dc3545' : '#555');
};

function WeatherStats() {
  const [weeklyTemp, setWeeklyTemp] = useState([]);
  const [monthlyRain, setMonthlyRain] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/weather_data_surabaya.csv')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.text();
      })
      .then(data => {
        const parsed = Papa.parse(data, { header: true }).data;

        if (!parsed || parsed.length === 0) {
          throw new Error("Parsed data is empty or invalid.");
        }

        // Process weekly temperature data (last 7 days)
        const weekly = parsed.slice(-7).map(row => ({
          date: row.time,
          max: parseFloat(row.temperature_2m_max),
          min: parseFloat(row.temperature_2m_min),
        })).filter(day => !isNaN(day.max) && !isNaN(day.min) && day.date);
        setWeeklyTemp(weekly);

        // Process monthly rainfall data (aggregate per month)
        const monthlyMap = {};
        parsed.forEach(row => {
          if (row.time) {
            const month = row.time.slice(0, 7); // YYYY-MM
            const rain = parseFloat(row.rain_sum) || 0;
            monthlyMap[month] = (monthlyMap[month] || 0) + rain;
          }
        });

        const monthly = Object.entries(monthlyMap).map(([month, total]) => ({
          month,
          total
        })).filter(month => !isNaN(month.total));
        setMonthlyRain(monthly.slice(-6)); // Get last 6 months
      })
      .catch(e => {
        console.error("Error fetching or parsing weather data:", e);
        setError(e.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="weather-stats">Loading data cuaca...</div>;
  }

  if (error) {
    return <div className="weather-stats error-message">Terjadi kesalahan saat memuat data: {error}</div>;
  }

  return (
    <div className="weather-stats">
      <h2>Statistik Cuaca Surabaya</h2>
      <div className="stats-cards">

        {/* Weekly Temperature */}
        <div className="infostats-card">
          <h3>🌡️ Suhu Mingguan</h3>
          {weeklyTemp.length > 0 ? (
            <>
              <div className="chart-container">
                {weeklyTemp.map((day, i) => (
                  <div
                    key={i}
                    className="chart-bar"
                    style={{ height: `${Math.max(0, day.max * 4)}px` }} // Scale for better visibility
                    title={`Max: ${day.max}°C\nMin: ${day.min}°C`}
                  >
                    <span>{new Date(day.date).getDate()}</span> {/* Day label */}
                    <span>{day.max}°</span> {/* Value label */}
                  </div>
                ))}
              </div>
              <div className="stats-summary">
                <div className="stat-item">
                  <div className="stat-label">Suhu Tertinggi</div>
                  <div className="stat-value">{Math.max(...weeklyTemp.map(d => d.max)).toFixed(1)}°C</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">Suhu Terendah</div>
                  <div className="stat-value">{Math.min(...weeklyTemp.map(d => d.min)).toFixed(1)}°C</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">Rata-rata</div>
                  <div className="stat-value">{(weeklyTemp.reduce((acc, cur) => acc + cur.max, 0) / weeklyTemp.length).toFixed(1)}°C</div>
                </div>
              </div>
            </>
          ) : (
            <p className="no-data-message">Data suhu mingguan tidak tersedia.</p>
          )}
        </div>

        {/* Monthly Rainfall */}
        <div className="infostats-card">
          <h3>🌧️ Curah Hujan Bulanan</h3>
          {monthlyRain.length > 0 ? (
            <>
              <div className="chart-container">
                {monthlyRain.map((month, i) => (
                  <div
                    key={i}
                    className="chart-bar"
                    style={{ height: `${Math.max(0, month.total * 1)}px` }} // Scale
                    title={`${getMonthName(month.month)} ${month.month.slice(0,4)}: ${month.total.toFixed(1)} mm`}
                  >
                    <span>{getMonthName(month.month)}</span> {/* Month label */}
                    <span>{month.total.toFixed(0)}mm</span> {/* Value label */}
                  </div>
                ))}
              </div>
              <div className="stats-summary">
                <div className="stat-item">
                  <div className="stat-label">Total Bulan Ini</div>
                  <div className="stat-value">{monthlyRain[monthlyRain.length - 1]?.total.toFixed(1)} mm</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">Bulan Lalu</div>
                  <div className="stat-value">{monthlyRain[monthlyRain.length - 2]?.total.toFixed(1)} mm</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">Tren</div>
                  <div className="stat-value" style={{ color: getTrendColor(monthlyRain) }}>
                    {monthlyRain.length >= 2 ? (
                      `${getTrendArrow(monthlyRain)} ${calculateTrend(monthlyRain)}%`
                    ) : (
                      'N/A'
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <p className="no-data-message">Data curah hujan bulanan tidak tersedia.</p>
          )}
        </div>

      </div>
    </div>
  );
}

export default WeatherStats;