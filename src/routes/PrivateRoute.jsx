import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../components/useAuthStore';

export const PrivateRoute = ({ children }) => {
  const { token } = useAuthStore();
  
  return token ? children : <Navigate to="/" replace/>;
};