// ViewPegawai.jsx - Read-only untuk Pimpinan
import React, { useState } from 'react';
import mockDatabase from '../../data/mockDatabase';

const ViewPegawai = () => {
  const [pegawai] = useState(mockDatabase.users);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPegawai = pegawai.filter(p => 
    p.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.nip.includes(searchTerm) ||
    p.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0, color: '#1f2937' }}>Data Pegawai</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input
            type="text"
            placeholder="Cari pegawai..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              width: '250px'
            }}
          />
          <span style={{
            padding: '8px 12px',
            background: '#f3f4f6',
            borderRadius: '6px',
            fontSize: '14px',
            color: '#6b7280'
          }}>
            Total: {filteredPegawai.length} pegawai
          </span>
        </div>
      </div>
      
      <div style={{ background: 'white', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc' }}>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>NIP</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Nama</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Username</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Jabatan</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Golongan</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Role</th>
            </tr>
          </thead>
          <tbody>
            {filteredPegawai.map(p => (
              <tr key={p.id} style={{ 
                background: p.role === 'PIMPINAN' ? '#fef3c7' : 'white',
                borderLeft: p.role === 'PIMPINAN' ? '4px solid #f59e0b' : 'none'
              }}>
                <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0', fontSize: '13px' }}>
                  {p.nip}
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>
                  <div>
                    <div style={{ fontWeight: '500' }}>{p.nama}</div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>{p.email}</div>
                  </div>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>
                  {p.username}
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '14px' }}>{p.jabatan}</div>
                </td>
                <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>
                  <span style={{
                    padding: '2px 6px',
                    borderRadius: '3px',
                    fontSize: '11px',
                    background: '#f3f4f6',
                    color: '#374151'
                  }}>
                    {p.golongan}
                  </span>
                </td>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {filteredPegawai.length === 0 && (
        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '10px',
          textAlign: 'center',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          marginTop: '20px'
        }}>
          <p style={{ color: '#6b7280', fontSize: '16px', margin: 0 }}>
            Tidak ada pegawai yang sesuai dengan pencarian "{searchTerm}"
          </p>
        </div>
      )}
    </div>
  );
};

export default ViewPegawai;