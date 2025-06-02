import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

function AdditionalCards() {
  const [data, setData] = useState(null);

  useEffect(() => {
    Papa.parse('/weather_data_surabaya.csv', {
      header: true,
      download: true,
      complete: (result) => {
        setData(result.data[0]); // Ambil baris pertama (data terbaru)
      },
    });
  }, []);

  if (!data) return <div>Memuat data...</div>;

  // Parsing nilai
  const kualitasUdara = parseInt(data.kualitas_udara);
  const uvIndex = parseInt(data.uv_index);
  const kelembapan = parseFloat(data.kelembapan).toFixed(0);

  // Interpretasi kualitas udara
  let kualitasText = 'Tidak Diketahui';
  if (kualitasUdara <= 50) kualitasText = 'Baik';
  else if (kualitasUdara <= 100) kualitasText = 'Sedang';
  else if (kualitasUdara <= 150) kualitasText = 'Tidak Sehat';
  else kualitasText = 'Buruk';

  // Interpretasi UV Index
  let uvLevel = 'Rendah';
  if (uvIndex >= 3 && uvIndex < 6) uvLevel = 'Sedang';
  else if (uvIndex >= 6 && uvIndex < 8) uvLevel = 'Tinggi';
  else if (uvIndex >= 8) uvLevel = 'Sangat Tinggi';

  // Interpretasi Kelembapan
  let kelembapanDesc = 'Normal';
  if (kelembapan < 40) kelembapanDesc = 'Udara kering';
  else if (kelembapan < 70) kelembapanDesc = 'Kelembapan nyaman';
  else kelembapanDesc = 'Terasa gerah';

  return (
    <div className="additional-cards">
      {/* Kualitas Udara */}
      <div className="info-card">
        <h3>🌬️ Kualitas Udara</h3>
        <div>Kualitas: <strong>{kualitasText}</strong></div>
        <div className="info-content">
          <p>
            {kualitasText === 'Baik' && 'Kualitas udara saat ini baik dan aman untuk aktivitas luar ruangan.'}
            {kualitasText === 'Sedang' && 'Udara cukup aman, namun tetap waspada bagi yang sensitif.'}
            {kualitasText === 'Tidak Sehat' && 'Disarankan mengurangi aktivitas luar bagi kelompok sensitif.'}
            {kualitasText === 'Buruk' && 'Hindari aktivitas luar ruangan jika memungkinkan.'}
          </p>
        </div>
      </div>

      {/* UV Index */}
      <div className="info-card">
        <h3>☀️ UV Index</h3>
        <div>Level: <strong>{uvLevel}</strong></div>
        <div className="info-content">
          <p>
            {uvLevel === 'Rendah' && 'Paparan sinar UV rendah. Aman untuk beraktivitas di luar.'}
            {uvLevel === 'Sedang' && 'Gunakan pelindung matahari bila berada di luar dalam waktu lama.'}
            {uvLevel === 'Tinggi' && 'Paparan UV tinggi. Gunakan tabir surya dan pelindung tubuh.'}
            {uvLevel === 'Sangat Tinggi' && 'Sangat berisiko. Hindari keluar rumah di siang hari.'}
          </p>
        </div>
      </div>

      {/* Kelembapan */}
      <div className="info-card">
        <h3>💧 Kelembapan </h3>
        <div>Tingkat Kelembapan: {kelembapan}% - <strong>{kelembapanDesc}</strong></div>
        <div className="info-content">
          <p>
            {kelembapanDesc === 'Udara kering' && 'Udara terasa kering. Minum cukup air dan gunakan pelembap jika perlu.'}
            {kelembapanDesc === 'Kelembapan nyaman' && 'Kelembapan berada di level yang nyaman untuk aktivitas sehari-hari.'}
            {kelembapanDesc === 'Terasa gerah' && 'Udara terasa lembap dan bisa membuat tubuh terasa gerah.'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdditionalCards;
