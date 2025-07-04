// RekapPenilaian.jsx
import React, { useState } from 'react';

const RekapPenilaian = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('1');
  
  // Mock data untuk rekap
  const rekapData = [
    {
      id: 1,
      nama: 'Ahmad Rifjayansyah',
      tokoh1: { count: 8, avgScore: 98.5 },
      tokoh2: { count: 6, avgScore: 92.3 },
      tokoh3: { count: 4, avgScore: 84.2 },
      totalPemilih: 18,
      finalScore: 91.67,
      presensi: 95,
      ckp: 88,
      totalFinal: 91.2
    },
    {
      id: 2,
      nama: 'Ayu Setianingsih',
      tokoh1: { count: 7, avgScore: 97.8 },
      tokoh2: { count: 5, avgScore: 91.6 },
      tokoh3: { count: 3, avgScore: 83.8 },
      totalPemilih: 15,
      finalScore: 91.07,
      presensi: 92,
      ckp: 90,
      totalFinal: 91.1
    },
    {
      id: 3,
      nama: 'Resty Sopiyono',
      tokoh1: { count: 5, avgScore: 97.2 },
      tokoh2: { count: 4, avgScore: 90.8 },
      tokoh3: { count: 2, avgScore: 82.5 },
      totalPemilih: 11,
      finalScore: 90.17,
      presensi: 88,
      ckp: 92,
      totalFinal: 90.1
    }
  ];

  const topCandidates = rekapData
    .filter(item => item.totalPemilih >= 8)
    .sort((a, b) => b.totalFinal - a.totalFinal)
    .slice(0, 3);

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0, color: '#1f2937' }}>Rekap Penilaian BerAKHLAK</h2>
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          style={{
            padding: '8px 12px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            fontSize: '14px'
          }}
        >
          <option value="1">Februari 2025</option>
          <option value="2">Maret 2025</option>
        </select>
      </div>

      {/* Best Employee of the Month */}
      {topCandidates.length > 0 && (
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          marginBottom: '20px'
        }}>
          <h3 style={{ color: '#f59e0b', marginBottom: '20px', textAlign: 'center' }}>
            🏆 Best Employee of the Month - Februari 2025
          </h3>
          <div style={{
            background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
            padding: '30px',
            borderRadius: '10px',
            textAlign: 'center',
            border: '3px solid #f59e0b'
          }}>
            <div style={{
              fontSize: '48px',
              marginBottom: '10px'
            }}>👑</div>
            <h2 style={{ color: '#92400e', marginBottom: '10px' }}>{topCandidates[0].nama}</h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '14px' }}>
              <div>
                <strong>Skor Akhir:</strong> {topCandidates[0].totalFinal}
              </div>
              <div>
                <strong>Total Pemilih:</strong> {topCandidates[0].totalPemilih}
              </div>
              <div>
                <strong>BerAKHLAK:</strong> {topCandidates[0].finalScore}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detailed Rekap Table */}
      <div style={{
        background: 'white',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        marginBottom: '20px'
      }}>
        <h3 style={{ padding: '20px', margin: 0, background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
          📊 Rekap Penilaian Lengkap
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Nama</th>
                <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #e2e8f0' }}>Tokoh 1</th>
                <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #e2e8f0' }}>Tokoh 2</th>
                <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #e2e8f0' }}>Tokoh 3</th>
                <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #e2e8f0' }}>Total Pemilih</th>
                <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #e2e8f0' }}>BerAKHLAK (30%)</th>
                <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #e2e8f0' }}>Presensi (40%)</th>
                <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #e2e8f0' }}>CKP (30%)</th>
                <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #e2e8f0' }}>Skor Akhir</th>
              </tr>
            </thead>
            <tbody>
              {rekapData.map((item, index) => (
                <tr key={item.id} style={{ 
                  background: index % 2 === 0 ? 'white' : '#f9fafb',
                  borderLeft: topCandidates.includes(item) ? '4px solid #f59e0b' : 'none'
                }}>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {topCandidates.includes(item) && (
                        <span style={{ marginRight: '8px', fontSize: '16px' }}>
                          {topCandidates.indexOf(item) === 0 ? '🥇' : topCandidates.indexOf(item) === 1 ? '🥈' : '🥉'}
                        </span>
                      )}
                      {item.nama}
                    </div>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '12px' }}>
                      <div>{item.tokoh1.count} pemilih</div>
                      <div style={{ color: '#6b7280' }}>Avg: {item.tokoh1.avgScore}</div>
                    </div>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '12px' }}>
                      <div>{item.tokoh2.count} pemilih</div>
                      <div style={{ color: '#6b7280' }}>Avg: {item.tokoh2.avgScore}</div>
                    </div>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '12px' }}>
                      <div>{item.tokoh3.count} pemilih</div>
                      <div style={{ color: '#6b7280' }}>Avg: {item.tokoh3.avgScore}</div>
                    </div>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #e2e8f0' }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      background: item.totalPemilih >= 8 ? '#dcfce7' : '#fef3c7',
                      color: item.totalPemilih >= 8 ? '#166534' : '#92400e'
                    }}>
                      {item.totalPemilih}
                    </span>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #e2e8f0' }}>
                    {item.finalScore}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #e2e8f0' }}>
                    {item.presensi}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #e2e8f0' }}>
                    {item.ckp}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #e2e8f0' }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      background: '#e0f2fe',
                      color: '#0369a1'
                    }}>
                      {item.totalFinal}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Keterangan */}
      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ marginBottom: '15px', color: '#374151' }}>📝 Keterangan</h3>
        <div style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.6' }}>
          <p style={{ marginBottom: '8px' }}>
            • <strong>Kandidat yang memenuhi syarat:</strong> Pegawai dengan total pemilih ≥ 8
          </p>
          <p style={{ marginBottom: '8px' }}>
            • <strong>Perhitungan BerAKHLAK:</strong> (Tokoh 1 + Tokoh 2 + Tokoh 3) ÷ 3
          </p>
          <p style={{ marginBottom: '8px' }}>
            • <strong>Skor Akhir:</strong> (BerAKHLAK × 30%) + (Presensi × 40%) + (CKP × 30%)
          </p>
          <p style={{ margin: 0 }}>
            • <strong>Best Employee:</strong> Kandidat dengan skor akhir tertinggi
          </p>
        </div>
      </div>
    </div>
  );
};

export default RekapPenilaian;