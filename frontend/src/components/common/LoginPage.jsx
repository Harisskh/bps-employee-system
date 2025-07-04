// LoginPage.jsx
import React, { useState } from 'react';
import mockDatabase from '../../data/mockDatabase';

const LoginPage = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    const user = mockDatabase.users.find(u => 
      u.username === credentials.username && u.password === credentials.password
    );
    
    if (user) {
      const { password, ...userWithoutPassword } = user;
      onLogin(userWithoutPassword);
    } else {
      setError('Username atau password salah');
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '15px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: '#dc2626',
            borderRadius: '50%',
            margin: '0 auto 15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '24px',
            fontWeight: 'bold'
          }}>
            BPS
          </div>
          <h2 style={{ margin: '0 0 10px 0', color: '#333' }}>Sistem Penilaian Pegawai</h2>
          <p style={{ margin: 0, color: '#666' }}>BPS Kabupaten Pringsewu</p>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div style={{
              background: '#fee2e2',
              border: '1px solid #fecaca',
              color: '#dc2626',
              padding: '10px',
              borderRadius: '8px',
              marginBottom: '20px',
              fontSize: '14px'
            }}>
              ❌ {error}
            </div>
          )}

          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontWeight: '500',
              color: '#374151'
            }}>
              Username
            </label>
            <input
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
              placeholder="Masukkan username"
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontWeight: '500',
              color: '#374151'
            }}>
              Password
            </label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
              placeholder="Masukkan password"
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              background: '#dc2626',
              color: 'white',
              padding: '12px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Masuk
          </button>
        </form>

        <div style={{
          marginTop: '30px',
          padding: '15px',
          background: '#f3f4f6',
          borderRadius: '8px'
        }}>
          <p style={{ margin: '0 0 10px 0', fontWeight: '600', fontSize: '14px' }}>Demo Login:</p>
          <div style={{ fontSize: '12px', color: '#6b7280' }}>
            <div style={{ margin: '5px 0', cursor: 'pointer' }} 
                 onClick={() => setCredentials({username: 'admin1810', password: 'bps123'})}>
              👤 Admin: admin1810 / bps123
            </div>
            <div style={{ margin: '5px 0', cursor: 'pointer' }} 
                 onClick={() => setCredentials({username: 'eko.purnomo', password: 'bps123'})}>
              👔 Pimpinan: eko.purnomo / bps123
            </div>
            <div style={{ margin: '5px 0', cursor: 'pointer' }} 
                 onClick={() => setCredentials({username: 'ahmadrifjayansyah', password: 'bps123'})}>
              👨‍💼 Staff: ahmadrifjayansyah / bps123
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;