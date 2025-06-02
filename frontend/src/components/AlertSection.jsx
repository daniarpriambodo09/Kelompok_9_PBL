// AlertSection.jsx
import React, { useEffect, useState } from 'react';

function AlertBanner({ condition, date }) {
  const lower = (condition || '').toLowerCase();
  const isRainy = lower.includes('hujan') && !lower.includes('cerah');

  const message = isRainy
    ? 'Kemungkinan hujan disertai petir ringan pada malam hari. Warga diharapkan tetap waspada jika beraktivitas di luar ruangan.'
    : 'Cuaca cerah diperkirakan akan berlangsung sepanjang hari. Nikmati aktivitas Anda di luar ruangan dengan nyaman.';

  const alertStyle = {
    backgroundColor: isRainy ? '#f44336' : '#4caf50',
    color: 'white',
    padding: '15px 20px',
    borderRadius: '8px',
    margin: '10px 20px 30px 20px',
  };

  const icon = isRainy ? '🌧️' : '⛅';

  return (
    <div style={alertStyle}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: '24px' }}>{icon}</span>
        <strong>Peringatan Cuaca Hari Ini</strong>
      </div>
      <p>{message}</p>
    </div>
  );
}

export default function AlertSection({ idCity = 1 }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/peringatan?idCity=${idCity}`)
      .then((res) => {
        if (!res.ok) throw new Error('Gagal ambil data peringatan');
        return res.json();
      })
      .then((json) => setData(json))
      .catch((err) => console.error('Error:', err));
  }, [idCity]);

  if (!data) return <p>Loading alert...</p>;

  return <AlertBanner condition={data.Cuaca} date={data.TANGGAL} />;
}
