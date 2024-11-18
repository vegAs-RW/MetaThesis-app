import React, { useState, useEffect } from "react";
import api from "../services/api"; // Assure-toi que l'api est correctement importée

interface Director {
    firstname: string;
    lastname: string;
    email: string;
    phoneNumber: string;
    hdr: boolean;
  }

interface Laboratory {
    id: string;
    name: string;
    address: string;
    city: string;
    country: string;
    means: string;
    expertise: string;
    director: Director
  }

interface LaboratoryDetailsModalProps {
  laboratoryId: string; // Nous recevons ici l'id du laboratoire
  onClose: () => void;
  onLaboratoryUpdated: () => Promise<void>;
}

const LaboratoryDetailsModal: React.FC<LaboratoryDetailsModalProps> = ({
  laboratoryId,
  onClose,
  onLaboratoryUpdated,
}) => {
  const [laboratory, setLaboratory] = useState<Laboratory | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  
    const fetchLaboratoryById = async () => {
      setLoading(true);
      setError("");

      try {
        const labResponse = await api.get(`/laboratory/${laboratoryId}`);
        const directorResponse = await api.get(`/lab-director/laboratory/${laboratoryId}`) 
        setLaboratory({
          ...labResponse.data.data,
          director: directorResponse.data.data
        });
      } catch (err) {
        console.error("Error fetching laboratory:", err);
        setError("Failed to load laboratory details.");
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchLaboratoryById();
    }, [laboratoryId]);


    const handleEditClick = () => {
        // Logique pour la modification des informations du laboratoire
        // Après modification, on appelle onLaboratoryUpdated pour rafraîchir la liste des laboratoires
        onLaboratoryUpdated();
        onClose(); // Ferme la modale après la mise à jour
      };

  if (loading) {
    return <div className="text-center text-blue-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  if (!laboratory) {
    return <div>No laboratory data available.</div>;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-4">
  <div className="bg-white p-8 rounded-lg shadow-xl w-full md:w-3/4 lg:w-2/3 max-h-[80vh] overflow-y-auto">
    {/* Bouton pour fermer la modale */}
    <button
      onClick={onClose}
      className="absolute top-4 right-4 text-4xl text-gray-600 hover:text-gray-800 focus:outline-none"
      aria-label="Close"
    >
      &times;
    </button>

    {/* Titre de la modale */}
    <h1 className="text-3xl font-semibold text-blue-600 mb-6 text-center">Laboratory Details</h1>

    {/* Contenu principal avec deux colonnes */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Colonne 1 : Informations générales */}
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="font-semibold">Name:</span>
          <span>{laboratory.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Address:</span>
          <span>{laboratory.address}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">City:</span>
          <span>{laboratory.city}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Country:</span>
          <span>{laboratory.country}</span>
        </div>
      </div>

      {/* Colonne 2 : Détails supplémentaires */}
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="font-semibold">Means:</span>
          <span>{laboratory.means}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Expertise:</span>
          <span>{laboratory.expertise}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Director:</span>
          <span>
            {laboratory.director.firstname} {laboratory.director.lastname}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Email:</span>
          <span>{laboratory.director.email}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Phone:</span>
          <span>{laboratory.director.phoneNumber}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">HDR:</span>
          <span>{laboratory.director.hdr ? "Yes" : "No"}</span>
        </div>
      </div>
    </div>

    {/* Bouton pour éditer le laboratoire */}
    <div className="flex justify-end mt-8">
      <button
        onClick={handleEditClick}
        className="px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none"
      >
        Edit informations
      </button>
    </div>
  </div>
</div>
  );
};

export default LaboratoryDetailsModal;
