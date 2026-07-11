import { Navigate } from 'react-router-dom';
import { getAdmin } from '../auth';

export default function AdminProtectedRoute({ children }) {
  if (!getAdmin()) return <Navigate to="/admin-login" replace />;
  return children;
}
