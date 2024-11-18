import React, { useState } from 'react';
import api from '../services/api';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

interface TokenPayload {
    userId: string;
}

const CreateThesis: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [year, setYear] = useState<number | ''>('');
  const [domain, setDomain] = useState('');
  const [scientistInterest, setScientistInterest] = useState('');
  const [keyword, setKeyword] = useState('');

  // États pour le candidat
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [lastDegree, setLastDegree] = useState('');
  const [dateLastDegree, setDateLastDegree] = useState('');
  const [doctoralSchool, setDoctoralSchool] = useState('');
  const [residentPermit, setResidentPermit] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');
  const token = useSelector((state: RootState) => state.auth.token);
  const navigate = useNavigate();

  const advisorId = token ? (jwtDecode<TokenPayload>(token).userId || null) : null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');

    if (!topic || !year || !domain || !scientistInterest || !keyword ||
        !firstname || !lastname || !birthdate || !lastDegree || !dateLastDegree || !doctoralSchool) {
      setErrorMessage('Tous les champs sont requis.');
      return;
    }

    try {
      const candidateData = {
        firstname,
        lastname,
        birthdate,
        lastDegree,
        dateLastDegree,
        doctoralSchool,
        residentPermit,
        advisor: advisorId,
      };
      const candidateResponse = await api.post('/candidate', candidateData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const candidateId = candidateResponse.data.data.candidate;

      const newThesis = {
        topic,
        year,
        domain,
        scientistInterest,
        keyword,
        advisorId,
        candidateId,
      };

      const thesisResponse = await api.post('/thesis', newThesis, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (thesisResponse.status === 201) {
        navigate('/dashboard/advisor');
      }
    } catch (error) {
      console.error('Erreur lors de la création de la thèse ou du candidat:', error);
      setErrorMessage('Une erreur est survenue lors de la création de la thèse ou du candidat.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-500 p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">Create a new thesis request</h1>
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto">
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

        <form onSubmit={handleSubmit}>
          {/* Section Thèse */}
          <h2 className="text-2xl font-semibold text-blue-600 mb-4 border-b pb-2">Thesis informations</h2>
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="col-span-2">
              <label className="block mb-2">Topic :</label>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="border rounded w-full py-2 px-3 resize-y h-32"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Year :</label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="border rounded w-full py-2 px-3"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Domain :</label>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="border rounded w-full py-2 px-3"
                required
              />
            </div>
            <div className="col-span-2">
              <label className="block mb-2">Scientist interest :</label>
              <select
                value={scientistInterest}
                onChange={(e) => setScientistInterest(e.target.value)}
                className="border rounded w-full py-2 px-3"
                required
              >
                <option value="" disabled>Select an option</option>
                <option value="Faible">Low</option>
                <option value="Moyen">Medium</option>
                <option value="Élevé">High</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block mb-2">Keyword :</label>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="border rounded w-full py-2 px-3"
                required
              />
            </div>
          </div>

          {/* Section Candidat */}
          <h2 className="text-2xl font-semibold text-blue-600 mb-4 border-b pb-2">Candidate's informations</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block mb-2">Firstname :</label>
              <input
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className="border rounded w-full py-2 px-3"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Lastname :</label>
              <input
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className="border rounded w-full py-2 px-3"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Birthdate :</label>
              <input
                type="date"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                className="border rounded w-full py-2 px-3"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Last degree :</label>
              <input
                type="text"
                value={lastDegree}
                onChange={(e) => setLastDegree(e.target.value)}
                className="border rounded w-full py-2 px-3"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Last degree's date :</label>
              <input
                type="date"
                value={dateLastDegree}
                onChange={(e) => setDateLastDegree(e.target.value)}
                className="border rounded w-full py-2 px-3"
                required
              />
            </div>
            <div className="col-span-2">
              <label className="block mb-2">Doctoral school :</label>
              <input
                type="text"
                value={doctoralSchool}
                onChange={(e) => setDoctoralSchool(e.target.value)}
                className="border rounded w-full py-2 px-3"
                required
              />
            </div>
            <div className="col-span-2">
              <label className="flex items-center space-x-2">
                <span>Resident Permit (if not french) :</span>
                <input
                  type="checkbox"
                  checked={residentPermit}
                  onChange={(e) => setResidentPermit(e.target.checked)}
                  className="border rounded"
                />
              </label>
            </div>
          </div>

          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded mt-6">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateThesis;
