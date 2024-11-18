// AllTheses.tsx
import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import ThesisFilters from "../components/ThesisFilter";

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
  };
  candidate?: {
    id: string;
    firstname: string;
    lastname: string;
  };
}

const AdminDashboard: React.FC = () => {
  const [theses, setTheses] = useState<Thesis[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({});
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

  if (loading) {
    return (
      <p className="text-center text-gray-600">Loading Theses...</p>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        All Theses
      </h1>

      <ThesisFilters onFilter={handleFilterChange} />
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
              </tr>
            </thead>
            <tbody>
              {theses.map((thesis) => (
                <tr key={thesis.id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">
                    {thesis.advisor
                      ? `${thesis.advisor.firstname} ${thesis.advisor.lastname}`
                      : "Non défini"}
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
