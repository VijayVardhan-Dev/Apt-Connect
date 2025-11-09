import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function PrivateRoute({ children }) {
  const auth = useAuth();
  if (!auth?.user) return <Navigate to="/login" replace />;
  return children;
}
