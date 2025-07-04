// DataPegawai.jsx - CRUD untuk Admin
import React, { useState } from 'react';
import mockDatabase from '../../data/mockDatabase';

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

export default DataPegawai;