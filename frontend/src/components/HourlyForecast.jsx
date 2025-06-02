import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import HourlyItem from './HourlyItem';

function HourlyForecast() {
  const [hourlyData, setHourlyData] = useState([]);

  useEffect(() => {
    Papa.parse('/weather_data_surabaya.csv', {
      download: true,
      header: true,
      complete: (results) => {
        const raw = results.data;

        const times = ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'];

        const formatted = times.map((jam, index) => {
  const item = raw[index];
  const condition = (item?.rain_condition || '').toLowerCase();

  const isRain = condition.includes('rain');

  return {
    time: index === 0 ? '00.00' : jam,
    temp: `${parseFloat(item?.temperature_2m_max || 0).toFixed(1)}°`,
    icon: isRain ? '🌧️' : '☀️',
    description: isRain ? 'Sedang Turun Hujan' : 'Cuaca Cerah',
  };
});


        setHourlyData(formatted);
      },
    });
  }, []);

  return (
    <div className="hourly-forecast">
      <h3 className="title">Prakiraan Per Jam</h3>
      <div className="hourly-grid">
        {hourlyData.map((item, index) => (
          <HourlyItem 
            key={index}
            time={item.time}
            temp={item.temp}
            icon={item.icon}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
}

export default HourlyForecast;
