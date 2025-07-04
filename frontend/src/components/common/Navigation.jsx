// Navigation.jsx
import React from 'react';

const Navigation = ({ user, logout, currentPage, setCurrentPage }) => {
  const menuItems = {
    ADMIN: [
      { key: 'dashboard', label: '🏠 Dashboard', icon: '🏠' },
      { key: 'pegawai', label: '👥 Data Pegawai', icon: '👥' },
      { key: 'periode', label: '📅 Periode Penilaian', icon: '📅' },
      { key: 'aspek', label: '📊 Aspek Penilaian', icon: '📊' },
      { key: 'presensi', label: '🕐 Presensi', icon: '🕐' },
      { key: 'ckp', label: '📋 CKP', icon: '📋' },
      { key: 'rekap', label: '📈 Rekap Penilaian', icon: '📈' }
    ],
    PIMPINAN: [
      { key: 'dashboard', label: '🏠 Dashboard', icon: '🏠' },
      { key: 'penilaian', label: '📝 Penilaian', icon: '📝' },
      { key: 'riwayat', label: '📋 Riwayat', icon: '📋' },
      { key: 'monitoring', label: '👁️ Monitoring', icon: '👁️' },
      { key: 'leaderboard', label: '🏆 Best Employee', icon: '🏆' },
      { key: 'view-pegawai', label: '👥 Data Pegawai', icon: '👥' },
      { key: 'rekap', label: '📈 Rekap Penilaian', icon: '📈' }
    ],
    STAFF: [
      { key: 'dashboard', label: '🏠 Dashboard', icon: '🏠' },
      { key: 'penilaian', label: '📝 Penilaian', icon: '📝' },
      { key: 'riwayat', label: '📋 Riwayat', icon: '📋' }
    ]
  };

  return (
    <div style={{
      width: '250px',
      background: '#1f2937',
      color: 'white',
      padding: '20px',
      minHeight: '100vh',
      boxSizing: 'border-box'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <div style={{
          width: '60px',
          height: '60px',
          background: '#dc2626',
          borderRadius: '50%',
          margin: '0 auto 15px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
          fontWeight: 'bold'
        }}>
          BPS
        </div>
        <h3 style={{ margin: '0 0 5px 0', fontSize: '16px' }}>BPS Pringsewu</h3>
        <p style={{ margin: 0, fontSize: '12px', opacity: 0.8 }}>{user.nama}</p>
      </div>

      <nav>
        {menuItems[user.role].map(item => (
          <button
            key={item.key}
            onClick={() => setCurrentPage(item.key)}
            style={{
              width: '100%',
              background: currentPage === item.key ? '#dc2626' : 'transparent',
              color: 'white',
              border: 'none',
              padding: '12px 16px',
              borderRadius: '8px',
              textAlign: 'left',
              cursor: 'pointer',
              marginBottom: '8px',
              fontSize: '14px',
              transition: 'background-color 0.2s'
            }}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
        <button
          onClick={logout}
          style={{
            width: '100%',
            background: '#ef4444',
            color: 'white',
            border: 'none',
            padding: '12px 16px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
};

export default Navigation;