import React, { useState } from "react";
import api from "../services/api";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface AddLaboratoryProps {
  onClose: () => void;
  onLaboratoryAdded: () => void;
}

const AddLaboratory: React.FC<AddLaboratoryProps> = ({ onClose, onLaboratoryAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    country: "",
    means: "",
    expertise: "",
    directorEmail: "",
    directorFirstname: "",
    directorLastname: "",
    directorPhoneNumber: "",
    directorHdr: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const token = useSelector((state: RootState) => state.auth.token);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value } = target;

    if (target.type === "checkbox") {
        const checked = (target as HTMLInputElement).checked;
      setFormData({
        ...formData,
        [name]: checked,
      });
      return;
    } else {
        setFormData({
            ...formData,
            [name]: value,
          });
    }
    
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
       await api.post("/laboratory", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccessMessage("Laboratory added successfully!");
      onLaboratoryAdded();
      setFormData({
        name: "",
        address: "",
        city: "",
        country: "",
        means: "",
        expertise: "",
        directorEmail: "",
        directorFirstname: "",
        directorLastname: "",
        directorPhoneNumber: "",
        directorHdr: false,
      });
      onClose();
    } catch (err) {
      console.error("Error adding laboratory:", err);
      setError("Error adding laboratory. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 p-8 relative">
    <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-3xl w-full mx-auto">
      {/* Close Button */}
      <button
        className="absolute top-4 right-4 text-3xl text-gray-600 hover:text-gray-800 focus:outline-none"
        onClick={onClose} // Fermer la modale
        aria-label="Close"
      >
        &times;
      </button>

      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        Add New Laboratory
      </h1>

      {/* Error and Success Message */}
      {error && <p className="text-center text-red-500">{error}</p>}
      {successMessage && (
        <p className="text-center text-green-500">{successMessage}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Laboratory Information Section */}
        <h2 className="text-xl font-semibold mb-4">Laboratory Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="mb-4">
            <label className="block text-gray-700">Laboratory Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Means</label>
            <select
              name="means"
              value={formData.means}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Means</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Expertise</label>
            <select
              name="expertise"
              value={formData.expertise}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Expertise</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        {/* Director Information Section */}
        <h2 className="text-xl font-semibold mb-4">
          Laboratory Director Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="mb-4">
            <label className="block text-gray-700">Director's Email</label>
            <input
              type="email"
              name="directorEmail"
              value={formData.directorEmail}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Director's First Name</label>
            <input
              type="text"
              name="directorFirstname"
              value={formData.directorFirstname}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Director's Last Name</label>
            <input
              type="text"
              name="directorLastname"
              value={formData.directorLastname}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">
              Director's Phone Number
            </label>
            <input
              type="text"
              name="directorPhoneNumber"
              value={formData.directorPhoneNumber}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">HDR (optional)</label>
            <input
              type="checkbox"
              name="directorHdr"
              checked={formData.directorHdr}
              onChange={handleChange}
              className="mr-2"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="w-auto px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Laboratory"}
          </button>
        </div>
      </form>
    </div>
  </div>
 
  );
};

export default AddLaboratory;
