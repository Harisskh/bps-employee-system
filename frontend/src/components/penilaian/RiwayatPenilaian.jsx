// RiwayatPenilaian.jsx
import React from 'react';
import mockDatabase from '../../data/mockDatabase';

const RiwayatPenilaian = ({ user }) => {
  const userEvaluations = mockDatabase.evaluations.filter(e => e.evaluatorId === user.id);

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px', color: '#1f2937' }}>Riwayat Penilaian</h2>
      
      {userEvaluations.length === 0 ? (
        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '10px',
          textAlign: 'center',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>📋</div>
          <h3 style={{ color: '#6b7280', margin: '0 0 10px 0' }}>Belum Ada Penilaian</h3>
          <p style={{ color: '#6b7280', fontSize: '16px', margin: 0 }}>
            Anda belum pernah memberikan penilaian BerAKHLAK
          </p>
        </div>
      ) : (
        <div style={{ background: 'white', borderRadius: '10px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
          {userEvaluations.map(evaluation => (
            <div key={evaluation.id} style={{
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '20px',
              marginBottom: '15px',
              background: '#fafafa'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h3 style={{ color: '#374151', margin: 0 }}>
                  Penilaian {new Date(evaluation.createdAt).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </h3>
                <span style={{
                  background: '#dcfce7',
                  color: '#166534',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  SUBMITTED
                </span>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
                {Object.entries(evaluation.evaluations).map(([key, tokoh]) => {
                  const tokohNumber = key === 'tokoh1' ? 1 : key === 'tokoh2' ? 2 : 3;
                  const scoreRange = tokohNumber === 1 ? '96-100' : tokohNumber === 2 ? '86-95' : '80-85';
                  const avgScore = Object.values(tokoh.scores).reduce((a, b) => a + b, 0) / Object.values(tokoh.scores).length;
                  
                  return (
                    <div key={key} style={{
                      background: 'white',
                      padding: '15px',
                      borderRadius: '6px',
                      border: '1px solid #e5e7eb'
                    }}>
                      <h4 style={{ 
                        color: '#dc2626', 
                        marginBottom: '8px',
                        fontSize: '14px'
                      }}>
                        🏆 Tokoh {tokohNumber}
                      </h4>
                      <p style={{ 
                        fontWeight: '500', 
                        marginBottom: '5px',
                        fontSize: '14px'
                      }}>
                        {tokoh.name}
                      </p>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>
                        <div>Rentang: {scoreRange}</div>
                        <div>Rata-rata: {avgScore.toFixed(1)}</div>
                        <div>{Object.values(tokoh.scores).length} parameter dinilai</div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div style={{ 
                marginTop: '15px', 
                paddingTop: '15px', 
                borderTop: '1px solid #e5e7eb',
                fontSize: '12px',
                color: '#6b7280'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Waktu Submit: {new Date(evaluation.createdAt).toLocaleString('id-ID')}</span>
                  <span>Periode: Februari 2025</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RiwayatPenilaian;