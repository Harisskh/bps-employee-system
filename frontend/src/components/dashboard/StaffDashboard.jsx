// StaffDashboard.jsx
import React from 'react';

const StaffDashboard = ({ user, setCurrentPage }) => {
  const [hasSubmitted, setHasSubmitted] = React.useState(false);

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px', color: '#1f2937' }}>Dashboard Staff</h2>
      
      {!hasSubmitted && (
        <div style={{
          background: '#fef3c7',
          border: '2px solid #f59e0b',
          padding: '20px',
          borderRadius: '10px',
          marginBottom: '20px'
        }}>
          <h3 style={{ color: '#92400e', margin: '0 0 10px 0' }}>⚠️ Belum Mengisi Penilaian</h3>
          <p style={{ color: '#92400e', margin: 0 }}>
            Anda belum mengisi penilaian BerAKHLAK untuk periode Februari 2025
          </p>
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px'
      }}>
        <div style={{
          background: 'white',
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#dc2626', margin: '0 0 15px 0' }}>📝 Penilaian BerAKHLAK</h3>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            Isi penilaian 3 tokoh BerAKHLAK terbaik bulan ini
          </p>
          <button 
            onClick={() => setCurrentPage('penilaian')}
            style={{
              background: '#dc2626',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            {hasSubmitted ? 'Lihat Penilaian' : 'Mulai Penilaian'}
          </button>
        </div>

        <div style={{
          background: 'white',
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#3b82f6', margin: '0 0 15px 0' }}>📋 Riwayat Penilaian</h3>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            Lihat penilaian yang telah Anda berikan
          </p>
          <button 
            onClick={() => setCurrentPage('riwayat')}
            style={{
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Lihat Riwayat
          </button>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;