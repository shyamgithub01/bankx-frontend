import { Navigate } from 'react-router-dom';
import React from 'react';

export default function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) return <Navigate to="/login" replace />;
  return children;
}