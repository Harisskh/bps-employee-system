// LeaderboardComponent.jsx
import React from 'react';

const LeaderboardComponent = () => {
  const leaderboardData = [
    { rank: 1, nama: 'Ahmad Rifjayansyah', skor: 91.2, pemilih: 18, badge: '🥇' },
    { rank: 2, nama: 'Ayu Setianingsih', skor: 91.1, pemilih: 15, badge: '🥈' },
    { rank: 3, nama: 'Resty Sopiyono', skor: 90.1, pemilih: 11, badge: '🥉' },
    { rank: 4, nama: 'Sela Anisada', skor: 89.5, pemilih: 9, badge: '🏅' },
    { rank: 5, nama: 'Esa Anindika', skor: 88.8, pemilih: 8, badge: '🏅' }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px', color: '#1f2937' }}>🏆 Leaderboard Best Employee</h2>
      
      {/* Winner Podium */}
      <div style={{
        background: 'white',
        padding: '40px 20px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        marginBottom: '20px'
      }}>
        <h3 style={{ textAlign: 'center', marginBottom: '30px', color: '#374151' }}>
          🏆 Top 3 Februari 2025
        </h3>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'end', gap: '20px' }}>
          {/* 2nd Place */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '80px',
              height: '100px',
              background: '#e5e7eb',
              borderRadius: '10px 10px 0 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '40px',
              marginBottom: '10px'
            }}>
              🥈
            </div>
            <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{leaderboardData[1].nama}</div>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>Skor: {leaderboardData[1].skor}</div>
          </div>

          {/* 1st Place */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '100px',
              height: '120px',
              background: '#fbbf24',
              borderRadius: '10px 10px 0 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '50px',
              marginBottom: '10px'
            }}>
              🥇
            </div>
            <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{leaderboardData[0].nama}</div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>Skor: {leaderboardData[0].skor}</div>
          </div>

          {/* 3rd Place */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: '#cd7c2f',
              borderRadius: '10px 10px 0 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '40px',
              marginBottom: '10px'
            }}>
              🥉
            </div>
            <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{leaderboardData[2].nama}</div>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>Skor: {leaderboardData[2].skor}</div>
          </div>
        </div>
      </div>

      {/* Full Leaderboard */}
      <div style={{
        background: 'white',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ padding: '20px', margin: 0, background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
          📊 Ranking Lengkap
        </h3>
        <div style={{ display: 'grid', gap: '1px', background: '#e5e7eb' }}>
          {leaderboardData.map((item, index) => (
            <div key={index} style={{
              padding: '20px',
              background: 'white',
              display: 'flex',
              alignItems: 'center',
              gap: '20px'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                background: index < 3 ? '#fbbf24' : '#e5e7eb',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                fontWeight: 'bold',
                color: index < 3 ? 'white' : '#6b7280'
              }}>
                {item.rank}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '5px' }}>
                  {item.badge} {item.nama}
                </div>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>
                  Skor: {item.skor} | Pemilih: {item.pemilih}
                </div>
              </div>
              <div style={{
                padding: '8px 16px',
                background: index === 0 ? '#fbbf24' : index === 1 ? '#9ca3af' : index === 2 ? '#cd7c2f' : '#e5e7eb',
                borderRadius: '20px',
                color: index < 3 ? 'white' : '#6b7280',
                fontSize: '14px',
                fontWeight: 'bold'
              }}>
                {item.skor}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaderboardComponent;