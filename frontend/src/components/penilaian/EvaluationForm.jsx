// EvaluationForm.jsx
import React, { useState } from 'react';
import mockDatabase from '../../data/mockDatabase';

const EvaluationForm = ({ onComplete, onBack, user }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [evaluations, setEvaluations] = useState({
    tokoh1: { name: '', scores: {} },
    tokoh2: { name: '', scores: {} },
    tokoh3: { name: '', scores: {} }
  });

  // Filter staff list (exclude current user)
  const staffList = mockDatabase.users.filter(u => 
    (u.role === 'STAFF' || u.role === 'PIMPINAN') && u.id !== user.id
  );

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

export default EvaluationForm;