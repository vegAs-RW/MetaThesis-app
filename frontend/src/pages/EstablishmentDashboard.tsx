import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import AddEntityModal from "../components/AddEntityModal";
import { establishmentFields } from "../constants/establishmentFields";
import EntityDetailsModal from "../components/EntityDetailsModal";

interface Establishment {
  id: string;
  name: string;
  siret: string;
  address: string;
  zipcode: string;
  city: string;
  telephone: string;
}

const EstablishmentDashboard: React.FC = () => {
  const [establishments, setEstablishments] = useState<Establishment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAddEstablishmentModalOpen, setIsAddEstablishmentModalOpen] =
    useState(false);
  const [isEstablishmentDetailsModalOpen, setIsEstablishmentDetailsModalOpen] =
    useState(false);
  const [selectedEstablishmentId, setSelectedEstablishmentId] = useState<
    string | null
  >(null);
  const token = useSelector((state: RootState) => state.auth.token);

  const fetchEstablishments = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await api.get("/establishment", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEstablishments(response.data.data);
    } catch (err) {
      console.error("Error fetching establishments:", err);
      setError("Failed to load establishments. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEstablishments();
  }, [token]);

  const handleEstablishmentClick = (establishmentId: string) => {
    setSelectedEstablishmentId(establishmentId);
    setIsEstablishmentDetailsModalOpen(true);
  };

  const closeEstablishmentDetailsModal = () => {
    setIsEstablishmentDetailsModalOpen(false);
    setSelectedEstablishmentId(null);
  };

  const closeAddEstablishmentModal = () => {
    setIsAddEstablishmentModalOpen(false);
  };

  const handleAddEstablishment = async (formData: Record<string, any>) => {
    try {
      await api.post(
        "/establishment",
        { ...formData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchEstablishments();
    } catch (err) {
      console.error("Error adding establishment:", err);
      throw err;
    }
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
        Establishments Dashboard
      </h1>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Establishments</h2>
        <button
          onClick={() => setIsAddEstablishmentModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700"
        >
          Add an Establishment
        </button>
      </div>
      {establishments.length === 0 ? (
        <p className="text-center text-gray-600">No establishments found.</p>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-200 text-blue-900">
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Name
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  SIRET
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Address
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  City
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Zipcode
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Telephone
                </th>
              </tr>
            </thead>
            <tbody>
              {establishments.map((establishment) => (
                <tr
                  key={establishment.id}
                  className="hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleEstablishmentClick(establishment.id)}
                >
                  <td className="border border-gray-300 px-4 py-2">
                    {establishment.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {establishment.siret}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {establishment.address}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {establishment.city}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {establishment.zipcode}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {establishment.telephone}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isEstablishmentDetailsModalOpen && selectedEstablishmentId && (
        <EntityDetailsModal
          entityId={selectedEstablishmentId}
          entityName="Establishment"
          apiEndpoints={{
            entity: "/establishment",
          }}
          fields={[
            { label: "Name", value: "name" },
            { label: "SIRET", value: "siret" },
            { label: "Address", value: "address" },
            { label: "City", value: "city" },
            { label: "Zipcode", value: "zipcode" },
            { label: "Telephone", value: "telephone" },
          ]}
          onClose={closeEstablishmentDetailsModal}
          onEntityUpdated={fetchEstablishments}
        />
      )}
      {isAddEstablishmentModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-3/4 lg:w-2/3 max-h-[80vh] overflow-y-auto">
            <AddEntityModal
              onClose={closeAddEstablishmentModal}
              onSubmit={handleAddEstablishment}
              fields={establishmentFields}
              entityName="Establishment"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EstablishmentDashboard;
