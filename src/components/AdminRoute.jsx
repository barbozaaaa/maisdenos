import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const { user, isAdmin, isAdminLogged } = useAuth();

  // Se não está logado nem como admin por palavra-chave, redireciona para login
  if (!user && !isAdminLogged) {
    return <Navigate to="/login" replace />;
  }

  // Se está logado como usuário normal mas não é admin, redireciona para home
  if (user && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Se é admin (por email ou por palavra-chave), permite acesso
  return children;
};

export default AdminRoute;
