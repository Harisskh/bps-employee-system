// backend/routes/pegawaiRoutes.js

const express = require('express');
const router = express.Router();

// Impor fungsi controller yang relevan
const { getAllPegawai } = require('../controllers/pegawaiController');

// Definisikan route GET di path root ('/') untuk mengambil semua pegawai
router.get('/', getAllPegawai);

// (Nanti route lain seperti GET /:id, POST /, PUT /:id akan ditambahkan di sini)

// Ekspor router agar bisa digunakan di server utama
module.exports = router;