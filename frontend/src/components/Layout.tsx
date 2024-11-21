// Layout.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import Menu from './Menu';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation(); // Récupération de la route actuelle

  // Vérifiez si la route actuelle est /login ou /signup
  const isAuthRoute = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className="flex min-h-screen">
      {!isAuthRoute && (
        <div className="w-1/4 bg-white shadow-md p-6">
          <Menu />
        </div>
      )}
      <div className={`flex-1 p-6 ${isAuthRoute ? 'bg-gradient-to-b from-blue-200 to-blue-500' : 'bg-white'}`}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
