/*import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Menu: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const userRole = useSelector((state: RootState) => state.auth.role);

  if (!token) {
    return null;
  }

  const renderMenuItems = () => {
    switch (userRole) {
      case 'advisor':
        return (
          <>
            <li>
              <Link to="/create-thesis" className="text-blue-600 hover:text-blue-800">
                Nouvelle demande de thèse
              </Link>
            </li>
            <li>
              <Link to="/dashboard/advisor" className="text-blue-600 hover:text-blue-800">
                Mes demandes de thèse
              </Link>
            </li>
          </>
        );
      case 'admin':
        return (
          <>
          <li>
              <Link to="/all-theses" className="text-blue-600 hover:text-blue-800">
                Theses Dashboard
              </Link>
            </li>
            <li>
              <Link to="/all-laboratories" className="text-blue-600 hover:text-blue-800">
                Laboratories Dashboard
              </Link>
            </li>
             <li>
              <Link to="/all-establishments" className="text-blue-600 hover:text-blue-800">
                Establishments Dashboard
              </Link>
            </li>
            
            <li>
              <Link to="/data-analysis" className="text-blue-600 hover:text-blue-800">
                Analyse des données
              </Link>
            </li>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Menu</h2>
      <ul className="space-y-2">
        {renderMenuItems()}
      </ul>
    </div>
  );
};

export default Menu;*/

import React from 'react';
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
      {/* Header du menu */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Menu</h2>
        <ul className="space-y-4">
          {renderMenuItems()}
        </ul>
      </div>

      {/* Bouton Logout */}
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

export default Menu;

