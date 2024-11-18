import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import AddLaboratory from "../components/AddLaboratoryPage";
import LaboratoryDetailsModal from "../components/LaboratoryDetails.tsx";

interface Laboratory {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  means: string;
  expertise: string;
  director: {
    email: string;
    firstname: string;
    lastname: string;
    phoneNumber: string;
    hdr: boolean;
  };
}

const LaboratoryDashboard: React.FC = () => {
  const [laboratories, setLaboratories] = useState<Laboratory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAddLabModalOpen, setIsAddLabModalOpen] = useState(false);
  const [isLabDetailsModalOpen, setIsLabDetailsModalOpen] = useState(false);
  const [selectedLaboratoryId, setSelectedLaboratoryId] = useState<string | null>(null);
  const token = useSelector((state: RootState) => state.auth.token);

  const fetchLaboratories = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await api.get("/laboratory", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLaboratories(response.data.data);
    } catch (err) {
      console.error("Error fetching laboratories:", err);
      setError("Failed to load laboratories. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLaboratories();
  }, [token]);

  const handleLaboratoryClick = (laboratoryId: string) => {
    setSelectedLaboratoryId(laboratoryId); // Stocker l'ID du laboratoire sélectionné
    setIsLabDetailsModalOpen(true); // Ouvrir la modale
  };

  const closeLabDetailsModal = () => {
    setIsLabDetailsModalOpen(false); // Fermer la modale
    setSelectedLaboratoryId(null); // Réinitialiser l'ID du laboratoire sélectionné
  }

  const closeAddLabModal = () => {
    setIsAddLabModalOpen(false); // Fermer la modale
    
  };

  if (loading) {
    return <div className="text-center text-blue-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        Laboratories Dashboard
      </h1>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Laboratories</h2>
        <button
        onClick={() => setIsAddLabModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700"
        >
          Add a Laboratory
        </button>
      </div>
      {laboratories.length === 0 ? (
        <p className="text-center text-gray-600">No laboratories found.</p>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-200 text-blue-900">
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Laboratory Name
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Address
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  City
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Country
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Means
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Expertise
                </th>
              </tr>
            </thead>
            <tbody>
              {laboratories.map((lab) => (
                <tr key={lab.id} className="hover:bg-gray-100"
                onClick={() => handleLaboratoryClick(lab.id)}>
                  <td className="border border-gray-300 px-4 py-2">
                    {lab.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {lab.address}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {lab.city}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {lab.country}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {lab.means}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {lab.expertise}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* Modale pour afficher les détails du laboratoire */}
      {isLabDetailsModalOpen && selectedLaboratoryId && (
        <LaboratoryDetailsModal
          laboratoryId={selectedLaboratoryId} // Passer l'ID du laboratoire
          onClose={closeLabDetailsModal} // Fonction pour fermer la modale
          onLaboratoryUpdated={fetchLaboratories} // Rafraîchir la liste après modification
        />
      )}
      {/* Pop-up modale */}
      {isAddLabModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-3/4 lg:w-2/3 max-h-[80vh] overflow-y-auto">
            <AddLaboratory
              onClose={closeAddLabModal} // Ferme la popup
              onLaboratoryAdded={fetchLaboratories} // Rafraîchit la liste après ajout
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LaboratoryDashboard;
