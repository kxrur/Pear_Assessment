import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@s/store';


export default function ProtectedLayout() {
  const isAuthenticated = !!useAppSelector((state) => state.user.id);

  if (isAuthenticated) {
    return <Navigate replace to={'/'} />;
  }
  return <Outlet />;
}

