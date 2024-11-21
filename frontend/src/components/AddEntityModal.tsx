import React, { useState } from "react";

interface AddEntityModalProps {
  onClose: () => void;
  onSubmit: (formData: Record<string, any>) => Promise<void>;
  fields: {
    name: string;
    label: string;
    type: string;
    section?: string;
    options?: { value: string; label: string }[];
  }[];
  entityName: string;
}

const AddEntityModal: React.FC<AddEntityModalProps> = ({
  onClose,
  onSubmit,
  fields,
  entityName,
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value } = target;

    if (target.type === "checkbox") {
      setFormData({
        ...formData,
        [name]: (target as HTMLInputElement).checked,
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      await onSubmit(formData);
      setSuccessMessage(`${entityName} added successfully!`);
      setFormData({});
      onClose();
    } catch (err) {
      console.error(`Error adding ${entityName}:`, err);
      setError(`Error adding ${entityName}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const groupedFields = fields.reduce((acc, field) => {
    const section = field.section || "General Information";
    if (!acc[section]) {
      acc[section] = [];
    }
    acc[section].push(field);
    return acc;
  }, {} as Record<string, typeof fields>);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-4 right-4 text-3xl text-gray-600 hover:text-gray-800 focus:outline-none"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>

        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Add New {entityName}
        </h1>

        {error && <p className="text-center text-red-500">{error}</p>}
        {successMessage && (
          <p className="text-center text-green-500">{successMessage}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {Object.entries(groupedFields).map(([section, sectionFields]) => (
            <div key={section}>
              <h2 className="text-xl font-semibold mb-4">{section}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sectionFields.map((field) => (
                  <div key={field.name} className="mb-4">
                    <label className="block text-gray-700">{field.label}</label>
                    {field.type === "select" ? (
                      <select
                        name={field.name}
                        value={formData[field.name] || ""}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                      >
                        <option value="">Select {field.label}</option>
                        {field.options?.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name] || ""}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required={field.type !== "checkbox"}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="w-auto px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? `Adding ${entityName}...` : `Add ${entityName}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEntityModal;
