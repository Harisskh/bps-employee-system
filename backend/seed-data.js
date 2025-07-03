// seed-data.js
// Script untuk mengisi database BPS dengan data awal

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function seedData() {
  console.log('🌱 Starting database seeding...');

  try {
    // =====================
    // 1. SEED EVALUATION PARAMETERS
    // =====================
    console.log('📋 Seeding Evaluation Parameters...');
    
    const evaluationParameters = [
      {
        namaParameter: 'Perilaku Melayani Sepenuh Hati, Ramah, dan Solutif',
        deskripsi: 'Menilai sikap pelayanan yang ramah dan solutif',
        kategori: 'berakhlak',
        urutan: 1
      },
      {
        namaParameter: 'Perilaku Bertanggung Jawab, Disiplin, dan Jujur',
        deskripsi: 'Menilai tingkat tanggung jawab, disiplin, dan kejujuran',
        kategori: 'berakhlak',
        urutan: 2
      },
      {
        namaParameter: 'Perilaku Profesional, Senang Belajar, dan Berbagi Pengetahuan',
        deskripsi: 'Menilai profesionalisme dan semangat belajar',
        kategori: 'berakhlak',
        urutan: 3
      },
      {
        namaParameter: 'Perilaku Suka Menolong, Toleransi, dan Menghargai Keberagaman',
        deskripsi: 'Menilai sikap saling membantu dan toleransi',
        kategori: 'berakhlak',
        urutan: 4
      },
      {
        namaParameter: 'Perilaku Menjaga Nama Baik BPS dan Berdedikasi',
        deskripsi: 'Menilai dedikasi dan menjaga nama baik institusi',
        kategori: 'berakhlak',
        urutan: 5
      },
      {
        namaParameter: 'Perilaku Kreatif, Inovatif, dan Siap terhadap Perubahan',
        deskripsi: 'Menilai kreativitas dan kemampuan adaptasi',
        kategori: 'berakhlak',
        urutan: 6
      },
      {
        namaParameter: 'Perilaku Komunikatif dan Mampu Bekerja Sama antar Tim Kerja',
        deskripsi: 'Menilai kemampuan komunikasi dan kerjasama tim',
        kategori: 'berakhlak',
        urutan: 7
      },
      {
        namaParameter: 'Penampilan dan Kerapian',
        deskripsi: 'Menilai penampilan dan kerapian dalam berpakaian',
        kategori: 'berakhlak',
        urutan: 8
      }
    ];

    await prisma.evaluationParameter.createMany({
      data: evaluationParameters,
      skipDuplicates: true
    });

    // =====================
    // 2. SEED ASPEK PENILAIAN
    // =====================
    console.log('📊 Seeding Aspek Penilaian...');
    
    const aspekPenilaian = [
      {
        namaAspek: 'Tokoh BerAKHLAK',
        deskripsi: 'Penilaian perilaku berdasarkan nilai-nilai BerAKHLAK',
        kategori: 'berakhlak',
        bobot: 0.30
      },
      {
        namaAspek: 'Presensi',
        deskripsi: 'Penilaian kehadiran dan ketepatan waktu',
        kategori: 'presensi',
        bobot: 0.40
      },
      {
        namaAspek: 'CKP',
        deskripsi: 'Capaian Kinerja Pegawai',
        kategori: 'ckp',
        bobot: 0.30
      }
    ];

    await prisma.aspekPenilaian.createMany({
      data: aspekPenilaian,
      skipDuplicates: true
    });

    // =====================
    // 3. SEED RENTANG NILAI
    // =====================
    console.log('📈 Seeding Rentang Nilai...');
    
    const rentangNilai = [
      {
        kategori: 'tokoh_ke_1',
        nilaiMin: 96,
        nilaiMax: 100,
        deskripsi: 'Rentang nilai untuk Tokoh BerAKHLAK ke-1 (Sangat Baik)'
      },
      {
        kategori: 'tokoh_ke_2',
        nilaiMin: 86,
        nilaiMax: 95,
        deskripsi: 'Rentang nilai untuk Tokoh BerAKHLAK ke-2 (Baik)'
      },
      {
        kategori: 'tokoh_ke_3',
        nilaiMin: 80,
        nilaiMax: 85,
        deskripsi: 'Rentang nilai untuk Tokoh BerAKHLAK ke-3 (Cukup Baik)'
      }
    ];

    await prisma.rentangNilai.createMany({
      data: rentangNilai,
      skipDuplicates: true
    });

    // =====================
    // 4. SEED PERIODS
    // =====================
    console.log('📅 Seeding Periods...');
    
    const periods = [
      {
        tahun: 2025,
        bulan: 1,
        namaPeriode: 'Februari 2025',
        noPeriode: 1,
        isActive: true
      },
      {
        tahun: 2025,
        bulan: 2,
        namaPeriode: 'Maret 2025',
        noPeriode: 2,
        isActive: false
      },
      {
        tahun: 2025,
        bulan: 3,
        namaPeriode: 'April 2025',
        noPeriode: 3,
        isActive: false
      }
    ];

    await prisma.period.createMany({
      data: periods,
      skipDuplicates: true
    });

    // =====================
    // 5. SEED USERS (ADMIN + PEGAWAI BPS)
    // =====================
    console.log('👥 Seeding Users...');
    
    // Hash password default
    const defaultPassword = await bcrypt.hash('bps123', 10);
    const adminPassword = await bcrypt.hash('admin123', 10);

    // Admin User
    const adminUser = {
      nip: '000000000000000000',
      nama: 'Administrator BPS Kabupaten Pringsewu',
      email: 'admin@bps.go.id',
      password: adminPassword,
      role: 'ADMIN',
      jenisKelamin: 'LK',
      jabatan: 'Administrator',
      golongan: 'IV/c',
      status: 'PNS',
      instansi: 'BPS Kabupaten Pringsewu',
      kantor: 'BPS Kabupaten Pringsewu',
      username: 'admin1810',
      isActive: true
    };

    await prisma.user.upsert({
      where: { username: 'admin1810' },
      update: {},
      create: adminUser
    });

    // Pegawai BPS Data
    const pegawaiBPS = [
      {
        nip: '197309131994031004',
        nama: 'Eko Purnomo, SST., MM',
        jabatan: 'Kepala BPS Kabupaten/Kota',
        golongan: 'IV/b',
        status: 'PNS',
        jenisKelamin: 'LK',
        username: 'eko.purnomo',
        role: 'PIMPINAN'
      },
      {
        nip: '197205201994031004',
        nama: 'Erwansyah Yusup',
        jabatan: 'Fungsional Umum BPS Kabupaten/Kota',
        golongan: 'III/b',
        status: 'PNS',
        jenisKelamin: 'LK',
        username: 'erwansyah',
        role: 'STAFF'
      },
      {
        nip: '197509032006041020',
        nama: 'Tri Budi Setiawan',
        jabatan: 'Fungsional Umum BPS Kabupaten/Kota',
        golongan: 'III/a',
        status: 'PNS',
        jenisKelamin: 'LK',
        username: 'tri.bs',
        role: 'STAFF'
      },
      {
        nip: '198405212007011001',
        nama: 'Fazani',
        jabatan: 'Fungsional Umum BPS Kabupaten/Kota',
        golongan: 'III/a',
        status: 'PNS',
        jenisKelamin: 'LK',
        username: 'fazani',
        role: 'STAFF'
      },
      {
        nip: '197008032007012004',
        nama: 'Agistin Nafta',
        jabatan: 'Fungsional Umum BPS Kabupaten/Kota',
        golongan: 'III/a',
        status: 'PNS',
        jenisKelamin: 'PR',
        username: 'agustin.nafta',
        role: 'STAFF'
      },
      {
        nip: '198002022009011010',
        nama: 'Saifu Rohmatullah',
        jabatan: 'Fungsional Umum BPS Kabupaten/Kota',
        golongan: 'III/a',
        status: 'PNS',
        jenisKelamin: 'LK',
        username: 'saifu.rohmatullah',
        role: 'STAFF'
      },
      {
        nip: '198810132010122005',
        nama: 'Resty Sopiyono, SST, M.E.K.K.',
        jabatan: 'Statistisi Ahli Madya BPS Kabupaten/Kota',
        golongan: 'IV/a',
        status: 'PNS',
        jenisKelamin: 'PR',
        username: 'sresty',
        role: 'STAFF'
      },
      {
        nip: '197205231995121001',
        nama: 'Syamsul Bahri, S.Si',
        jabatan: 'Pranata Komputer Ahli Muda BPS Kabupaten/Kota',
        golongan: 'III/d',
        status: 'PNS',
        jenisKelamin: 'LK',
        username: 'bahri.syamsul',
        role: 'STAFF'
      },
      {
        nip: '197007112003121003',
        nama: 'Andi Stiawan, SP',
        jabatan: 'Statistisi Ahli Muda BPS Kabupaten/Kota',
        golongan: 'III/d',
        status: 'PNS',
        jenisKelamin: 'LK',
        username: 'andi.stiawan',
        role: 'STAFF'
      },
      {
        nip: '198207182005022001',
        nama: 'Dewi Yuliana S., S.T.',
        jabatan: 'Statistisi Ahli Muda BPS Kabupaten/Kota',
        golongan: 'III/d',
        status: 'PNS',
        jenisKelamin: 'PR',
        username: 'dewiyuliana',
        role: 'STAFF'
      },
      {
        nip: '198506202007012005',
        nama: 'Fithriyah, SST',
        jabatan: 'Statistisi Ahli Muda BPS Kabupaten/Kota',
        golongan: 'III/d',
        status: 'PNS',
        jenisKelamin: 'PR',
        username: 'fitriyah',
        role: 'STAFF'
      },
      {
        nip: '198309022009022008',
        nama: 'Arum Pratiwi, SST',
        jabatan: 'Statistisi Ahli Muda BPS Kabupaten/Kota',
        golongan: 'III/d',
        status: 'PNS',
        jenisKelamin: 'PR',
        username: 'arump',
        role: 'STAFF'
      },
      {
        nip: '198702162009022009',
        nama: 'Nisalasi Ikhsan Nurfathillah, SST',
        jabatan: 'Statistisi Ahli Muda BPS Kabupaten/Kota',
        golongan: 'III/d',
        status: 'PNS',
        jenisKelamin: 'PR',
        username: 'nisalasi',
        role: 'STAFF'
      },
      {
        nip: '198902082010121005',
        nama: 'Ahmad Rifki Febrianto, SST, M.EKK',
        jabatan: 'Pranata Komputer Ahli Muda BPS Kabupaten/Kota',
        golongan: 'III/d',
        status: 'PNS',
        jenisKelamin: 'LK',
        username: 'arifki',
        role: 'STAFF'
      },
      {
        nip: '198005262011011005',
        nama: 'Muhamad Zaenuri, S.P.',
        jabatan: 'Statistisi Ahli Muda BPS Kabupaten/Kota',
        golongan: 'III/d',
        status: 'PNS',
        jenisKelamin: 'LK',
        username: 'muh.zaenuri',
        role: 'STAFF'
      },
      {
        nip: '198908092013112001',
        nama: 'Dinny Pravitasari, SST, M.S.E.',
        jabatan: 'Statistisi Ahli Pertama BPS Kabupaten/Kota',
        golongan: 'III/c',
        status: 'PNS',
        jenisKelamin: 'PR',
        username: 'dinnypravita',
        role: 'STAFF'
      },
      {
        nip: '198410012011011013',
        nama: 'Surachman Budiarto, S.Si',
        jabatan: 'Statistisi Ahli Pertama BPS Kabupaten/Kota',
        golongan: 'III/b',
        status: 'PNS',
        jenisKelamin: 'LK',
        username: 'budi.surachman',
        role: 'STAFF'
      },
      {
        nip: '199405092016022001',
        nama: 'Fanisa Dwita Hanggarani, SST',
        jabatan: 'Statistisi Ahli Muda BPS Kabupaten/Kota',
        golongan: 'III/b',
        status: 'PNS',
        jenisKelamin: 'PR',
        username: 'fanisa',
        role: 'STAFF'
      },
      {
        nip: '199404202017012001',
        nama: 'Annisa Fauziatul Mardiyah, SST',
        jabatan: 'Statistisi Ahli Pertama BPS Kabupaten/Kota',
        golongan: 'III/b',
        status: 'PNS',
        jenisKelamin: 'PR',
        username: 'annisa.mardiyah',
        role: 'STAFF'
      },
      {
        nip: '199707132019122001',
        nama: 'Sela Anisada, S.Tr.Stat.',
        jabatan: 'Pranata Komputer Ahli Pertama BPS Kabupaten/Kota',
        golongan: 'III/b',
        status: 'PNS',
        jenisKelamin: 'PR',
        username: 'sela.anisada',
        role: 'STAFF'
      },
      {
        nip: '199910302022012002',
        nama: 'Esa Anindika Sari, S.Tr.Stat.',
        jabatan: 'Statistisi Ahli Pertama BPS Kabupaten/Kota',
        golongan: 'III/a',
        status: 'PNS',
        jenisKelamin: 'PR',
        username: 'esa.anindika',
        role: 'STAFF'
      },
      {
        nip: '199911292022012002',
        nama: 'Miftahul Husna, S.Tr.Stat.',
        jabatan: 'Statistisi Ahli Pertama BPS Kabupaten/Kota',
        golongan: 'III/a',
        status: 'PNS',
        jenisKelamin: 'PR',
        username: 'miftahul.husna',
        role: 'STAFF'
      },
      {
        nip: '200006222023021004',
        nama: 'Ahmad Rifjayansyah, S.Tr.Stat.',
        jabatan: 'Statistisi Ahli Pertama BPS Kabupaten/Kota',
        golongan: 'III/a',
        status: 'PNS',
        jenisKelamin: 'LK',
        username: 'ahmadrifjayansyah',
        role: 'STAFF'
      },
      {
        nip: '199304242024211005',
        nama: 'Riki Afrianto, A.Md.',
        jabatan: 'Pranata Komputer Terampil BPS Kabupaten/Kota',
        golongan: 'VII',
        status: 'PPPK',
        jenisKelamin: 'LK',
        username: 'rikiafrianto-pppk',
        role: 'STAFF'
      },
      {
        nip: '200002092023022003',
        nama: 'Ayu Setianingsih, A.Md.Stat.',
        jabatan: 'Statistisi Terampil BPS Kabupaten/Kota',
        golongan: 'II/c',
        status: 'PNS',
        jenisKelamin: 'PR',
        username: 'ayusetianingsih',
        role: 'STAFF'
      },
      {
        nip: '200001262023022001',
        nama: 'Dini Alfitri Zahra, A.Md.Stat.',
        jabatan: 'Statistisi Terampil BPS Kabupaten/Kota',
        golongan: 'II/c',
        status: 'PNS',
        jenisKelamin: 'PR',
        username: 'dinialfitrizahra',
        role: 'STAFF'
      },
      {
        nip: '198605302009111001',
        nama: 'Singgih Adiwijaya, S.E., M.M.',
        jabatan: 'Analis Pengelolaan Keuangan APBN Ahli Muda Subbagian Umum',
        golongan: 'III/c',
        status: 'PNS',
        jenisKelamin: 'LK',
        username: 'singgih.adiwijaya',
        role: 'STAFF'
      },
      {
        nip: '198512212012122002',
        nama: 'Diah Hadianing Putri, S.Si',
        jabatan: 'Statistisi Penyelia Subbagian Umum',
        golongan: 'III/c',
        status: 'PNS',
        jenisKelamin: 'PR',
        username: 'diah.hp',
        role: 'STAFF'
      },
      {
        nip: '198905052011012013',
        nama: 'Fitri Nurjanah, S.E., M.M.',
        jabatan: 'Pranata Keuangan APBN Mahir Subbagian Umum',
        golongan: 'III/b',
        status: 'PNS',
        jenisKelamin: 'PR',
        username: 'fitri.nurjanah',
        role: 'STAFF'
      },
      {
        nip: '199902142022012004',
        nama: 'Eklesia Valentia, A.Md.Kb.N.',
        jabatan: 'Pranata Keuangan APBN Terampil Subbagian Umum',
        golongan: 'II/c',
        status: 'PNS',
        jenisKelamin: 'PR',
        username: 'eklesia.valentia',
        role: 'STAFF'
      }
    ];

    // Create all BPS employees
    for (const pegawai of pegawaiBPS) {
      await prisma.user.upsert({
        where: { username: pegawai.username },
        update: {},
        create: {
          ...pegawai,
          password: defaultPassword,
          email: `${pegawai.username}@bps.go.id`,
          instansi: 'BPS Kabupaten Pringsewu',
          kantor: 'BPS Kabupaten Pringsewu',
          isActive: true
        }
      });
    }

    console.log('✅ Database seeding completed successfully!');
    console.log('📊 Summary:');
    console.log(`   • ${evaluationParameters.length} Evaluation Parameters`);
    console.log(`   • ${aspekPenilaian.length} Aspek Penilaian`);
    console.log(`   • ${rentangNilai.length} Rentang Nilai`);
    console.log(`   • ${periods.length} Periods`);
    console.log(`   • ${pegawaiBPS.length + 1} Users (including admin)`);
    console.log('');
    console.log('🔑 Login Credentials:');
    console.log('   Admin: username="admin", password="bpsadmin1810"');
    console.log('   Staff: username="[username]", password="bpsstaff1810"');
    console.log('   Pimpinan: username="eko.purnomo", password="bpsleader1810"');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run seeding
if (require.main === module) {
  seedData()
    .then(() => {
      console.log('🎉 Seeding process completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Seeding failed:', error);
      process.exit(1);
    });
}

module.exports = { seedData };