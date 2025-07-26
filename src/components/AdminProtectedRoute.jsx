import { Navigate } from 'react-router-dom';
import React from 'react';

export default function AdminProtectedRoute({ children }) {
  const admin = JSON.parse(localStorage.getItem('admin'));
  if (!admin) return <Navigate to="/admin-login" replace />;
  return children;
}