/*import React from 'react';
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

export default Layout;*/
/*import React from 'react';
import { useLocation } from 'react-router-dom';
import Menu from './Menu';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation(); // Récupération de la route actuelle

  // Vérifiez si la route actuelle est /login ou /signup
  const isAuthRoute = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className="flex min-h-screen">

      {!isAuthRoute && (
        <div className="w-full lg:w-1/4 bg-white shadow-md p-6 hidden lg:block"> 
          <Menu />
        </div>
      )}

      
      <div className={`flex-1 p-6 ${isAuthRoute ? 'bg-gradient-to-b from-blue-200 to-blue-500' : 'bg-white'}`}>
        {children}
      </div>
    </div>
  );
};
export default Layout;*/


/*import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Menu from './Menu';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation(); // Récupération de la route actuelle
  const [isMenuOpen, setIsMenuOpen] = useState(false); // État pour gérer l'ouverture du menu mobile

  // Vérifie si la route actuelle est /login ou /signup
  const isAuthRoute = location.pathname === '/login' || location.pathname === '/signup';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle de l'état du menu
  };

  return (
    <div className="flex min-h-screen">

      <button
        className="lg:hidden p-4 text-gray-700 fixed top-6 left-4 z-50" // Visible sur mobile et fixe en haut à gauche
        onClick={toggleMenu}
      >
        <i className={`fas fa-bars text-2xl ${isMenuOpen ? 'text-blue-600' : 'text-gray-700'}`} />
      </button>


      <div
        className={`lg:hidden top-0 left-0 w-full bg-white p-6 transform transition-all duration-300 z-40 ${
          isMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <Menu />
      </div>


      {!isAuthRoute && (
        <div className="hidden lg:block lg:w-1/4 bg-white shadow-md p-6">
          <Menu />
        </div>
      )}

      <div className={`flex-1 p-6 ${isAuthRoute ? 'bg-gradient-to-b from-blue-200 to-blue-500' : 'bg-white'}`}>
        {children}
      </div>
    </div>
  );
};

export default Layout;*/

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Menu from './Menu';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation(); // Récupération de la route actuelle
  const [isMenuOpen, setIsMenuOpen] = useState(false); // État pour gérer l'ouverture du menu mobile

  // Vérifie si la route actuelle est /login ou /signup
  const isAuthRoute = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/*';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle de l'état du menu
  };

  return (
    <div className="flex min-h-screen">
      {/* Affichage du bouton hamburger en haut de la page pour les petits écrans */}
      <button
        className="lg:hidden p-4 text-gray-700 fixed top-6 left-4 z-50" // Positionné à 6px du haut pour plus de marge
        onClick={toggleMenu}
      >
        <i className={`fas fa-bars text-2xl ${isMenuOpen ? 'text-blue-600' : 'text-gray-700'}`} />
      </button>

      {/* Menu responsive mobile/tablette, visible uniquement quand isMenuOpen est true */}
      <div
        className={`lg:hidden fixed top-0 left-0 w-auto bg-white p-6 transform transition-all duration-300 z-40 ${
          isMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <Menu />
      </div>

      {/* Menu Desktop */}
      {!isAuthRoute && (
        <div className="hidden lg:block lg:w-1/4 bg-white shadow-md p-6">
          <Menu />
        </div>
      )}

      {/* Contenu principal */}
      <div className={`flex-1 p-6 ${isAuthRoute ? 'bg-gradient-to-b from-blue-200 to-blue-500' : 'bg-white'}`}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
