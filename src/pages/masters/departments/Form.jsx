import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../../App.css";

const DepartmentForm = () => {
  const navigate = useNavigate();
  const { departmentId } = useParams();
  const [formData, setFormData] = useState({
    departmentName: "",
    code: "",
    status: "",
  });

  const [selectedProcesses, setSelectedProcesses] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Available processes list
  const allProcesses = [
    "DTP",
    "CNC Machining",
    "Assembly",
    "Painting",
    "UV Printing",
    "Screen Printing",
    "Laser Cutting",
    "Welding",
    "Polishing",
    "Drilling",
    "Quality Control",
    "Packaging",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProcessSelect = (process) => {
    if (!selectedProcesses.includes(process)) {
      setSelectedProcesses((prev) => [...prev, process]);
    }
    setIsDropdownOpen(false);
  };

  const removeProcess = (processToRemove) => {
    setSelectedProcesses((prev) =>
      prev.filter((process) => process !== processToRemove)
    );
  };

  const getAvailableProcesses = () => {
    return allProcesses.filter(
      (process) => !selectedProcesses.includes(process)
    );
  };

  const handleReset = () => {
    setFormData({
      departmentName: "",
      code: "",
      status: "",
    });
    setSelectedProcesses([]);
    setIsDropdownOpen(false);
  };

  const handleSubmit = () => {
    // console.log("Form Data:", {
    //   ...formData,
    //   processes: selectedProcesses
    // });
    // alert("Department form submitted successfully!");
    navigate("/departments");
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 form-display">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <h1 className="text-2xl font-bold text-blue-600">{departmentId ? 'Edit Department' : 'Create Department User'}</h1>
        </div>

        {/* Form Content */}
        <div className="p-6">
          {/* Form Fields Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Department Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Department Name
              </label>
              <input
                type="text"
                name="departmentName"
                value={formData.departmentName}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition"
                placeholder="Enter department name"
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

          {/* Process Selection */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Process Under this Department
            </label>

            {/* Custom Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition bg-white text-left flex justify-between items-center"
              >
                <span className="text-gray-500">Select a process</span>
                <svg
                  className={`w-4 h-4 text-gray-400 transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
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
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {getAvailableProcesses().length > 0 ? (
                    getAvailableProcesses().map((process) => (
                      <button
                        key={process}
                        type="button"
                        onClick={() => handleProcessSelect(process)}
                        className="w-full px-4 py-2 text-left hover:bg-blue-50 hover:text-blue-600 transition-colors border-b border-gray-100 last:border-b-0"
                      >
                        {process}
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-gray-500 text-center">
                      No more processes available
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Selected Processes */}
            {selectedProcesses.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-500 mb-2">
                  Selected Processes:
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedProcesses.map((process) => (
                    <div
                      key={process}
                      className="flex items-center px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-sm"
                    >
                      <span>{process}</span>
                      <button
                        type="button"
                        onClick={() => removeProcess(process)}
                        className="ml-2 text-blue-500 hover:text-red-500 transition-colors"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
            {departmentId ? (
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

export default DepartmentForm;
