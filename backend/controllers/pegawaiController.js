// backend/controllers/pegawaiController.js

// Impor instance Prisma Client yang sudah Anda buat
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Fungsi untuk mengambil semua data pegawai
const getAllPegawai = async (req, res) => {
  try {
    // Gunakan Prisma untuk mencari semua record di tabel Pegawai
    const semuaPegawai = await prisma.pegawai.findMany();
    
    // Kirim data sebagai response JSON
    res.status(200).json(semuaPegawai);
  } catch (error) {
    // Kirim response error jika terjadi masalah
    res.status(500).json({ message: "Terjadi kesalahan saat mengambil data pegawai", error: error.message });
  }
};

// Ekspor fungsi agar bisa digunakan di file lain
module.exports = {
  getAllPegawai,
  // (Nanti fungsi lain seperti getPegawaiById, createPegawai, dll. akan ditambahkan di sini)
};