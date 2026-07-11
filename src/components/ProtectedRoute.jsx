import { Navigate } from 'react-router-dom';
import { clearSession, getUser } from '../auth';

export default function ProtectedRoute({ children }) {
  const user = getUser();

  if (!user) return <Navigate to="/login" replace />;

  // Sessions saved before the login response carried the Aadhar number are
  // unusable for deposits and transfers — those would fail with a "field
  // required" error. Drop the session and make the user sign in again.
  if (!user.aadhar_card_number) {
    clearSession();
    return <Navigate to="/login" replace state={{ staleSession: true }} />;
  }

  return children;
}
