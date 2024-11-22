import React, { useState, useEffect } from "react";
import api from "../services/api";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface EntityDetailsField {
  label: string;
  value: string;
  type?: "text" | "boolean" | "select";
  options?: string[];
  section?: string;
}

interface EntityDetailsModalProps {
  entityId: string;
  entityName: string;
  apiEndpoints: {
    entity: string;
    additional?: string;
  };
  fields: EntityDetailsField[];
  onClose: () => void;
  onEntityUpdated: () => Promise<void>;
  onDirectorUpdate?: (data: Record<string, any>) => Promise<void>;
  customActions?: () => JSX.Element;
}

const EntityDetailsModal: React.FC<EntityDetailsModalProps> = ({
  entityId,
  entityName,
  apiEndpoints,
  fields,
  onClose,
  onEntityUpdated,
  onDirectorUpdate,
  customActions,
}) => {
  const token = useSelector((state: RootState) => state.auth.token);
  const [entityData, setEntityData] = useState<Record<string, any> | null>(
    null
  );
  const [editableData, setEditableData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const fetchEntityDetails = async () => {
    setLoading(true);
    setError("");
    try {
      const entityResponse = await api.get(`${apiEndpoints.entity}/${entityId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      let additionalData = {};
      if (apiEndpoints.additional) {
        const additionalResponse = await api.get(
          `${apiEndpoints.additional}/${entityId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Ajouter le Bearer Token ici aussi
            },
          }
        );
        additionalData = additionalResponse.data.data;
      }

      const fetchedData = {
        ...entityResponse.data.data,
        ...additionalData,
      };

      setEntityData(fetchedData);
      setEditableData(fetchedData);
    } catch (err) {
      console.error("Error fetching entity data:", err);
      setError(`Failed to load ${entityName} details.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntityDetails();
  }, [entityId, apiEndpoints.entity]);

  const handleInputChange = (field: string, value: any) => {
    setEditableData({
      ...editableData,
      [field]: value,
    });
  };

  const handleSave = async () => {
    try {
      await api.put(`${apiEndpoints.entity}/${entityId}`, editableData,{
        headers: {
          Authorization: `Bearer ${token}`, // Ajouter le Bearer Token pour la mise à jour
        },
      });
      setEntityData(editableData);
      setIsEditing(false);
      onEntityUpdated();
      alert(`${entityName} updated successfully.`);

      if (onDirectorUpdate) {
        const directorData = {
          id: editableData.id,
          firstname: editableData.firstname,
          lastname: editableData.lastname,
          email: editableData.email,
          phoneNumber: editableData.phoneNumber,
          hdr: editableData.hdr,
        };
        await onDirectorUpdate(directorData);
      }
    } catch (err) {
      console.error("Error updating entity:", err);
      alert(`Failed to update ${entityName}. Please try again later.`);
    }
  };

  const handleDeleteClick = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this ${entityName}?`
    );
    if (confirmDelete) {
      try {
        await api.delete(`${apiEndpoints.entity}/${entityId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Ajouter le Bearer Token pour la suppression
          },
        });
        onEntityUpdated();
        onClose();
        alert(`${entityName} deleted successfully.`);
      } catch (err) {
        console.error("Error deleting entity:", err);
        alert(`Failed to delete ${entityName}. Please try again later.`);
      }
    }
  };

  const getNestedValue = (data: Record<string, any>, path: string): any => {
    return path.split(".").reduce((acc, key) => acc?.[key], data) || "N/A";
  };

  const groupedFields = fields.reduce((acc, field) => {
    const section = field.section || "General Information";
    if (!acc[section]) {
      acc[section] = [];
    }
    acc[section].push(field);
    return acc;
  }, {} as Record<string, EntityDetailsField[]>);

  if (loading) {
    return <div className="text-center text-blue-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  if (!entityData) {
    return <div>No data available for {entityName}.</div>;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="relative bg-white rounded-lg shadow-2xl overflow-hidden max-w-3xl w-full max-h-[90vh] overflow-y-auto transform transition-transform duration-500">
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-4 px-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">{entityName} Details</h1>
          <button
            onClick={onClose}
            className="text-white text-3xl hover:text-gray-200 focus:outline-none transition duration-300"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        <div className="p-6">
          {error && <p className="text-center text-red-500">{error}</p>}

          <form>
            {Object.entries(groupedFields).map(([section, sectionFields]) => (
              <div key={section} className="mb-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                  {section}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {sectionFields.map((field, index) => (
                    <div key={index} className="relative group">
                      <label className="block text-gray-600 mb-2 font-semibold">
                        {field.label}:
                      </label>

                      {isEditing ? (
                        field.type === "select" ? (
                          <select
                            value={editableData[field.value]}
                            onChange={(e) =>
                              handleInputChange(field.value, e.target.value)
                            }
                            className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-300"
                          >
                            {field.options?.map((option, i) => (
                              <option key={i} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type={
                              field.type === "boolean" ? "checkbox" : "text"
                            }
                            value={editableData[field.value]}
                            onChange={(e) =>
                              handleInputChange(
                                field.value,
                                field.type === "boolean"
                                  ? e.target.checked
                                  : e.target.value
                              )
                            }
                            className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-300"
                          />
                        )
                      ) : (
                        <span className="block text-gray-700">
                          {field.type === "boolean"
                            ? getNestedValue(entityData, field.value) === true
                              ? "Yes"
                              : "No"
                            : getNestedValue(entityData, field.value)}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex justify-end mt-6 space-x-4">
              {customActions ? (
                customActions()
              ) : isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={handleSave}
                    className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition duration-300"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-300"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={handleDeleteClick}
                    className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EntityDetailsModal;
