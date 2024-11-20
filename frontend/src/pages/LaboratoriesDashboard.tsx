import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import AddEntityModal from "../components/AddEntityModal.tsx";
import { laboratoryFields } from "../constants/laboratoryFields.tsx";
import EntityDetailsModal from "../components/EntityDetailsModal.tsx";

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
  const [selectedLaboratoryId, setSelectedLaboratoryId] = useState<
    string | null
  >(null);
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
    setSelectedLaboratoryId(laboratoryId);
    setIsLabDetailsModalOpen(true);
  };

  const closeLabDetailsModal = () => {
    setIsLabDetailsModalOpen(false);
    setSelectedLaboratoryId(null);
  };

  const closeAddLabModal = () => {
    setIsAddLabModalOpen(false);
  };

  const handleAddLaboratory = async (formData: Record<string, any>) => {
    try {
      await api.post(
        "/laboratory",
        { ...formData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchLaboratories();
    } catch (err) {
      console.error("Error adding laboratory:", err);
      throw err;
    }
  };

  const handleDirectorUpdate = async (data: Record<string, any>) => {
    try {
      const directorData = {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        phoneNumber: data.phoneNumber,
        hdr: data.hdr,
      };
  
      await api.put(`/lab-director/${data.id}`, directorData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      refreshLaboratories();
    } catch (err) {
      console.error("Error updating director:", err);
      alert("Failed to update director information. Please try again later.");
    }
  };
  

  const refreshLaboratories = async (): Promise<void> => {
    await fetchLaboratories();
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
                <tr
                  key={lab.id}
                  className="hover:bg-gray-100"
                  onClick={() => handleLaboratoryClick(lab.id)}
                >
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
      {isLabDetailsModalOpen && selectedLaboratoryId && (
        <EntityDetailsModal
          entityId={selectedLaboratoryId}
          entityName="Laboratory"
          apiEndpoints={{
            entity: "/laboratory",
            additional: "/lab-director/laboratory",
          }}
          fields={[
            { label: "Name", value: "name" },
            { label: "Address", value: "address" },
            { label: "City", value: "city" },
            { label: "Country", value: "country" },
            { label: "Means", value: "means", type: "select", options: ["Low", "Medium", "High"] },
            { label: "Expertise", value: "expertise", type: "select", options: ["Low", "Medium", "High"] },
            { label: "Director's firstname", value: "firstname", type: "text" },
            { label: "Director's lastname", value: "lastname", type: "text" },
            { label: "Director's Email", value: "email", type: "text" },
            { label: "Director's Phone", value: "phoneNumber", type: "text" },
            { label: "HDR", value: "hdr", type: "boolean" },
          ]}
          onClose={closeLabDetailsModal}
          onEntityUpdated={refreshLaboratories}
          onDirectorUpdate={handleDirectorUpdate}
        />
      )}
      {isAddLabModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-3/4 lg:w-2/3 max-h-[80vh] overflow-y-auto">
            <AddEntityModal
              onClose={closeAddLabModal}
              onSubmit={handleAddLaboratory}
              fields={laboratoryFields}
              entityName="Laboratory"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LaboratoryDashboard;
