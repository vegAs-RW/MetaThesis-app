// Menu.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store'; // Assurez-vous d'importer le bon type

const Menu: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.token); // Récupération du token
  const userRole = useSelector((state: RootState) => state.auth.role); // Supposons que le rôle est stocké dans le state

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
              <Link to="/add-establishment" className="text-blue-600 hover:text-blue-800">
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

export default Menu;
