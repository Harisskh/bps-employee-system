// mockDatabase.js
// Mock database untuk sistem penilaian BPS

const mockDatabase = {
  users: [
    { 
      id: 1, 
      nip: '000000000000000000', 
      nama: 'Administrator BPS', 
      username: 'admin1810', 
      role: 'ADMIN', 
      password: 'bps123', 
      jenisKelamin: 'LK', 
      jabatan: 'Administrator', 
      golongan: 'IV/c', 
      email: 'admin@bps.go.id' 
    },
    { 
      id: 2, 
      nip: '197309131994031004', 
      nama: 'Eko Purnomo, SST., MM', 
      username: 'eko.purnomo', 
      role: 'PIMPINAN', 
      password: 'bps123', 
      jenisKelamin: 'LK', 
      jabatan: 'Kepala BPS', 
      golongan: 'IV/b', 
      email: 'eko@bps.go.id' 
    },
    { 
      id: 3, 
      nip: '200006222023021004', 
      nama: 'Ahmad Rifjayansyah, S.Tr.Stat.', 
      username: 'ahmadrifjayansyah', 
      role: 'STAFF', 
      password: 'bps123', 
      jenisKelamin: 'LK', 
      jabatan: 'Statistisi', 
      golongan: 'III/a', 
      email: 'rifja@bps.go.id' 
    },
    { 
      id: 4, 
      nip: '200001262023022001', 
      nama: 'Dini Alfitri Zahra, A.Md.Stat.', 
      username: 'dinialfitrizahra', 
      role: 'STAFF', 
      password: 'bps123', 
      jenisKelamin: 'PR', 
      jabatan: 'Statistisi', 
      golongan: 'II/c', 
      email: 'dini@bps.go.id' 
    },
    { 
      id: 5, 
      nip: '200002092023022003', 
      nama: 'Ayu Setianingsih, A.Md.Stat.', 
      username: 'ayusetianingsih', 
      role: 'STAFF', 
      password: 'bps123', 
      jenisKelamin: 'PR', 
      jabatan: 'Statistisi', 
      golongan: 'II/c', 
      email: 'ayu@bps.go.id' 
    },
    { 
      id: 6, 
      nip: '198810132010122005', 
      nama: 'Resty Sopiyono, SST, M.E.K.K.', 
      username: 'sresty', 
      role: 'STAFF', 
      password: 'bps123', 
      jenisKelamin: 'PR', 
      jabatan: 'Statistisi', 
      golongan: 'IV/a', 
      email: 'resty@bps.go.id' 
    },
    { 
      id: 7, 
      nip: '198902082010121005', 
      nama: 'Ahmad Rifki Febrianto, SST, M.EKK', 
      username: 'arifki', 
      role: 'STAFF', 
      password: 'bps123', 
      jenisKelamin: 'LK', 
      jabatan: 'Pranata Komputer', 
      golongan: 'III/d', 
      email: 'rifki@bps.go.id' 
    },
    { 
      id: 8, 
      nip: '199707132019122001', 
      nama: 'Sela Anisada, S.Tr.Stat.', 
      username: 'sela.anisada', 
      role: 'STAFF', 
      password: 'bps123', 
      jenisKelamin: 'PR', 
      jabatan: 'Pranata Komputer', 
      golongan: 'III/b', 
      email: 'sela@bps.go.id' 
    },
    { 
      id: 9, 
      nip: '199910302022012002', 
      nama: 'Esa Anindika Sari, S.Tr.Stat.', 
      username: 'esa.anindika', 
      role: 'STAFF', 
      password: 'bps123', 
      jenisKelamin: 'PR', 
      jabatan: 'Statistisi', 
      golongan: 'III/a', 
      email: 'esa@bps.go.id' 
    },
    { 
      id: 10, 
      nip: '199911292022012002', 
      nama: 'Miftahul Husna, S.Tr.Stat.', 
      username: 'miftahul.husna', 
      role: 'STAFF', 
      password: 'bps123', 
      jenisKelamin: 'PR', 
      jabatan: 'Statistisi', 
      golongan: 'III/a', 
      email: 'miftah@bps.go.id' 
    }
  ],
  
  evaluations: [
    {
      id: 1,
      evaluatorId: 3,
      evaluatorName: 'Ahmad Rifjayansyah, S.Tr.Stat.',
      periodId: 1,
      evaluations: {
        tokoh1: { 
          name: 'Ayu Setianingsih, A.Md.Stat.', 
          scores: { 0: 98, 1: 97, 2: 99, 3: 96, 4: 98, 5: 97, 6: 98, 7: 96 } 
        },
        tokoh2: { 
          name: 'Dini Alfitri Zahra, A.Md.Stat.', 
          scores: { 0: 92, 1: 91, 2: 93, 3: 90, 4: 92, 5: 91, 6: 93, 7: 90 } 
        },
        tokoh3: { 
          name: 'Esa Anindika Sari, S.Tr.Stat.', 
          scores: { 0: 84, 1: 83, 2: 85, 3: 82, 4: 84, 5: 83, 6: 85, 7: 82 } 
        }
      },
      createdAt: '2025-07-04T10:30:00Z'
    }
  ],
  
  periods: [
    { 
      id: 1, 
      tahun: 2025, 
      bulan: 1, 
      namaPeriode: 'Februari 2025', 
      isActive: true 
    },
    { 
      id: 2, 
      tahun: 2025, 
      bulan: 2, 
      namaPeriode: 'Maret 2025', 
      isActive: false 
    }
  ],
  
  parameters: [
    { 
      id: 1, 
      namaParameter: 'Perilaku Melayani Sepenuh Hati, Ramah, dan Solutif', 
      kategori: 'berakhlak', 
      urutan: 1 
    },
    { 
      id: 2, 
      namaParameter: 'Perilaku Bertanggung Jawab, Disiplin, dan Jujur', 
      kategori: 'berakhlak', 
      urutan: 2 
    },
    { 
      id: 3, 
      namaParameter: 'Perilaku Profesional, Senang Belajar, dan Berbagi Pengetahuan', 
      kategori: 'berakhlak', 
      urutan: 3 
    },
    { 
      id: 4, 
      namaParameter: 'Perilaku Suka Menolong, Toleransi, dan Menghargai Keberagaman', 
      kategori: 'berakhlak', 
      urutan: 4 
    },
    { 
      id: 5, 
      namaParameter: 'Perilaku Menjaga Nama Baik BPS dan Berdedikasi', 
      kategori: 'berakhlak', 
      urutan: 5 
    },
    { 
      id: 6, 
      namaParameter: 'Perilaku Kreatif, Inovatif, dan Siap terhadap Perubahan', 
      kategori: 'berakhlak', 
      urutan: 6 
    },
    { 
      id: 7, 
      namaParameter: 'Perilaku Komunikatif dan Mampu Bekerja Sama antar Tim Kerja', 
      kategori: 'berakhlak', 
      urutan: 7 
    },
    { 
      id: 8, 
      namaParameter: 'Penampilan dan Kerapian', 
      kategori: 'berakhlak', 
      urutan: 8 
    }
  ],
  
  presensi: [
    { id: 1, userId: 3, periode: 1, nilai: 95 },
    { id: 2, userId: 4, periode: 1, nilai: 92 },
    { id: 3, userId: 5, periode: 1, nilai: 88 }
  ],
  
  ckp: [
    { id: 1, userId: 3, periode: 1, nilai: 88 },
    { id: 2, userId: 4, periode: 1, nilai: 90 },
    { id: 3, userId: 5, periode: 1, nilai: 92 }
  ]
};

export default mockDatabase;