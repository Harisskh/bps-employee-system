// PenilaianComponent.jsx
import React, { useState } from 'react';
import BerAKHLAKOpening from './BerAKHLAKOpening';
import EvaluationForm from './EvaluationForm';

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
    return <EvaluationForm onComplete={handleComplete} onBack={handleBackToOpening} user={user} />;
  }

  return null;
};

export default PenilaianComponent;