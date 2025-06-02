import React, {useEffect, useState} from 'react'

function PrediksiCuaca({ idCity }){
    const [dataCuaca, setDataCuaca] = useState([]);

    useEffect(() => {
        if (!idCity) return;

        fetch(`http://127.0.0.1:8000/prediksi_cuaca/${idCity}`)
            .then((res) => res.json())
            .then((data) => setDataCuaca(data))
            .catch((err) => console.error('Gagal ambil data: ',err));
    }, [idCity]);
    
    return(
        <div>
            <h2>Tabel Prediksi Cuaca</h2>
            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>TANGGAL</th>
                        <th>Id_Kota</th>
                        <th>Nama Kota</th>
                        <th>TN</th>
                        <th>TX</th>
                        <th>TAVG</th>
                        <th>RH_AVG</th>
                        <th>RR</th>
                        <th>SS</th>
                        <th>Cuaca</th>
                    </tr>
                </thead>
                <tbody>
                    {dataCuaca.map((row,idx) => (
                        <tr key={idx}>
                            <td>{new Date(row.TANGGAL).toLocaleDateString()}</td>
                            <td>{row.Id_Kota}</td>
                            <td>{row.Kota}</td>
                            <td>{row.TN}</td>
                            <td>{row.TX}</td>
                            <td>{row.TAVG}</td>
                            <td>{row.RH_AVG}</td>
                            <td>{row.RR}</td>
                            <td>{row.SS}</td>
                            <td>{row.Cuaca}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default PrediksiCuaca;