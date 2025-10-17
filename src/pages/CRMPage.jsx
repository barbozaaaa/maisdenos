import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import CRM from '../components/CRM';
import './CRMPage.css';

const CRMPage = () => {
  const { user, signOut } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  if (loading) {
    return (
      <div className="crm-loading">
        <div className="loading-spinner"></div>
        <p>Carregando sistema CRM...</p>
      </div>
    );
  }

  return (
    <div className="crm-page">
      <header className="crm-header">
        <div className="crm-header-content">
          <div className="crm-logo">
            <h1>CRM - Mais de Nós</h1>
            <p>Sistema de Gestão de Relacionamento</p>
          </div>
          
          <div className="crm-user-info">
            <div className="user-details">
              <span className="user-name">
                {user?.user_metadata?.name || user?.email}
              </span>
              <span className="user-email">{user?.email}</span>
            </div>
            
            <button onClick={handleLogout} className="logout-button">
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="crm-main">
        <div className="crm-container">
          <CRM />
        </div>
      </main>
    </div>
  );
};

export default CRMPage;

