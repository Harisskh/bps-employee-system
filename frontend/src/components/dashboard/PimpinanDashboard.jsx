// PimpinanDashboard.jsx
import React from 'react';

const PimpinanDashboard = ({ user, setCurrentPage }) => {
  const bestEmployees = [
    { nama: 'Ahmad Rifjayansyah', skor: 95.2, pemilih: 12 },
    { nama: 'Ayu Setianingsih', skor: 94.8, pemilih: 11 },
    { nama: 'Resty Sopiyono', skor: 94.1, pemilih: 10 }
  ];

  const hasSubmittedEvaluation = false; // Check if pimpinan has submitted evaluation

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px', color: '#1f2937' }}>Dashboard Pimpinan</h2>
      
      {/* Alert untuk penilaian */}
      {!hasSubmittedEvaluation && (
        <div style={{
          background: '#fef3c7',
          border: '2px solid #f59e0b',
          padding: '20px',
          borderRadius: '10px',
          marginBottom: '20px'
        }}>
          <h3 style={{ color: '#92400e', margin: '0 0 10px 0' }}>⚠️ Belum Mengisi Penilaian</h3>
          <p style={{ color: '#92400e', margin: '0 0 15px 0' }}>
            Anda belum mengisi penilaian BerAKHLAK untuk periode Februari 2025
          </p>
          <button 
            onClick={() => setCurrentPage('penilaian')}
            style={{
              background: '#f59e0b',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold'
            }}
          >
            Isi Penilaian Sekarang
          </button>
        </div>
      )}
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#f59e0b', margin: '0 0 15px 0' }}>🏆 Best Employee February</h3>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: '#fef3c7',
              borderRadius: '50%',
              margin: '0 auto 10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '30px'
            }}>
              👑
            </div>
            <h4 style={{ margin: '0 0 5px 0', color: '#374151' }}>{bestEmployees[0].nama}</h4>
            <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>
              Skor: {bestEmployees[0].skor} | Pemilih: {bestEmployees[0].pemilih}
            </p>
          </div>
        </div>

        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#10b981', margin: '0 0 15px 0' }}>📈 Monitoring Progress</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '14px' }}>Sudah Mengisi</span>
            <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#10b981' }}>15/20</span>
          </div>
          <div style={{
            width: '100%',
            height: '10px',
            background: '#e5e7eb',
            borderRadius: '5px',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              width: '75%',
              background: '#10b981'
            }}></div>
          </div>
          <p style={{ margin: '10px 0 0 0', fontSize: '12px', color: '#6b7280' }}>
            75% pegawai telah mengisi penilaian
          </p>
        </div>
      </div>

      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ marginBottom: '15px', color: '#374151' }}>🏅 Top 3 Candidates</h3>
        <div style={{ display: 'grid', gap: '10px' }}>
          {bestEmployees.map((employee, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              padding: '15px',
              background: '#f8fafc',
              borderRadius: '8px',
              border: index === 0 ? '2px solid #f59e0b' : '1px solid #e2e8f0'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: index === 0 ? '#f59e0b' : index === 1 ? '#9ca3af' : '#cd7c2f',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                marginRight: '15px'
              }}>
                {index + 1}
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: '0 0 5px 0', color: '#374151' }}>{employee.nama}</h4>
                <p style={{ margin: 0, color: '#6b7280', fontSize: '12px' }}>
                  Skor: {employee.skor} | Jumlah Pemilih: {employee.pemilih}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PimpinanDashboard;