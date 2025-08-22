import React, { useState } from "react";
import { DepartmentControllerProps, DepartmentFormData } from '../../../controller/DepartmentController';
import "../../../App.css";

const DepartmentForm: React.FC<DepartmentControllerProps> = ({
  formData,
  processName,
  processes,
  availableProcesses,
  draggedIndex,
  error,
  loading,
  handleInputChange,
  handleProcessNameChange,
  handleKeyPress,
  addProcess,
  addProcessDirectly,
  removeProcess,
  handleReset,
  handleSubmit,
  handleDragStart,
  handleDragOver,
  handleDragEnter,
  handleDrop,
  handleDragEnd,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isEditMode = formData.departmentId && formData.departmentId !== '0';

  // Get available processes that haven't been added yet
  const getAvailableProcesses = () => {
    return availableProcesses.filter(process => !processes.some(p => p.id === process.id));
  };

  // Handle process selection from dropdown - OPTIMIZED VERSION
  const handleProcessSelect = (process: { id: number; process_name: string }) => {
    if (!processes.some(p => p.id === process.id)) {
      // Use the new direct method if available, otherwise fallback to old method
      if (addProcessDirectly) {
        addProcessDirectly(process);
      } else {
        // Fallback method
        const syntheticEvent = {
          target: { value: process.process_name },
        } as React.ChangeEvent<HTMLInputElement>;
        handleProcessNameChange(syntheticEvent);
        setTimeout(() => {
          addProcess();
        }, 0);
      }
    }
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  const handleDropdownBlur = (e: React.FocusEvent) => {
    // Reduce timeout to make it more responsive
    setTimeout(() => {
      setIsDropdownOpen(false);
    }, 100);
  };

  return (
    <div className="font-sans min-h-screen">
      <div className="flex items-center justify-center p-4">
        <div className="w-full max-w-6xl bg-white rounded-xl shadow-sm border border-gray-200 mt-6">
          <div className="border-b border-gray-100 p-6">
            <h1 className="text-2xl font-bold text-blue-600">
              {isEditMode ? 'Edit Department' : 'Create Department'}
            </h1>
          </div>

          <div className="p-6">
            {loading && (
              <div className="mb-6 p-4 bg-blue-100 border border-blue-400 text-blue-700 rounded-lg flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-500 mr-3"></div>
                {isEditMode ? 'Loading department data...' : 'Submitting department...'}
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <label
                  htmlFor="departmentName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Department Name
                </label>
                <input
                  type="text"
                  id="departmentName"
                  name="departmentName"
                  value={formData.departmentName}
                  onChange={handleInputChange}
                  disabled={loading}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Enter department name"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700"
                >
                  Status
                </label>
                <div className="relative">
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    disabled={loading}
                    className="appearance-none w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition bg-white pr-10 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="" disabled>
                      Select status
                    </option>
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
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

            {/* Process Management Section */}
            <div className="mb-8">
              

              {/* Process Selection Dropdown */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add Process to Department
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    onBlur={handleDropdownBlur}
                    disabled={loading}
                    className="w-full px-4 py-3 rounded-lg border-2 border-blue-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition bg-white text-left flex justify-between items-center hover:border-blue-400 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:hover:border-blue-300"
                  >
                    <span className="text-gray-600">Select a process to add</span>
                    <svg
                      className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ml-2 ${
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
                  {isDropdownOpen && !loading && (
                    <div className="absolute z-10 w-full mt-1 bg-white border-2 border-blue-200 rounded-lg shadow-sm max-h-60 overflow-y-auto">
                      {getAvailableProcesses().length > 0 ? (
                        getAvailableProcesses().map((process) => (
                          <div
                            key={process.id}
                            onClick={() => handleProcessSelect(process)}
                            className="px-4 py-3 text-gray-700 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                          >
                            {process.process_name}
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-3 text-gray-500 text-center">
                          No more processes available
                        </div>
                      )}
                    </div>
                  )}
                </div>

                
              </div>
              {/* Selected Processes Display - MOVED ABOVE DROPDOWN */}
              {processes.length > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Selected Processes:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {processes.map((process) => (
                      <div
                        key={process.id}
                        className="inline-flex items-center px-3 py-2 rounded-full bg-blue-100 text-blue-800 border border-blue-200 text-sm"
                      >
                        <span className="flex-1">{process.process_name}</span>
                        <button
                          type="button"
                          onClick={() => removeProcess(process.id)}
                          disabled={loading}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Manual Process Addition - Hidden input for controller compatibility */}
              <input
                type="text"
                id="processName"
                name="processName"
                value={processName}
                onChange={handleProcessNameChange}
                onKeyPress={handleKeyPress}
                style={{ display: 'none' }}
              />
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
              {isEditMode ? (
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition flex items-center disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                  ) : (
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
                  )}
                  {loading ? 'Updating...' : 'Update'}
                </button>
              ) : (
                <>
                  <button
                    onClick={handleReset}
                    disabled={loading}
                    className="px-5 py-2.5 bg-white border border-red-500 text-red-500 hover:bg-red-50 font-medium rounded-lg transition flex items-center disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-300 disabled:cursor-not-allowed"
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
                    disabled={loading}
                    className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition flex items-center disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                    ) : (
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
                    )}
                    {loading ? 'Submitting...' : 'Submit'}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentForm;