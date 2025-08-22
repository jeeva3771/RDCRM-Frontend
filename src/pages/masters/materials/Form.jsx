import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const MaterialForm = () => {
  const { materialId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    materialName: "",
    typeOfMaterial: "",
    price: "",
    cost: "",
    stock: "",
    unit: "",
    code: "",
    status: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setFormData({
      materialName: "",
      typeOfMaterial: "",
      price: "",
      cost: "",
      stock: "",
      unit: "",
      code: "",
      status: "",
    });
  };

  const handleSubmit = () => {
    navigate("/materials");
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 form-display">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <h1 className="text-2xl font-bold text-blue-600">{materialId ? 'Edit Material' : 'Create Material User'}</h1>
        </div>

        {/* Form Content */}
        <div className="p-6">
          {/* First Row - 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Material Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Material Name
              </label>
              <input
                type="text"
                name="materialName"
                value={formData.materialName}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition"
                placeholder="Enter material name"
              />
            </div>

            {/* Type of Material */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Type of Material
              </label>
              <div className="relative">
                <select
                  name="typeOfMaterial"
                  value={formData.typeOfMaterial}
                  onChange={handleInputChange}
                  className="appearance-none w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition bg-white pr-10"
                >
                  <option value="" disabled>
                    Select material type
                  </option>
                  <option value="Recipe Materials">Recipe Materials</option>
                  <option value="Consumables">Consumables</option>
                  <option value="Packing Materials">Packing Materials</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition"
                placeholder="Enter price"
              />
            </div>
          </div>

          {/* Second Row - 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Cost */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Cost
              </label>
              <input
                type="number"
                name="cost"
                value={formData.cost}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition"
                placeholder="Enter cost"
              />
            </div>

            {/* Stock */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Stock
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition"
                placeholder="Enter stock quantity"
              />
            </div>

            {/* Unit */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Unit
              </label>
              <input
                type="text"
                name="unit"
                value={formData.unit}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition"
                placeholder="Enter unit (e.g., Kg, Liter, Piece)"
              />
            </div>
          </div>

          {/* Third Row - 2 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Code */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Code
              </label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition"
                placeholder="Enter material code"
              />
            </div>

            {/* Status */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <div className="relative">
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="appearance-none w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition bg-white pr-10"
                >
                  <option value="" disabled>
                    Select status
                  </option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
            {materialId ? (
              <>
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2.5 primary-bgclr hover:bg-blue-600 text-white font-medium rounded-lg transition flex items-center"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                  Update
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleReset}
                  className="px-5 py-2.5 bg-white border border-red-500 text-red-500 hover:bg-red-50 font-medium rounded-lg transition flex items-center"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Reset
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2.5 primary-bgclr hover:bg-blue-600 text-white font-medium rounded-lg transition flex items-center"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                  Submit
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialForm;
