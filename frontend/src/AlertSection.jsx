function AlertSection({ condition }) {
  const cond = (condition || '').toLowerCase();

  // Buat logika berdasarkan cuaca yang mungkin kamu kirim dari backend
  const isClear = cond.includes('cerah');
  const isRain = cond.includes('hujan');

  let icon = '🌈';
  let message = 'Cuaca tidak dapat dipastikan. Harap cek pembaruan selanjutnya.';
  let backgroundColor = '#9e9e9e'; // abu-abu default

  if (isRain) {
    icon = '🌧️';
    message = 'Kemungkinan hujan disertai petir ringan pada malam hari. Warga diharapkan tetap waspada jika beraktivitas di luar ruangan.';
    backgroundColor = '#f44336'; // merah
  } else if (isClear) {
    icon = '⛅';
    message = 'Cuaca cerah diperkirakan sepanjang hari. Nikmati aktivitas Anda di luar ruangan.';
    backgroundColor = '#4caf50'; // hijau
  }

  return (
    <div style={{ backgroundColor, color: 'white', padding: 15, borderRadius: 8, margin: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: '24px' }}>{icon}</span>
        <strong>Peringatan Cuaca Hari Ini</strong>
      </div>
      <p>{message}</p>
    </div>
  );
} 
