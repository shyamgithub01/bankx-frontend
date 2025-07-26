
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';

import React from 'react';


import Login from './pages/Login';
import Register from './pages/Register';
import EmployeeLogin from './pages/EmployeeLogin';
import AdminLogin from './pages/AdminLogin';


import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Deposit   from './pages/Deposit';
import Transfer  from './pages/Transfer';
// import Balance   from './pages/Balance';

// Employee‑protected pages
import EmployeeProtectedRoute from './components/EmployeeProtectedRoute';
import DeleteAccount          from './pages/DeleteAccount';

// Admin‑protected pages
import AdminProtectedRoute from './components/AdminProtectedRoute';
import AddEmployee         from './pages/AddEmployee';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* 1) Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* 2) Public routes */}
        <Route path="/login"          element={<Login />} />
        <Route path="/register"       element={<Register />} />
        <Route path="/employee-login" element={<EmployeeLogin />} />
        <Route path="/admin-login"    element={<AdminLogin />} />

        {/* 3) User‑only */}
        <Route
          path="/dashboard"
          element={<ProtectedRoute><Dashboard/></ProtectedRoute>}
        />
        <Route
          path="/deposit"
          element={<ProtectedRoute><Deposit/></ProtectedRoute>}
        />
        <Route
          path="/transfer"
          element={<ProtectedRoute><Transfer/></ProtectedRoute>}
        />
        {/* <Route
          path="/balance"
          element={<ProtectedRoute><Balance/></ProtectedRoute>}
        /> */}

        {/* 4) Employee‑only */}
        <Route
          path="/delete-account"
          element={<EmployeeProtectedRoute><DeleteAccount/></EmployeeProtectedRoute>}
        />

        {/* 5) Admin‑only */}
        <Route
          path="/add-employee"
          element={<AdminProtectedRoute><AddEmployee/></AdminProtectedRoute>}
        />

        {/* 6) Catch‑all: back to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
