import React, { useState } from 'react';
import './LoginPage.css'; // Impor file CSS untuk styling
import logoBps from './logobps.png'; // Impor logo dari file lokal di dalam folder src

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Untuk sementara, kita hanya tampilkan di console
    // Nanti di sini Anda akan memanggil API backend
    console.log('Login attempt with:', { username, password });
    alert(`Login dengan:\nUsername: ${username}\nPassword: ${password}`);
  };

  return (
    <div className="login-page-container">
      <div className="login-card">
        <div className="logo-container">
          {/* Menggunakan logo yang sudah diimpor dari file lokal */}
          <img 
            src={logoBps}
            alt="Logo BPS" 
            className="logo-image"
          />
        </div>
        
        <h1>Sistem Penilaian Pegawai</h1>
        <p className="subtitle">BPS Kabupaten Pringsewu</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            {/* Ikon User SVG */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12ZM12 12C10.5333 12 9.13333 12.7 8.13333 13.8667C6.9 15.3 4 17.4 4 20H20C20 17.4 17.1 15.3 15.8667 13.8667C14.8667 12.7 13.4667 12 12 12Z" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            {/* Ikon Kunci SVG */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="11" width="18" height="11" rx="2" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
