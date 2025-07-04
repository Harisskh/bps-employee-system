// AdminDashboard.jsx
import React from 'react';
import mockDatabase from '../../data/mockDatabase';

const AdminDashboard = () => {
  const evaluationStats = {
    totalPegawai: mockDatabase.users.filter(u => u.role === 'STAFF').length,
    sudahMengisi: 15,
    belumMengisi: 5,
    periode: 'Februari 2025'
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px', color: '#1f2937' }}>Dashboard Admin</h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#3b82f6', margin: '0 0 10px 0' }}>👥 Total Pegawai</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>{evaluationStats.totalPegawai}</p>
        </div>
        
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#10b981', margin: '0 0 10px 0' }}>✅ Sudah Mengisi</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>{evaluationStats.sudahMengisi}</p>
        </div>
        
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#f59e0b', margin: '0 0 10px 0' }}>⏳ Belum Mengisi</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>{evaluationStats.belumMengisi}</p>
        </div>
        
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#8b5cf6', margin: '0 0 10px 0' }}>📅 Periode Aktif</h3>
          <p style={{ fontSize: '16px', fontWeight: 'bold', margin: 0 }}>{evaluationStats.periode}</p>
        </div>
      </div>

      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ marginBottom: '15px', color: '#374151' }}>📊 Progress Pengisian Penilaian</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{
            width: '100%',
            height: '20px',
            background: '#e5e7eb',
            borderRadius: '10px',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              width: `${(evaluationStats.sudahMengisi / evaluationStats.totalPegawai) * 100}%`,
              background: '#10b981',
              transition: 'width 0.3s ease'
            }}></div>
          </div>
          <span style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>
            {Math.round((evaluationStats.sudahMengisi / evaluationStats.totalPegawai) * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;