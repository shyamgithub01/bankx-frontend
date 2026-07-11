import { Navigate } from 'react-router-dom';
import { getEmployee } from '../auth';

export default function EmployeeProtectedRoute({ children }) {
  if (!getEmployee()) return <Navigate to="/employee-login" replace />;
  return children;
}
