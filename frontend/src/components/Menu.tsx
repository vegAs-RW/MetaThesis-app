/*import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { logout } from '../redux/authSlice'; // Assurez-vous d'importer l'action de déconnexion

const Menu: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const userRole = useSelector((state: RootState) => state.auth.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!token) {
    return null;
  }

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const renderMenuItems = () => {
    switch (userRole) {
      case 'advisor':
        return (
          <>
            <li>
              <Link
                to="/create-thesis"
                className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                <i className="fas fa-plus-circle"></i>
                <span>Nouvelle demande de thèse</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/advisor"
                className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                <i className="fas fa-file-alt"></i>
                <span>Mes demandes de thèse</span>
              </Link>
            </li>
          </>
        );
      case 'admin':
        return (
          <>
            <li>
              <Link
                to="/all-theses"
                className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                <i className="fas fa-clipboard-list"></i>
                <span>Theses Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/all-laboratories"
                className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                <i className="fas fa-flask"></i>
                <span>Laboratories Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/all-establishments"
                className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                <i className="fas fa-university"></i>
                <span>Establishments Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/data-analysis"
                className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                <i className="fas fa-chart-line"></i>
                <span>Data analysis</span>
              </Link>
            </li>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-gray-50 shadow-lg flex flex-col justify-between p-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Menu</h2>
        <ul className="space-y-4">
          {renderMenuItems()}
        </ul>
      </div>

      <button
        onClick={handleLogout}
        className="mt-6 flex items-center justify-center w-full py-3 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition-colors duration-300"
      >
        <i className="fas fa-sign-out-alt mr-2"></i>
        Logout
      </button>
    </div>
  );
};

export default Menu;*/

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { logout } from '../redux/authSlice'; // Assurez-vous d'importer l'action de déconnexion

const Menu: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const userRole = useSelector((state: RootState) => state.auth.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false); // Etat pour ouvrir/fermer le menu mobile

  if (!token) {
    return null;
  }

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleMenuItemClick = () => {
    setIsOpen(false); // Fermer le menu quand un item est cliqué sur mobile/tablette
  };

  const renderMenuItems = () => {
    switch (userRole) {
      case 'advisor':
        return (
          <>
            <li>
              <Link
                to="/create-thesis"
                onClick={handleMenuItemClick}
                className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                <i className="fas fa-plus-circle"></i>
                <span>Nouvelle demande de thèse</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/advisor"
                onClick={handleMenuItemClick}
                className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                <i className="fas fa-file-alt"></i>
                <span>Mes demandes de thèse</span>
              </Link>
            </li>
          </>
        );
      case 'admin':
        return (
          <>
            <li>
              <Link
                to="/all-theses"
                onClick={handleMenuItemClick}
                className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                <i className="fas fa-clipboard-list"></i>
                <span>Theses Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/all-laboratories"
                onClick={handleMenuItemClick}
                className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                <i className="fas fa-flask"></i>
                <span>Laboratories Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/all-establishments"
                onClick={handleMenuItemClick}
                className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                <i className="fas fa-university"></i>
                <span>Establishments Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/data-analysis"
                onClick={handleMenuItemClick}
                className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                <i className="fas fa-chart-line"></i>
                <span>Data analysis</span>
              </Link>
            </li>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div>

      <button
        className="lg:hidden p-4 text-gray-700 absolute top-4 left-4 z-50" // Positionne l'icône hamburger en haut à gauche sur mobile/tablette
        onClick={() => setIsOpen(!isOpen)} // Toggle de l'état d'ouverture du menu
      >
        <i className={`fas fa-bars text-2xl ${isOpen ? 'text-blue-600' : 'text-gray-700'}`}>xxx</i>
      </button>

  
      <div className="hidden lg:block fixed top-0 left-0 h-full w-64 bg-gray-50 shadow-lg flex flex-col justify-between p-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Menu</h2>
          <ul className="space-y-4">
            {renderMenuItems()}
          </ul>
        </div>

        <button
          onClick={handleLogout}
          className="mt-6 flex items-center justify-center w-full py-3 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition-colors duration-300"
        >
          <i className="fas fa-sign-out-alt mr-2"></i>
          Logout
        </button>
      </div>

      <div
        className={`lg:hidden fixed top-0 left-0 w-64 bg-gray-50 shadow-lg transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'transform translate-x-0' : 'transform -translate-x-full'
        } h-screen`}
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Menu</h2>
          <button
            onClick={() => setIsOpen(false)} // Fermer le menu avec un bouton
            className="p-2 text-gray-800 hover:text-blue-600 transition-colors duration-200"
          >
            <i className="fas fa-times">XX</i>
          </button>
          <ul className="space-y-4">
            {renderMenuItems()}
          </ul>
        </div>

        <button
          onClick={handleLogout}
          className="mt-6 flex items-center justify-center w-2/3 mx-auto py-3 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition-colors duration-300"
        >
          <i className="fas fa-sign-out-alt mr-2"></i>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Menu;
