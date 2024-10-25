import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [department, setDepartment] = useState('');
  const [researchArea, setResearchArea] = useState('');
  const [ifrs, setIfrs] = useState('');
  const [costCenter, setCostCenter] = useState('');
  const [establishments, setEstablishments] = useState([]); // Liste des établissements
  const [selectedEstablishment, setSelectedEstablishment] = useState(''); // Établissement sélectionné
  const navigate = useNavigate();

  const fetchEstablishments = async () => {
    try {
      const response = await api.get('/establishment'); // Requête vers l'API pour obtenir les établissements
      setEstablishments(response.data.data); // Mise à jour de la liste des établissements
      console.log("Établissements récupérés :", response.data.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des établissements :", error);
    }
  };

  useEffect(() => {
    fetchEstablishments(); 
  }, []);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault(); 

    try {
      console.log("Données d'inscription :", {
        email,
        password,
        firstname,
        lastname,
        department,
        researchArea,
        ifrs,
        costCenter,
        selectedEstablishment,
      });
      
      await api.post('/auth/register', {
        email,
        password,
        firstname,
        lastname,
        department,
        research_area: researchArea, 
        ifrs,
        costCenter,
        establishment: selectedEstablishment, 
      });

      navigate('/login');
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-200 to-blue-500">
      <div className="w-full max-w-lg px-8 py-6 bg-white rounded-lg shadow-lg transform transition-all duration-500 hover:shadow-2xl md:px-10 md:py-8 lg:max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">Inscription</h1>
        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label className="block text-md font-semibold text-gray-600">Email :</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-md font-semibold text-gray-600">Mot de passe :</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-md font-semibold text-gray-600">Prénom :</label>
            <input
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-md font-semibold text-gray-600">Nom :</label>
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-md font-semibold text-gray-600">Organisation :</label>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-md font-semibold text-gray-600">Service :</label>
            <input
              type="text"
              value={researchArea}
              onChange={(e) => setResearchArea(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-md font-semibold text-gray-600">Code IFRS :</label>
            <input
              type="text"
              value={ifrs}
              onChange={(e) => setIfrs(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-md font-semibold text-gray-600">Centre de coût :</label>
            <input
              type="text"
              value={costCenter}
              onChange={(e) => setCostCenter(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-md font-semibold text-gray-600">Établissement :</label>
            <select
              value={selectedEstablishment}
              onChange={(e) => setSelectedEstablishment(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Sélectionner un établissement</option>
              {establishments.map((establishment: { id: string; name: string }) => (
                <option key={establishment.id} value={establishment.id}>
                  {establishment.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-300 shadow-lg focus:ring-4 focus:ring-blue-400 focus:outline-none"
          >
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
