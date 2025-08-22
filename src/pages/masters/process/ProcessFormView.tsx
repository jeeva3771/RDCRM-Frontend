import React from "react";
import "../../../App.css";

export interface ProcessFormData {
  processName: string;
  status: string;
  rawMaterial: string;
  processId?: string;
}

export interface ProcessControllerProps {
  formData: ProcessFormData;
  columnName: string;
  columns: string[];
  draggedIndex: number | null;
  error: string | null;
  loading: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleColumnNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  addColumn: () => void;
  removeColumn: (index: number) => void;
  handleReset: () => void;
  handleSubmit: () => void;
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragEnter: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  handleDragEnd: () => void;
}

const ProcessForm: React.FC<ProcessControllerProps> = ({
  formData,
  columnName,
  columns,
  draggedIndex,
  error,
  loading,
  handleInputChange,
  handleColumnNameChange,
  handleKeyPress,
  addColumn,
  removeColumn,
  handleReset,
  handleSubmit,
  handleDragStart,
  handleDragOver,
  handleDragEnter,
  handleDrop,
  handleDragEnd,
}) => {
  const isEditMode = formData.processId && formData.processId !== '0';

  return (
    <div className="font-sans min-h-screen">
      <div className="flex items-center justify-center p-4">
        <div className="w-full max-w-6xl bg-white rounded-xl shadow-sm border border-gray-200 mt-6">
          {/* Card Header */}
          <div className="border-b border-gray-100 p-6">
            <h1 className="text-2xl font-bold text-blue-600">
              {isEditMode ? 'Edit Process' : 'Create Process'}
            </h1>
          </div>

          {/* Form Content */}
          <div className="p-6">
            {/* Loading State */}
            {loading && (
              <div className="mb-6 p-4 bg-blue-100 border border-blue-400 text-blue-700 rounded-lg flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-500 mr-3"></div>
                {isEditMode ? 'Loading process data...' : 'Submitting process...'}
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            {/* Horizontal Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <label
                  htmlFor="processName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Process Name
                </label>
                <input
                  type="text"
                  id="processName"
                  name="processName"
                  value={formData.processName}
                  onChange={handleInputChange}
                  disabled={loading}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Enter process name"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="rawMaterial"
                  className="block text-sm font-medium text-gray-700"
                >
                  This process involves Raw Material in Production
                </label>
                <div className="relative">
                  <select
                    id="rawMaterial"
                    name="rawMaterial"
                    value={formData.rawMaterial}
                    onChange={handleInputChange}
                    disabled={loading}
                    className="appearance-none w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition bg-white pr-10 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="" disabled>
                      Select raw material status
                    </option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
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

            {/* Column List Input */}
            <div className="mb-8">
              <div className="mb-4">
                <label
                  htmlFor="columnName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Add Column Name
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    id="columnName"
                    value={columnName}
                    onChange={handleColumnNameChange}
                    onKeyPress={handleKeyPress}
                    disabled={loading}
                    className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="Enter column name"
                  />
                  <button
                    onClick={addColumn}
                    disabled={loading || !columnName.trim()}
                    className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition flex items-center disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    <span className="mr-2">+</span>
                    Add
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  {columns.map((column, index) => (
                    <div
                      key={index}
                      draggable={!loading}
                      onDragStart={(e) => handleDragStart(e, index)}
                      onDragOver={handleDragOver}
                      onDragEnter={handleDragEnter}
                      onDrop={(e) => handleDrop(e, index)}
                      onDragEnd={handleDragEnd}
                      className={`flex items-center px-3 py-2 bg-white border border-gray-200 rounded-lg cursor-move transition-all duration-200 hover:shadow-md ${
                        draggedIndex === index ? "opacity-50 scale-105" : ""
                      } ${loading ? "cursor-not-allowed opacity-60" : ""}`}
                    >
                      <span className="flex items-center justify-center w-5 h-5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full mr-2">
                        {index + 1}
                      </span>
                      <span className="text-gray-700 mr-2">{column}</span>
                      <button
                        onClick={() => removeColumn(index)}
                        disabled={loading}
                        className="text-red-500 hover:text-red-600 transition-colors disabled:text-gray-400 disabled:cursor-not-allowed"
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
            </div>

            {/* Action Buttons */}
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

export default ProcessForm;