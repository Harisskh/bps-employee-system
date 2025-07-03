// server.js
// Basic Express Server untuk Sistem BPS Pringsewu

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'bps-pringsewu-secret-key-2024';

// Initialize Prisma
const prisma = new PrismaClient();

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =====================
// AUTHENTICATION MIDDLEWARE
// =====================

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      error: 'Access token required' 
    });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ 
        success: false, 
        error: 'Invalid or expired token' 
      });
    }
    req.user = user;
    next();
  });
};

// Role-based authorization
const authorize = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        error: 'Insufficient permissions' 
      });
    }
    next();
  };
};

// =====================
// AUTHENTICATION ROUTES
// =====================

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        error: 'Username and password are required'
      });
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { 
        username: username,
        isActive: true 
      },
      select: {
        id: true,
        nip: true,
        nama: true,
        username: true,
        role: true,
        email: true,
        password: true,
        jabatan: true,
        jenisKelamin: true
      }
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid username or password'
      });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        error: 'Invalid username or password'
      });
    }

    // Generate JWT token
    const tokenPayload = {
      id: user.id,
      username: user.username,
      role: user.role,
      nama: user.nama,
      nip: user.nip
    };

    const token = jwt.sign(tokenPayload, JWT_SECRET, { 
      expiresIn: '24h' 
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: userWithoutPassword
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Get current user info
app.get('/api/auth/me', authenticateToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        nip: true,
        nama: true,
        username: true,
        role: true,
        email: true,
        jabatan: true,
        jenisKelamin: true,
        golongan: true,
        status: true,
        isActive: true
      }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.json({
      success: true,
      data: { user }
    });

  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Logout (client-side token removal)
app.post('/api/auth/logout', authenticateToken, (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

// =====================
// USER ROUTES
// =====================

// Get all users (untuk dropdown saat penilaian)
app.get('/api/users', authenticateToken, async (req, res) => {
  try {
    const { role } = req.query;
    
    const whereClause = {
      isActive: true,
      id: { not: req.user.id } // Exclude current user
    };

    if (role) {
      whereClause.role = role;
    }

    const users = await prisma.user.findMany({
      where: whereClause,
      select: {
        id: true,
        nama: true,
        nip: true,
        username: true,
        jabatan: true,
        role: true
      },
      orderBy: { nama: 'asc' }
    });

    res.json({
      success: true,
      data: { users }
    });

  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Get staff list for evaluation (exclude self)
app.get('/api/users/staff', authenticateToken, async (req, res) => {
  try {
    const staff = await prisma.user.findMany({
      where: {
        role: 'STAFF',
        isActive: true,
        id: { not: req.user.id }
      },
      select: {
        id: true,
        nama: true,
        nip: true,
        jabatan: true
      },
      orderBy: { nama: 'asc' }
    });

    res.json({
      success: true,
      data: { staff }
    });

  } catch (error) {
    console.error('Get staff error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// =====================
// EVALUATION ROUTES
// =====================

// Get evaluation parameters
app.get('/api/evaluation/parameters', authenticateToken, async (req, res) => {
  try {
    const parameters = await prisma.evaluationParameter.findMany({
      orderBy: { urutan: 'asc' }
    });

    res.json({
      success: true,
      data: { parameters }
    });

  } catch (error) {
    console.error('Get parameters error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Get active period
app.get('/api/periods/active', authenticateToken, async (req, res) => {
  try {
    const activePeriod = await prisma.period.findFirst({
      where: { isActive: true }
    });

    if (!activePeriod) {
      return res.status(404).json({
        success: false,
        error: 'No active period found'
      });
    }

    res.json({
      success: true,
      data: { period: activePeriod }
    });

  } catch (error) {
    console.error('Get active period error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Submit evaluation
app.post('/api/evaluations', authenticateToken, async (req, res) => {
  try {
    const { periodId, evaluations } = req.body;

    // Validation
    if (!periodId || !evaluations || !Array.isArray(evaluations) || evaluations.length !== 3) {
      return res.status(400).json({
        success: false,
        error: 'Invalid evaluation data. Must provide exactly 3 evaluations.'
      });
    }

    // Check if user already submitted for this period
    const existingEvaluation = await prisma.evaluation.findFirst({
      where: {
        evaluatorId: req.user.id,
        periodId: periodId
      }
    });

    if (existingEvaluation) {
      return res.status(400).json({
        success: false,
        error: 'You have already submitted evaluation for this period'
      });
    }

    // Use transaction to ensure data consistency
    const result = await prisma.$transaction(async (tx) => {
      const createdEvaluations = [];

      for (let i = 0; i < evaluations.length; i++) {
        const evaluation = evaluations[i];
        const ranking = i + 1; // 1, 2, 3

        // Create evaluation header
        const evalHeader = await tx.evaluation.create({
          data: {
            evaluatorId: req.user.id,
            periodId: periodId,
            targetUserId: evaluation.targetUserId,
            ranking: ranking,
            status: 'SUBMITTED'
          }
        });

        // Create evaluation scores
        const scores = evaluation.scores.map(score => ({
          evaluationId: evalHeader.id,
          parameterId: score.parameterId,
          score: score.score
        }));

        await tx.evaluationScore.createMany({
          data: scores
        });

        createdEvaluations.push(evalHeader);
      }

      return createdEvaluations;
    });

    res.json({
      success: true,
      message: 'Evaluation submitted successfully',
      data: { evaluations: result }
    });

  } catch (error) {
    console.error('Submit evaluation error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Get my evaluations
app.get('/api/evaluations/my', authenticateToken, async (req, res) => {
  try {
    const evaluations = await prisma.evaluation.findMany({
      where: { evaluatorId: req.user.id },
      include: {
        target: {
          select: { nama: true, nip: true }
        },
        period: {
          select: { namaPeriode: true, tahun: true, bulan: true }
        },
        scores: {
          include: {
            parameter: {
              select: { namaParameter: true }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      data: { evaluations }
    });

  } catch (error) {
    console.error('Get my evaluations error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// =====================
// HEALTH CHECK
// =====================

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'BPS Employee Evaluation API is running!',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is healthy',
    database: 'connected',
    timestamp: new Date().toISOString()
  });
});

// =====================
// ERROR HANDLING
// =====================

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// =====================
// START SERVER
// =====================

app.listen(PORT, () => {
  console.log(`🚀 BPS API Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 API Base URL: http://localhost:${PORT}`);
  console.log(`🔗 Health Check: http://localhost:${PORT}/api/health`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully');
  await prisma.$disconnect();
  process.exit(0);
});