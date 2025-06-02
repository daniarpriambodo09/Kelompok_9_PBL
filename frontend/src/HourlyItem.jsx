import React from 'react';

function HourlyItem({ time, temp, icon, description }) {
  return (
    <div className="hourly-item" style={{ textAlign: 'center', padding: '10px' }}>
      <div className="hourly-time" style={{ fontWeight: '600' }}>{time}</div>
      <div className="hourly-icon" style={{ fontSize: '24px', margin: '5px 0' }}>
        {icon}
      </div>
      <div className="hourly-description" style={{ fontSize: '14px' }}>{description}</div>
      <div className="hourly-temp" style={{ fontSize: '16px', fontWeight: 'bold' }}>{temp}</div>
    </div>
  );
}

export default HourlyItem;
