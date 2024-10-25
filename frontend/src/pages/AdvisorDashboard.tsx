import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { jwtDecode } from 'jwt-decode';

interface TokenPayload {
    userId: string;
}

const DashboardAdvisor: React.FC = () => {
    const [thesisRequests, setThesisRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const token = useSelector((state: RootState) => state.auth.token); // Récupération du token

    const fetchThesisRequests = async () => {
        if (!token) {
            console.error('Token non trouvé');
            setLoading(false); 
            return;
        }

        const decodedToken: TokenPayload = jwtDecode(token);
        const advisorId = decodedToken.userId;
        try {
            const response = await api.get(`/thesis/advisor/${advisorId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setThesisRequests(response.data.data); 
        } catch (error) {
            console.error('Erreur lors de la récupération des demandes de thèse :', error);
        } finally {
            setLoading(false); 
        }
    };

    const handleRowClick = (thesisId: string) => {
        navigate(`/thesis/edit/${thesisId}`); // Navigue vers la page de détails de la thèse
    };

    useEffect(() => {
        fetchThesisRequests(); 
    }, [token]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-500 p-8">
            <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">Tableau de Bord Advisor</h1>
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Demandes de Thèse</h2>
                {loading ? (
                    <p className="text-center text-gray-600">Chargement des demandes de thèse...</p>
                ) : thesisRequests.length === 0 ? (
                    <p className="text-center text-gray-600">Aucune demande de thèse à afficher.</p>
                ) : (
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden shadow-lg">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="py-3 px-4 border-b border-gray-300 text-left">Sujet</th>
                                <th className="py-3 px-4 border-b border-gray-300 text-left">Année</th>
                                <th className="py-3 px-4 border-b border-gray-300 text-left">Mots clés</th>
                            </tr>
                        </thead>
                        <tbody>
                            {thesisRequests.map((request: any, index: number) => (
                                <tr key={request.id} className={`hover:bg-blue-100 transition duration-200 ${index % 2 === 0 ? 'bg-gray-50' : ''}`}
                                onClick={() => handleRowClick(request.id)}>
                                    <td className="py-4 px-4 border-b border-gray-300">{request.topic}</td>
                                    <td className="py-4 px-4 border-b border-gray-300">{request.year}</td>
                                    <td className="py-4 px-4 border-b border-gray-300">{request.keyword}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default DashboardAdvisor;
