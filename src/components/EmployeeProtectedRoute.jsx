import { Navigate } from 'react-router-dom';
import React from 'react';

export default function EmployeeProtectedRoute({ children }) {
  const employee = JSON.parse(localStorage.getItem('employee'));
  if (!employee) return <Navigate to="/employee-login" replace />;
  return children;
}