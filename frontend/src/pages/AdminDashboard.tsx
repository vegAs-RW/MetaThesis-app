import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import ThesisFilters from "../components/ThesisFilter";
import * as XLSX from "xlsx";
import EntityDetailsModal from "../components/EntityDetailsModal";

interface Thesis {
  id: string;
  topic: string;
  year: number;
  domain: string;
  scientistInterest: string;
  keyword: string;
  advisor: {
    id: string;
    firstname: string;
    lastname: string;
    costCenter: string;
    IFRS: string;
    establishment: {
      id: string;
      name: string;
      address: string;
      city: string;
      siret: string;
      zipcode: string;
      telephone: string;
    };
  };
  candidate?: {
    id: string;
    firstname: string;
    lastname: string;
    birthdate: string;
    lastDegree: string;
    dateLastDegree: string;
  };
  laboratory?: {
    id: string;
    name: string;
    address: string;
    city: string;
    country: string;
    means: string;
    expertise: string;
  };
}

const AdminDashboard: React.FC = () => {
  const [theses, setTheses] = useState<Thesis[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({});
  const [selectedThesisId, setSelectedThesisId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const token = useSelector((state: RootState) => state.auth.token);

  const fetchTheses = async (filters: any) => {
    try {
      console.log("Récupération des thèses avec les filtres:", filters);
      const response = await api.get("/thesis", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: filters,
      });
      console.log("Thèses récupérées:", response.data.data);
      setTheses(response.data.data);
      setLoading(false);
    } catch (err) {
      console.error("Erreur lors de la récupération des thèses:", err);
      setError("Impossible de charger les thèses.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTheses(filters);
  }, [filters, token]);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleThesisClick = (thesisId: string) => {
    setSelectedThesisId(thesisId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedThesisId(null);
  };

  // Fonction pour exporter les données en Excel
  const exportToExcel = () => {
    const data = theses.map((thesis) => ({
      Advisor: `${thesis.advisor.firstname} ${thesis.advisor.lastname}`,
      Topic: thesis.topic,
      Year: thesis.year,
      Domain: thesis.domain,
      ScientistInterest: thesis.scientistInterest,
      Keyword: thesis.keyword,
      Candidate: thesis.candidate
        ? `${thesis.candidate.firstname} ${thesis.candidate.lastname}`
        : "No entry",
      Laboratory: thesis.laboratory ? thesis.laboratory.name : "No entry",
    }));

    // Créer une feuille de calcul à partir des données
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();

    // Ajouter la feuille de calcul au classeur
    XLSX.utils.book_append_sheet(wb, ws, "Theses");

    // Télécharger le fichier Excel
    XLSX.writeFile(wb, "Theses.xlsx");
  };

  const handleEntityUpdated = async () => {
    await fetchTheses(filters); // Appelez fetchTheses sans argument
  };

  if (selectedThesisId) console.log("Thèses:", selectedThesisId);

  if (loading) {
    return <p className="text-center text-gray-600">Loading Theses...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        Theses Dashboard
      </h1>

      <ThesisFilters onFilter={handleFilterChange} />

      {/* Ajout du bouton d'exportation */}
      <div className="flex justify-end mb-4">
        <button
          onClick={exportToExcel}
          className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
        >
          Export to Excel
        </button>
      </div>

      {theses.length === 0 ? (
        <p className="text-center text-gray-600">No matching theses.</p>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-200 text-blue-900">
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Advisor
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Topic
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Year
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Domain
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Scientist interest
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Keyword
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Candidate
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Laboratory
                </th>
              </tr>
            </thead>
            <tbody>
              {theses.map((thesis) => (
                <tr
                  key={thesis.id}
                  className="hover:bg-gray-100"
                  onClick={() => handleThesisClick(thesis.id)}
                >
                  <td className="border border-gray-300 px-4 py-2">
                    {thesis.advisor
                      ? `${thesis.advisor.firstname} ${thesis.advisor.lastname}`
                      : "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {thesis.topic}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {thesis.year}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {thesis.domain}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {thesis.scientistInterest}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {thesis.keyword}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {thesis.candidate
                      ? `${thesis.candidate.firstname} ${thesis.candidate.lastname}`
                      : "No entry"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {thesis.laboratory
                      ? `${thesis.laboratory.name}`
                      : "No entry"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Affichage de la modal si une thèse est sélectionnée */}
      {showModal && selectedThesisId && (
        <EntityDetailsModal
          entityId={selectedThesisId}
          entityName="Thesis"
          apiEndpoints={{
            entity: "/thesis",
          }}
          fields={[
            { label: "Topic", value: "topic", section: "Thesis Information" },
            { label: "Year", value: "year", section: "Thesis Information" },
            { label: "Domain", value: "domain", section: "Thesis Information" },
            { label: "Scientist Interest", value: "scientistInterest", section: "Thesis Information" },
            { label: "Keyword", value: "keyword", section: "Thesis Information" },
            { label: "advisor's firstname", value: "advisor.firstname", section: "Advisor Information" },
            { label: "Advisor's Lastname", value: "advisor.lastname", section: "Advisor Information" },
            { label: "Advisor's Cost Center", value: "advisor.costCenter", section: "Advisor Information" },
            { label: "Advisor's IFRS", value: "advisor.ifrs", section: "Advisor Information" },
            { label: "Advisor's Department", value: "advisor.department", section: "Advisor Information" },
            {label: "Advisor's research area", value: "advisor.research_area", section: "Advisor Information" },
            /*{ label: "Advisor's Establishment Name", value: "advisor.establishment.name" },
            { label: "Advisor's Establishment Address", value: "advisor.establishment.address" },
            { label: "Advisor's Establishment City", value: "advisor.establishment.city" },
            { label: "Advisor's Establishment SIRET", value: "advisor.establishment.siret" },
            { label: "Advisor's Establishment Zipcode", value: "advisor.establishment.zipcode" },
            { label: "Advisor's Establishment Telephone", value: "advisor.establishment.telephone" },*/
            { label: "Candidate's Firstname", value: "candidate.firstname", section: "Candidate Information" },
            { label: "Candidate's Lastname", value: "candidate.lastname", section: "Candidate Information" },
            { label: "Candidate's Birthdate", value: "candidate.birthdate", section: "Candidate Information" },
            { label: "Candidate's Last Degree", value: "candidate.lastDegree", section: "Candidate Information" },
            { label: "Candidate's Last Degree Date", value: "candidate.dateLastDegree", section: "Candidate Information" },
            { label: "Laboratory Name", value: "laboratory.name", section: "Laboratory Information" },
            { label: "Laboratory Address", value: "laboratory.address", section: "Laboratory Information" },
            { label: "Laboratory City", value: "laboratory.city", section: "Laboratory Information" },
            { label: "Laboratory Country", value: "laboratory.country", section: "Laboratory Information" },
            { label: "Laboratory Means", value: "laboratory.means", section: "Laboratory Information" },
            { label: "Laboratory Expertise", value: "laboratory.expertise", section: "Laboratory Information" },
          ]}
          onClose={handleCloseModal}
          onEntityUpdated={handleEntityUpdated}
          customActions={() => (
            <button
            onClick={exportToExcel}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
          >
            Export to Excel
          </button>
          )}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
