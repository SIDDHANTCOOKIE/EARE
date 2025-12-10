import React, { useState } from 'react';
import { ViewState } from './types';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';

export default function App() {
  const [view, setView] = useState<ViewState>(ViewState.LANDING);

  const handleStudentLogin = () => {
    setView(ViewState.DASHBOARD_STUDENT);
  };

  const handleAdminLogin = () => {
    setView(ViewState.DASHBOARD_ADMIN);
  };

  const handleLogout = () => {
    setView(ViewState.LANDING);
  };

  return (
    <>
      {view === ViewState.LANDING ? (
        <LandingPage onEnterStudent={handleStudentLogin} onEnterAdmin={handleAdminLogin} />
      ) : (
        <Dashboard 
          onLogout={handleLogout} 
          initialAdmin={view === ViewState.DASHBOARD_ADMIN}
        />
      )}
    </>
  );
}