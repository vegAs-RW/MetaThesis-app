import React, { useState, useEffect } from "react";
import api from "../services/api";

interface EntityDetailsField {
  label: string;
  value: keyof Record<string, any>;
  type?: "text" | "boolean";
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
}

const EntityDetailsModal: React.FC<EntityDetailsModalProps> = ({
  entityId,
  entityName,
  apiEndpoints,
  fields,
  onClose,
  onEntityUpdated,
  onDirectorUpdate,
}) => {
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
      const entityResponse = await api.get(
        `${apiEndpoints.entity}/${entityId}`
      );
      let additionalData = {};

      if (apiEndpoints.additional) {
        const additionalResponse = await api.get(
          `${apiEndpoints.additional}/${entityId}`
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
      await api.put(`${apiEndpoints.entity}/${entityId}`, editableData);
      setEntityData(editableData);
      setIsEditing(false);
      onEntityUpdated();
      alert(`${entityName} updated successfully.`);

      if (onDirectorUpdate) {
        const directorData = {
          id: editableData.id, // ID du directeur
          firstname: editableData.firstname,
          lastname: editableData.lastname,
          email: editableData.email,
          phoneNumber: editableData.phoneNumber,
          hdr: editableData.hdr,
        };
        await onDirectorUpdate(directorData); // Appel de la méthode parent
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
        await api.delete(`${apiEndpoints.entity}/${entityId}`);
        onEntityUpdated();
        onClose();
        alert(`${entityName} deleted successfully.`);
      } catch (err) {
        console.error("Error deleting entity:", err);
        alert(`Failed to delete ${entityName}. Please try again later.`);
      }
    }
  };

  if (loading) {
    return <div className="text-center text-blue-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  if (!entityData) {
    return <div>No data available for {entityName}.</div>;
  }

  console.log(editableData);
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full md:w-3/4 lg:w-2/3 max-h-[80vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-4xl text-gray-600 hover:text-gray-800 focus:outline-none"
          aria-label="Close"
        >
          &times;
        </button>

        <h1 className="text-3xl font-semibold text-blue-600 mb-6 text-center">
          {entityName} Details
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {fields.map((field, index) => (
            <div key={index} className="flex justify-between">
              <label className="font-semibold">{field.label}:</label>
              {isEditing ? (
                <input
                  type={field.type === "boolean" ? "checkbox" : "text"}
                  value={editableData[field.value]}
                  onChange={(e) =>
                    handleInputChange(
                      field.value as string,
                      field.type === "boolean"
                        ? e.target.checked
                        : e.target.value
                    )
                  }
                  className="border border-gray-300 px-2 py-1 rounded-md focus:outline-none"
                />
              ) : (
                <span>
                  {field.type === "boolean"
                    ? entityData[field.value] === true
                      ? "Yes"
                      : "No"
                    : field.value === "director"
                    ? `${entityData.firstname} ${entityData.lastname}`
                    : entityData[field.value] || "N/A"}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-8">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 focus:outline-none ml-4"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none"
            >
              Edit
            </button>
          )}

          <button
            onClick={handleDeleteClick}
            className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default EntityDetailsModal;
