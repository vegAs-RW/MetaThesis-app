// CreateThesis.tsx
import React, { useState } from 'react';
import api from '../services/api';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store'; // Assurez-vous d'importer le bon type
import { useNavigate } from 'react-router-dom';
import  {jwtDecode } from 'jwt-decode';

interface TokenPayload {
    userId: string; // ou tout autre champ que vous avez dans le token
}

const CreateThesis: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [year, setYear] = useState<number | ''>('');
  const [domain, setDomain] = useState('');
  const [scientistInterest, setScientistInterest] = useState('');
  const [keyword, setKeyword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const token = useSelector((state: RootState) => state.auth.token);
  const navigate = useNavigate();

  const advisorId = token ? (jwtDecode<TokenPayload>(token).userId || null) : null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');

    // Validation simple des champs requis
    if (!topic || !year || !domain || !scientistInterest || !keyword) {
      setErrorMessage('Tous les champs sont requis.');
      return;
    }

    const newThesis = {
        topic,
        year,
        domain,
        scientistInterest,
        keyword,
        advisorId: advisorId,
        };

        console.log("Données de la thèse :", newThesis);

    try {
      const response = await api.post('/thesis', newThesis, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Rediriger vers la page de tableau de bord après la création réussie
      if (response.status === 201) {
        navigate('/dashboard/advisor'); // Modifiez ceci selon votre chemin de tableau de bord
      }
    } catch (error) {
      console.error('Erreur lors de la création de la thèse:', error);
      setErrorMessage('Une erreur est survenue lors de la création de la thèse.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-500 p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">Créer une Nouvelle Thèse</h1>
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Sujet :</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Année :</label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Domaine :</label>
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Intérêt Scientifique :</label>
            <select
              value={scientistInterest}
              onChange={(e) => setScientistInterest(e.target.value)}
              className="border rounded w-full py-2 px-3"
              required
            >
              <option value="" disabled>Select your option</option>
              <option value="Faible">Faible</option>
              <option value="Moyen">Moyen</option>
              <option value="Élevé">Élevé</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Mots-clés :</label>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>
          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
            Créer Thèse
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateThesis;
