import React, { useState, useEffect } from 'react';
import api from '../services/api'; // Assurez-vous que ce service Axios est correctement configuré
import { useNavigate } from 'react-router-dom';

const SignupPage: React.FC = () => {
  // États pour chaque champ du formulaire
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

  // Fonction pour récupérer les établissements depuis l'API
  const fetchEstablishments = async () => {
    try {
      const response = await api.get('/establishment'); // Requête vers l'API pour obtenir les établissements
      setEstablishments(response.data.data); // Mise à jour de la liste des établissements
      console.log("Établissements récupérés :", response.data.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des établissements :", error);
    }
  };

  // Utilisation de useEffect pour déclencher la récupération des établissements au montage du composant
  useEffect(() => {
    fetchEstablishments(); // Appel de la fonction pour charger les établissements
  }, []);

  // Fonction pour gérer la soumission du formulaire
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault(); // Empêche le rechargement de la page

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
      // Requête POST pour envoyer les données d'inscription à l'API
      await api.post('/auth/register', {
        email,
        password,
        firstname,
        lastname,
        department,
        research_area: researchArea, // Nom du champ correspond à ce qui est attendu dans l'API
        ifrs,
        costCenter,
        establishment: selectedEstablishment, // On envoie l'ID de l'établissement sélectionné
      });

      // Redirection vers la page de connexion après succès
      navigate('/login');
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
    }
  };

  return (
    <div>
      <h1>Inscription</h1>
      <form onSubmit={handleSignup}>
        <div>
          <label>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Mot de passe</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Prénom</label>
          <input 
            type="text" 
            value={firstname} 
            onChange={(e) => setFirstname(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Nom</label>
          <input 
            type="text" 
            value={lastname} 
            onChange={(e) => setLastname(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Département</label>
          <input 
            type="text" 
            value={department} 
            onChange={(e) => setDepartment(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Zone de recherche</label>
          <input 
            type="text" 
            value={researchArea} 
            onChange={(e) => setResearchArea(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>IFRS</label>
          <input 
            type="text" 
            value={ifrs} 
            onChange={(e) => setIfrs(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Centre de coût</label>
          <input 
            type="text" 
            value={costCenter} 
            onChange={(e) => setCostCenter(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Établissement</label>
          <select
            value={selectedEstablishment}
            onChange={(e) => setSelectedEstablishment(e.target.value)}
            required
          >
            <option value="">Sélectionner un établissement</option>
            {/* Affichage dynamique des établissements récupérés */}
            {establishments.map((establishment: { id: string; name: string }) => (
              <option key={establishment.id} value={establishment.id}>
                {establishment.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default SignupPage;
