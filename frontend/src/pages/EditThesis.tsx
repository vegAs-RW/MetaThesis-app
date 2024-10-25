import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  userId: string;
}

const EditThesis: React.FC = () => {
  const { thesisId } = useParams<{ thesisId: string }>();
  const [thesis, setThesis] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);
  const token = useSelector((state: RootState) => state.auth.token);
  if (!token) {
    return null;
  }
  const decodedToken: TokenPayload = jwtDecode(token);
  const advisorId = decodedToken.userId;
  const [candidateData, setCandidateData] = useState({
    lastname: "",
    firstname: "",
    birthdate: "",
    lastDegree: "",
    dateLastDegree: "",
    doctoralSchool: "",
    residentPermit: "",
    advisor: advisorId,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchThesis = async () => {
      try {
        const response = await api.get(`/thesis/${thesisId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Thèse récupérée :", response.data.data);
        setThesis(response.data.data);
        setEditMode(response.data.data.topicValidation); // Active l'édition si topicValidation est true
      } catch (error) {
        console.error("Erreur lors de la récupération de la thèse :", error);
      }
    };
    fetchThesis();
  }, [thesisId, token]);

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editMode) return;

    try {
      await api.put(`/thesis/${thesisId}`, thesis, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/dashboard/advisor"); // Redirige vers le tableau de bord après la mise à jour
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la thèse :", error);
    }
  };

  const handleAddCandidate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Données du candidat :", candidateData);
    try {
      // Créer le candidat
      const candidateResponse = await api.post("/candidate", candidateData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(
        "Response from candidate creation:",
        candidateResponse.data.data.candidate
      );
      const candidateId = candidateResponse.data.data.candidate;

      // Assigner le candidat à la thèse
      await api.put(
        `/thesis/${thesisId}/assign-candidate`,
        { candidateId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      navigate("/dashboard/advisor");
    } catch (error) {
      console.error("Erreur lors de l'ajout du candidat :", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-500 p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        Détail de la Thèse
      </h1>
      {thesis ? (
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
          <h2 className="text-xl font-semibold mb-4">{thesis.topic}</h2>
          <p>
            <strong>Année:</strong> {thesis.year}
          </p>
          <p>
            <strong>Domaine:</strong> {thesis.domain}
          </p>
          <p>
            <strong>Intérêt Scientifique:</strong> {thesis.scientistInterest}
          </p>
          <p>
            <strong>Mots clés:</strong> {thesis.keyword}
          </p>
          <p>
            <strong>Validation du Sujet:</strong>{" "}
            {thesis.topicValidation ? "Oui" : "Non"}
          </p>

          {editMode ? (
            <form onSubmit={handleEditSubmit} className="mt-6">
              <div className="mb-4">
                <label className="block mb-2">Sujet :</label>
                <input
                  type="text"
                  value={thesis.topic}
                  onChange={(e) =>
                    setThesis({ ...thesis, topic: e.target.value })
                  }
                  className="border rounded w-full py-2 px-3"
                  required
                />
              </div>
              {/* Ajoutez d'autres champs d'édition si nécessaire */}
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded"
              >
                Mettre à jour la thèse
              </button>
            </form>
          ) : (
            <p className="text-red-500 mt-4">
              Édition désactivée. La validation du sujet est requise.
            </p>
          )}

          {/* Formulaire d'ajout de candidat */}
          {editMode && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">
                Ajouter un Candidat
              </h3>
              <form onSubmit={handleAddCandidate}>
                <div className="mb-4">
                  <label className="block mb-2">Nom :</label>
                  <input
                    type="text"
                    value={candidateData.lastname}
                    onChange={(e) =>
                      setCandidateData({
                        ...candidateData,
                        lastname: e.target.value,
                      })
                    }
                    className="border rounded w-full py-2 px-3"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Prénom :</label>
                  <input
                    type="text"
                    value={candidateData.firstname}
                    onChange={(e) =>
                      setCandidateData({
                        ...candidateData,
                        firstname: e.target.value,
                      })
                    }
                    className="border rounded w-full py-2 px-3"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Date de Naissance :</label>
                  <input
                    type="date"
                    value={candidateData.birthdate}
                    onChange={(e) =>
                      setCandidateData({
                        ...candidateData,
                        birthdate: e.target.value,
                      })
                    }
                    className="border rounded w-full py-2 px-3"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Dernier Diplôme :</label>
                  <input
                    type="text"
                    value={candidateData.lastDegree}
                    onChange={(e) =>
                      setCandidateData({
                        ...candidateData,
                        lastDegree: e.target.value,
                      })
                    }
                    className="border rounded w-full py-2 px-3"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">
                    Date du Dernier Diplôme :
                  </label>
                  <input
                    type="date"
                    value={candidateData.dateLastDegree}
                    onChange={(e) =>
                      setCandidateData({
                        ...candidateData,
                        dateLastDegree: e.target.value,
                      })
                    }
                    className="border rounded w-full py-2 px-3"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">École Doctorale :</label>
                  <input
                    type="text"
                    value={candidateData.doctoralSchool}
                    onChange={(e) =>
                      setCandidateData({
                        ...candidateData,
                        doctoralSchool: e.target.value,
                      })
                    }
                    className="border rounded w-full py-2 px-3"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Permis de Séjour :</label>
                  <input
                    type="text"
                    value={candidateData.residentPermit}
                    onChange={(e) =>
                      setCandidateData({
                        ...candidateData,
                        residentPermit: e.target.value,
                      })
                    }
                    className="border rounded w-full py-2 px-3"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-green-600 text-white py-2 px-4 rounded"
                >
                  Ajouter le Candidat
                </button>
              </form>
            </div>
          )}
        </div>
      ) : (
        <p>Chargement des détails de la thèse...</p>
      )}
    </div>
  );
};

export default EditThesis;
