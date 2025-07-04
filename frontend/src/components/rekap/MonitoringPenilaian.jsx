// MonitoringPenilaian.jsx
import React from 'react';
import mockDatabase from '../../data/mockDatabase';

const MonitoringPenilaian = () => {
  const staffList = mockDatabase.users.filter(u => u.role === 'STAFF' || u.role === 'PIMPINAN');
  const evaluations = mockDatabase.evaluations;
  
  const getEvaluationStatus = (userId) => {
    const hasEvaluated = evaluations.some(e => e.evaluatorId === userId);
    return hasEvaluated;
  };

  const sudahMengisi = staffList.filter(staff => getEvaluationStatus(staff.id));
  const belumMengisi = staffList.filter(staff => !getEvaluationStatus(staff.id));

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px', color: '#1f2937' }}>Monitoring Pengisian Penilaian</h2>
      
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
          <h3 style={{ color: '#10b981', margin: '0 0 10px 0' }}>✅ Sudah Mengisi</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>{sudahMengisi.length}</p>
        </div>
        
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#f59e0b', margin: '0 0 10px 0' }}>⏳ Belum Mengisi</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>{belumMengisi.length}</p>
        </div>
        
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#3b82f6', margin: '0 0 10px 0' }}>📊 Progress</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
            {Math.round((sudahMengisi.length / staffList.length) * 100)}%
          </p>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '20px'
      }}>
        {/* Sudah Mengisi */}
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#10b981', marginBottom: '15px' }}>✅ Sudah Mengisi Penilaian</h3>
          <div style={{ display: 'grid', gap: '10px' }}>
            {sudahMengisi.map(staff => (
              <div key={staff.id} style={{
                padding: '12px',
                background: '#f0fdf4',
                borderRadius: '6px',
                border: '1px solid #bbf7d0'
              }}>
                <div style={{ fontWeight: '500', color: '#166534' }}>{staff.nama}</div>
                <div style={{ fontSize: '12px', color: '#16a34a' }}>
                  {staff.nip} • {staff.jabatan}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Belum Mengisi */}
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#f59e0b', marginBottom: '15px' }}>⏳ Belum Mengisi Penilaian</h3>
          <div style={{ display: 'grid', gap: '10px' }}>
            {belumMengisi.map(staff => (
              <div key={staff.id} style={{
                padding: '12px',
                background: '#fefce8',
                borderRadius: '6px',
                border: '1px solid #fde047'
              }}>
                <div style={{ fontWeight: '500', color: '#92400e' }}>{staff.nama}</div>
                <div style={{ fontSize: '12px', color: '#ca8a04' }}>
                  {staff.nip} • {staff.jabatan}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonitoringPenilaian;