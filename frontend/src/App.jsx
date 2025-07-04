import React, { useState, createContext, useContext } from 'react';

// Auth Context
const AuthContext = createContext();

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock Database
const mockDatabase = {
  users: [
    { id: 1, nip: '000000000000000000', nama: 'Administrator BPS', username: 'admin1810', role: 'ADMIN', password: 'bps123', jenisKelamin: 'LK', jabatan: 'Administrator', golongan: 'IV/c', email: 'admin@bps.go.id' },
    { id: 2, nip: '197309131994031004', nama: 'Eko Purnomo, SST., MM', username: 'eko.purnomo', role: 'PIMPINAN', password: 'bps123', jenisKelamin: 'LK', jabatan: 'Kepala BPS', golongan: 'IV/b', email: 'eko@bps.go.id' },
    { id: 3, nip: '200006222023021004', nama: 'Ahmad Rifjayansyah, S.Tr.Stat.', username: 'ahmadrifjayansyah', role: 'STAFF', password: 'bps123', jenisKelamin: 'LK', jabatan: 'Statistisi', golongan: 'III/a', email: 'rifja@bps.go.id' },
    { id: 4, nip: '200001262023022001', nama: 'Dini Alfitri Zahra, A.Md.Stat.', username: 'dinialfitrizahra', role: 'STAFF', password: 'bps123', jenisKelamin: 'PR', jabatan: 'Statistisi', golongan: 'II/c', email: 'dini@bps.go.id' },
    { id: 5, nip: '200002092023022003', nama: 'Ayu Setianingsih, A.Md.Stat.', username: 'ayusetianingsih', role: 'STAFF', password: 'bps123', jenisKelamin: 'PR', jabatan: 'Statistisi', golongan: 'II/c', email: 'ayu@bps.go.id' },
    { id: 6, nip: '198810132010122005', nama: 'Resty Sopiyono, SST, M.E.K.K.', username: 'sresty', role: 'STAFF', password: 'bps123', jenisKelamin: 'PR', jabatan: 'Statistisi', golongan: 'IV/a', email: 'resty@bps.go.id' },
    { id: 7, nip: '198902082010121005', nama: 'Ahmad Rifki Febrianto, SST, M.EKK', username: 'arifki', role: 'STAFF', password: 'bps123', jenisKelamin: 'LK', jabatan: 'Pranata Komputer', golongan: 'III/d', email: 'rifki@bps.go.id' },
    { id: 8, nip: '199707132019122001', nama: 'Sela Anisada, S.Tr.Stat.', username: 'sela.anisada', role: 'STAFF', password: 'bps123', jenisKelamin: 'PR', jabatan: 'Pranata Komputer', golongan: 'III/b', email: 'sela@bps.go.id' },
    { id: 9, nip: '199910302022012002', nama: 'Esa Anindika Sari, S.Tr.Stat.', username: 'esa.anindika', role: 'STAFF', password: 'bps123', jenisKelamin: 'PR', jabatan: 'Statistisi', golongan: 'III/a', email: 'esa@bps.go.id' },
    { id: 10, nip: '199911292022012002', nama: 'Miftahul Husna, S.Tr.Stat.', username: 'miftahul.husna', role: 'STAFF', password: 'bps123', jenisKelamin: 'PR', jabatan: 'Statistisi', golongan: 'III/a', email: 'miftah@bps.go.id' }
  ],
  evaluations: [],
  periods: [
    { id: 1, tahun: 2025, bulan: 1, namaPeriode: 'Februari 2025', isActive: true },
    { id: 2, tahun: 2025, bulan: 2, namaPeriode: 'Maret 2025', isActive: false }
  ],
  presensi: [],
  ckp: [],
  parameters: [
    { id: 1, namaParameter: 'Perilaku Melayani Sepenuh Hati, Ramah, dan Solutif', kategori: 'berakhlak', urutan: 1 },
    { id: 2, namaParameter: 'Perilaku Bertanggung Jawab, Disiplin, dan Jujur', kategori: 'berakhlak', urutan: 2 },
    { id: 3, namaParameter: 'Perilaku Profesional, Senang Belajar, dan Berbagi Pengetahuan', kategori: 'berakhlak', urutan: 3 },
    { id: 4, namaParameter: 'Perilaku Suka Menolong, Toleransi, dan Menghargai Keberagaman', kategori: 'berakhlak', urutan: 4 },
    { id: 5, namaParameter: 'Perilaku Menjaga Nama Baik BPS dan Berdedikasi', kategori: 'berakhlak', urutan: 5 },
    { id: 6, namaParameter: 'Perilaku Kreatif, Inovatif, dan Siap terhadap Perubahan', kategori: 'berakhlak', urutan: 6 },
    { id: 7, namaParameter: 'Perilaku Komunikatif dan Mampu Bekerja Sama antar Tim Kerja', kategori: 'berakhlak', urutan: 7 },
    { id: 8, namaParameter: 'Penampilan dan Kerapian', kategori: 'berakhlak', urutan: 8 }
  ]
};

// Auth Provider
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Login Page
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

// Navigation Component
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
      { key: 'monitoring', label: '👁️ Monitoring', icon: '👁️' },
      { key: 'leaderboard', label: '🏆 Best Employee', icon: '🏆' },
      { key: 'pegawai', label: '👥 Data Pegawai', icon: '👥' },
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

// Dashboard Components
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

const PimpinanDashboard = () => {
  const bestEmployees = [
    { nama: 'Ahmad Rifjayansyah', skor: 95.2, pemilih: 12 },
    { nama: 'Ayu Setianingsih', skor: 94.8, pemilih: 11 },
    { nama: 'Resty Sopiyono', skor: 94.1, pemilih: 10 }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px', color: '#1f2937' }}>Dashboard Pimpinan</h2>
      
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

const StaffDashboard = ({ user, setCurrentPage }) => {
  const [hasSubmitted, setHasSubmitted] = useState(false);

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

// Data Pegawai Component
const DataPegawai = () => {
  const [pegawai, setPegawai] = useState(mockDatabase.users);
  const [showForm, setShowForm] = useState(false);
  const [editingPegawai, setEditingPegawai] = useState(null);
  const [formData, setFormData] = useState({
    nip: '',
    nama: '',
    username: '',
    jenisKelamin: '',
    email: '',
    jabatan: '',
    golongan: '',
    role: 'STAFF'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingPegawai) {
      setPegawai(pegawai.map(p => p.id === editingPegawai.id ? {...formData, id: editingPegawai.id} : p));
    } else {
      const newPegawai = {...formData, id: Date.now(), password: 'bps123'};
      setPegawai([...pegawai, newPegawai]);
    }
    setShowForm(false);
    setEditingPegawai(null);
    setFormData({
      nip: '', nama: '', username: '', jenisKelamin: '', email: '',
      jabatan: '', golongan: '', role: 'STAFF'
    });
  };

  const handleEdit = (pegawai) => {
    setEditingPegawai(pegawai);
    setFormData(pegawai);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Yakin ingin menghapus data pegawai ini?')) {
      setPegawai(pegawai.filter(p => p.id !== id));
    }
  };

  if (showForm) {
    return (
      <div style={{ padding: '20px' }}>
        <h2 style={{ marginBottom: '20px', color: '#1f2937' }}>
          {editingPegawai ? 'Edit Pegawai' : 'Tambah Pegawai'}
        </h2>
        
        <form onSubmit={handleSubmit} style={{ maxWidth: '600px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>NIP</label>
              <input
                type="text"
                value={formData.nip}
                onChange={(e) => setFormData({...formData, nip: e.target.value})}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  boxSizing: 'border-box'
                }}
                required
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Nama</label>
              <input
                type="text"
                value={formData.nama}
                onChange={(e) => setFormData({...formData, nama: e.target.value})}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  boxSizing: 'border-box'
                }}
                required
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Username</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  boxSizing: 'border-box'
                }}
                required
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Jenis Kelamin</label>
              <select
                value={formData.jenisKelamin}
                onChange={(e) => setFormData({...formData, jenisKelamin: e.target.value})}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  boxSizing: 'border-box'
                }}
                required
              >
                <option value="">Pilih...</option>
                <option value="LK">Laki-laki</option>
                <option value="PR">Perempuan</option>
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  boxSizing: 'border-box'
                }}
                required
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Jabatan</label>
              <input
                type="text"
                value={formData.jabatan}
                onChange={(e) => setFormData({...formData, jabatan: e.target.value})}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  boxSizing: 'border-box'
                }}
                required
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Golongan</label>
              <input
                type="text"
                value={formData.golongan}
                onChange={(e) => setFormData({...formData, golongan: e.target.value})}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Role</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  boxSizing: 'border-box'
                }}
                required
              >
                <option value="STAFF">Staff</option>
                <option value="ADMIN">Admin</option>
                <option value="PIMPINAN">Pimpinan</option>
              </select>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="submit"
              style={{
                background: '#10b981',
                color: 'white',
                padding: '12px 24px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              {editingPegawai ? 'Update' : 'Simpan'}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              style={{
                background: '#6b7280',
                color: 'white',
                padding: '12px 24px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0, color: '#1f2937' }}>Data Pegawai</h2>
        <button
          onClick={() => setShowForm(true)}
          style={{
            background: '#3b82f6',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          + Tambah Pegawai
        </button>
      </div>
      
      <div style={{ background: 'white', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc' }}>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>NIP</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Nama</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Username</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Role</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pegawai.map(p => (
              <tr key={p.id}>
                <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>{p.nip}</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>{p.nama}</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>{p.username}</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    background: p.role === 'ADMIN' ? '#fee2e2' : p.role === 'PIMPINAN' ? '#fef3c7' : '#e0f2fe',
                    color: p.role === 'ADMIN' ? '#dc2626' : p.role === 'PIMPINAN' ? '#f59e0b' : '#0369a1'
                  }}>
                    {p.role}
                  </span>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>
                  <button
                    onClick={() => handleEdit(p)}
                    style={{
                      background: '#f59e0b',
                      color: 'white',
                      padding: '5px 10px',
                      border: 'none',
                      borderRadius: '3px',
                      cursor: 'pointer',
                      marginRight: '5px',
                      fontSize: '12px'
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    style={{
                      background: '#ef4444',
                      color: 'white',
                      padding: '5px 10px',
                      border: 'none',
                      borderRadius: '3px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// BerAKHLAK Opening Component
const BerAKHLAKOpening = ({ onStart }) => {
  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '15px',
        padding: '40px',
        maxWidth: '800px',
        width: '100%',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ 
            fontSize: '48px', 
            fontWeight: 'bold', 
            color: '#dc2626',
            margin: '0 0 10px 0' 
          }}>
            BerAKHLAK
          </h1>
          <p style={{ 
            fontSize: '18px', 
            color: '#374151',
            margin: '0 0 20px 0',
            lineHeight: '1.6'
          }}>
            <strong>Berorientasi Pelayanan Akuntabel Kompeten</strong><br />
            <strong>Harmonis Loyal Adaptif Kolaboratif</strong>
          </p>
          <h2 style={{ 
            fontSize: '24px', 
            color: '#1f2937',
            margin: 0 
          }}>
            Tokoh BerAKHLAK of the month 2025
          </h2>
        </div>

        <div style={{
          background: '#f3f4f6',
          padding: '25px',
          borderRadius: '10px',
          marginBottom: '30px'
        }}>
          <h3 style={{ 
            color: '#374151', 
            marginBottom: '15px',
            fontSize: '18px',
            fontWeight: 'bold'
          }}>
            HARAP PERHATIAN
          </h3>
          <div style={{ 
            fontSize: '14px', 
            color: '#4b5563', 
            lineHeight: '1.6' 
          }}>
            <p style={{ marginBottom: '12px' }}>
              - Formulir ini merupakan penilaian untuk memilih pegawai BPS Kabupaten Pringsewu 
              dengan penerapan nilai-nilai BerAKHLAK terbaik pada periode satu bulan.
            </p>
            <p style={{ marginBottom: '12px' }}>
              - BerAKHLAK terdiri dari <strong>Berorientasi Pelayanan, Akuntabel, Kompeten, 
              Harmonis, Loyal, Adaptif,</strong> dan <strong>Kolaboratif.</strong>
            </p>
            <p style={{ marginBottom: '12px' }}>
              - Tokoh BerAKHLAK yang dipilih merupakan pegawai yang memiliki{' '}
              <strong>KEDISIPLINAN</strong> paling baik (dari segi presensi kerja dan lain sebagainya)
            </p>
            <p style={{ margin: 0 }}>
              - Tokoh BerAKHLAK yang dipilih merupakan pegawai yang dapat dijadikan contoh positif 
              dalam lingkungan kerja
            </p>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button
            onClick={onStart}
            style={{
              background: '#dc2626',
              color: 'white',
              border: 'none',
              padding: '15px 40px',
              borderRadius: '10px',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 4px 10px rgba(220, 38, 38, 0.3)'
            }}
          >
            Mulai Penilaian
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Evaluation Form Component
const BerAKHLAKEvaluationForm = ({ onComplete, onBack, user }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [evaluations, setEvaluations] = useState({
    tokoh1: { name: '', scores: {} },
    tokoh2: { name: '', scores: {} },
    tokoh3: { name: '', scores: {} }
  });

  const staffList = mockDatabase.users.filter(u => u.role === 'STAFF' && u.id !== user.id);

  const getScoreRange = (tokohNumber) => {
    switch(tokohNumber) {
      case 1: return { min: 96, max: 100 };
      case 2: return { min: 86, max: 95 };
      case 3: return { min: 80, max: 85 };
      default: return { min: 80, max: 100 };
    }
  };

  const handleStaffSelect = (tokohKey, staffName) => {
    setEvaluations(prev => ({
      ...prev,
      [tokohKey]: {
        ...prev[tokohKey],
        name: staffName
      }
    }));
  };

  const handleScoreChange = (tokohKey, paramIndex, score) => {
    setEvaluations(prev => ({
      ...prev,
      [tokohKey]: {
        ...prev[tokohKey],
        scores: {
          ...prev[tokohKey].scores,
          [paramIndex]: parseInt(score) || ''
        }
      }
    }));
  };

  const isStepComplete = () => {
    const tokohKey = `tokoh${currentStep}`;
    const tokoh = evaluations[tokohKey];
    
    if (!tokoh.name) return false;
    
    for (let i = 0; i < 8; i++) {
      if (!tokoh.scores[i]) return false;
    }
    
    return true;
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const evaluation = {
      id: Date.now(),
      evaluatorId: user.id,
      evaluatorName: user.nama,
      periodId: 1,
      evaluations: evaluations,
      createdAt: new Date().toISOString()
    };
    
    mockDatabase.evaluations.push(evaluation);
    
    alert('Penilaian berhasil disimpan!\n\nTerima kasih telah mengisi penilaian BerAKHLAK.');
    onComplete();
  };

  const tokohKey = `tokoh${currentStep}`;
  const currentTokoh = evaluations[tokohKey];
  const scoreRange = getScoreRange(currentStep);

  return (
    <div style={{ 
      minHeight: '100vh',
      background: '#f9fafb',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '15px',
        padding: '30px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          background: '#dc2626',
          color: 'white',
          padding: '20px',
          borderRadius: '10px',
          marginBottom: '30px',
          textAlign: 'center'
        }}>
          <h2 style={{ margin: '0 0 10px 0', fontSize: '24px' }}>
            Tokoh BerAKHLAK ke-{currentStep}
          </h2>
          <p style={{ margin: 0, opacity: 0.9 }}>
            Silahkan pilih pegawai dengan penerapan nilai-nilai BerAKHLAK terbaik ke-{currentStep}
          </p>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '10px'
          }}>
            {[1, 2, 3].map(step => (
              <div
                key={step}
                style={{
                  width: '30%',
                  height: '8px',
                  background: step <= currentStep ? '#dc2626' : '#e5e7eb',
                  borderRadius: '4px'
                }}
              />
            ))}
          </div>
          <p style={{ 
            textAlign: 'center', 
            color: '#6b7280', 
            fontSize: '14px',
            margin: 0 
          }}>
            Langkah {currentStep} dari 3
          </p>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <label style={{
            display: 'block',
            fontWeight: 'bold',
            color: '#374151',
            marginBottom: '10px',
            fontSize: '16px'
          }}>
            Tokoh BerAKHLAK ke-{currentStep} *
          </label>
          <select
            value={currentTokoh.name}
            onChange={(e) => handleStaffSelect(tokohKey, e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '16px',
              background: 'white',
              boxSizing: 'border-box'
            }}
          >
            <option value="">Pilih pegawai...</option>
            {staffList.map((staff) => (
              <option key={staff.id} value={staff.nama}>{staff.nama}</option>
            ))}
          </select>
        </div>

        {currentTokoh.name && (
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{
              color: '#374151',
              marginBottom: '20px',
              fontSize: '18px'
            }}>
              Parameter Penilaian (Rentang Nilai: {scoreRange.min}-{scoreRange.max})
            </h3>
            
            <div style={{ display: 'grid', gap: '20px' }}>
              {mockDatabase.parameters.map((parameter, index) => (
                <div
                  key={index}
                  style={{
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    padding: '20px',
                    background: '#fafafa'
                  }}
                >
                  <label style={{
                    display: 'block',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '8px',
                    fontSize: '15px'
                  }}>
                    {index + 1}. {parameter.namaParameter} *
                  </label>
                  <input
                    type="number"
                    min={scoreRange.min}
                    max={scoreRange.max}
                    value={currentTokoh.scores[index] || ''}
                    onChange={(e) => handleScoreChange(tokohKey, index, e.target.value)}
                    style={{
                      width: '150px',
                      padding: '10px',
                      border: '2px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '16px',
                      textAlign: 'center'
                    }}
                    placeholder={`${scoreRange.min}-${scoreRange.max}`}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '20px',
          borderTop: '2px solid #e5e7eb'
        }}>
          <button
            onClick={currentStep === 1 ? onBack : () => setCurrentStep(currentStep - 1)}
            style={{
              background: '#6b7280',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            {currentStep === 1 ? 'Kembali' : 'Sebelumnya'}
          </button>

          <div style={{ color: '#6b7280', fontSize: '14px' }}>
            Halaman {currentStep} dari 3
          </div>

          <button
            onClick={handleNext}
            disabled={!isStepComplete()}
            style={{
              background: isStepComplete() ? '#dc2626' : '#d1d5db',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              cursor: isStepComplete() ? 'pointer' : 'not-allowed',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            {currentStep === 3 ? 'Submit Penilaian' : 'Lanjut'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Penilaian Component (combines opening and form)
const PenilaianComponent = ({ user }) => {
  const [showOpening, setShowOpening] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const handleStartFromOpening = () => {
    setShowOpening(false);
    setShowForm(true);
  };

  const handleComplete = () => {
    setShowForm(false);
    setShowOpening(true);
  };

  const handleBackToOpening = () => {
    setShowForm(false);
    setShowOpening(true);
  };

  if (showOpening) {
    return <BerAKHLAKOpening onStart={handleStartFromOpening} />;
  }

  if (showForm) {
    return <BerAKHLAKEvaluationForm onComplete={handleComplete} onBack={handleBackToOpening} user={user} />;
  }

  return null;
};

// Riwayat Penilaian Component
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
          <p style={{ color: '#6b7280', fontSize: '16px' }}>Belum ada penilaian yang diberikan</p>
        </div>
      ) : (
        <div style={{ background: 'white', borderRadius: '10px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
          {userEvaluations.map(evaluation => (
            <div key={evaluation.id} style={{
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '20px',
              marginBottom: '15px'
            }}>
              <h3 style={{ color: '#374151', marginBottom: '10px' }}>
                Penilaian {new Date(evaluation.createdAt).toLocaleDateString('id-ID')}
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
                {Object.entries(evaluation.evaluations).map(([key, tokoh]) => (
                  <div key={key} style={{
                    background: '#f8fafc',
                    padding: '15px',
                    borderRadius: '6px'
                  }}>
                    <h4 style={{ color: '#dc2626', marginBottom: '8px' }}>
                      {key === 'tokoh1' ? 'Tokoh 1' : key === 'tokoh2' ? 'Tokoh 2' : 'Tokoh 3'}
                    </h4>
                    <p style={{ fontWeight: '500', marginBottom: '5px' }}>{tokoh.name}</p>
                    <p style={{ fontSize: '12px', color: '#6b7280' }}>
                      {Object.values(tokoh.scores).length} parameter dinilai
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Main App Component
function App() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('dashboard');
  };

  const renderPage = () => {
    if (!user) return null;

    switch (currentPage) {
      case 'dashboard':
        if (user.role === 'ADMIN') return <AdminDashboard />;
        if (user.role === 'PIMPINAN') return <PimpinanDashboard />;
        if (user.role === 'STAFF') return <StaffDashboard user={user} setCurrentPage={setCurrentPage} />;
        break;
      case 'pegawai':
        return <DataPegawai />;
      case 'penilaian':
        return <PenilaianComponent user={user} />;
      case 'riwayat':
        return <RiwayatPenilaian user={user} />;
      case 'periode':
        return <div style={{ padding: '20px' }}><h2>Periode Penilaian</h2><p>Fitur dalam pengembangan</p></div>;
      case 'aspek':
        return <div style={{ padding: '20px' }}><h2>Aspek Penilaian</h2><p>Fitur dalam pengembangan</p></div>;
      case 'presensi':
        return <div style={{ padding: '20px' }}><h2>Presensi</h2><p>Fitur dalam pengembangan</p></div>;
      case 'ckp':
        return <div style={{ padding: '20px' }}><h2>CKP (Capaian Kinerja Pegawai)</h2><p>Fitur dalam pengembangan</p></div>;
      case 'rekap':
        return <RekapPenilaian />;
      case 'monitoring':
        return <MonitoringPenilaian />;
      case 'leaderboard':
        return <LeaderboardComponent />;
      default:
        return <div style={{ padding: '20px' }}><h2>Halaman tidak ditemukan</h2></div>;
    }
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f3f4f6' }}>
      <Navigation 
        user={user} 
        logout={handleLogout} 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
      />
      <div style={{ flex: 1, overflow: 'auto' }}>
        {renderPage()}
      </div>
    </div>
  );
}

// Rekap Penilaian Component
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

// Monitoring Penilaian Component
const MonitoringPenilaian = () => {
  const staffList = mockDatabase.users.filter(u => u.role === 'STAFF');
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

// Leaderboard Component
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

export default App;