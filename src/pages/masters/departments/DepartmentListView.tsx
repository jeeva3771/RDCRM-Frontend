import React from 'react';
import '../../../App.css';
import { DepartmentListControllerProps, DepartmentItem } from '../../../controller/DepartmentListController';

const DepartmentList: React.FC<DepartmentListControllerProps> = ({
  searchTerm,
  entriesPerPage,
  currentPage,
  sortConfig,
  viewModalData,
  deleteModalData,
  currentData,
  totalPages,
  filteredDataLength,
  startIndex,
  error,
  loading,
  handleSearchChange,
  handleEntriesChange,
  handleSort,
  handlePreviousPage,
  handleNextPage,
  handlePageClick,
  handleView,
  handleEdit,
  handleDelete,
  confirmDelete,
  closeViewModal,
  closeDeleteModal,
}) => {
  const StatusBadge = ({ status }: { status: string }) => {
    const isActive = status === 'Active';
    return (
      <span
        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          isActive ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'
        }`}
      >
        {status}
      </span>
    );
  };

  const SortableHeader = ({ label, sortKey }: { label: string; sortKey: string }) => {
    const getSortIcon = () => {
      if (sortConfig.key !== sortKey) {
        return (
          <svg 
            className="w-4 h-4 text-gray-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
        );
      }
      return sortConfig.direction === 'asc' ? (
        <svg 
          className="w-4 h-4 text-blue-600" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      ) : (
        <svg 
          className="w-4 h-4 text-blue-600" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      );
    };

    const isActive = sortConfig.key === sortKey;

    return (
      <th
        className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer transition-colors ${
          isActive 
            ? 'bg-blue-50 text-blue-700 hover:bg-blue-100' 
            : 'text-gray-600 hover:bg-gray-100'
        }`}
        onClick={() => handleSort(sortKey)}
      >
        <div className="flex items-center justify-between">
          <span>{label}</span>
          <div className="ml-2 flex-shrink-0">
            {getSortIcon()}
          </div>
        </div>
      </th>
    );
  };

  const ActionButtons = ({ item }: { item: DepartmentItem }) => (
    <div className="flex space-x-2">
      <button
        className="p-1.5 bg-blue-50 rounded text-blue-600 hover:bg-blue-100 transition-colors"
        title="View"
        onClick={() => handleView(item)}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      </button>
      <button
        className="p-1.5 bg-green-50 rounded text-green-600 hover:bg-green-100 transition-colors"
        title="Edit"
        onClick={() => handleEdit(item.id)}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </button>
      <button
        className="p-1.5 bg-red-50 rounded text-red-600 hover:bg-red-100 transition-colors"
        title="Delete"
        onClick={() => handleDelete(item)}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );

  const ViewModal = () => {
    if (!viewModalData && !loading) return null;

    const DetailRow = ({ label, value, isStatus = false }: { label: string; value: string; isStatus?: boolean }) => (
      <div className="flex py-2 border-gray-100 last:border-b-0">
        <div className="w-32 flex-shrink-0 text-sm font-medium text-gray-700 mt-[3px]">
          {label}
        </div>
        <div className="w-4 flex-shrink-0 text-gray-600">:</div>
        <div className="flex-1 ml-4">
          {isStatus ? (
            <StatusBadge status={value} />
          ) : (
            <span className="text-sm text-gray-900">{value}</span>
          )}
        </div>
      </div>
    );

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden">
          <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gray-50">
            <h2 className="text-xl font-semibold text-blue-600">Department Details</h2>
            <button
              onClick={closeViewModal}
              className="text-gray-400 hover:text-gray-600 transition-colors text-2xl font-light w-8 h-8 flex items-center justify-center"
            >
              ×
            </button>
          </div>
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="space-y-0">
                <DetailRow label="Department Name" value={viewModalData!.departmentName} />
                <DetailRow label="Processes" value={viewModalData!.departmentProcess} />
                <DetailRow label="Status" value={viewModalData!.status} isStatus={true} />
                <DetailRow label="Created At" value={viewModalData!.createdAt} />
                <DetailRow label="Updated At" value={viewModalData!.updatedAt} />
              </div>
            )}
          </div>
          <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end">
            <button
              onClick={closeViewModal}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  const DeleteModal = () => {
    if (!deleteModalData) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Confirm Delete</h3>
              <p className="text-sm text-gray-500 mb-4">
                Are you sure you want to delete the department "{deleteModalData.departmentName}"? This action cannot be undone.
              </p>
            </div>
            <div className="flex justify-center space-x-3">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderPaginationButtons = () => {
    const buttons: React.ReactNode[] = [];
    const maxVisiblePages = 3;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`px-3 py-1 border-t border-b border-gray-300 text-sm hover:bg-gray-100 transition-colors ${
            currentPage === i ? 'bg-blue-600 text-white hover:bg-blue-700' : 'text-gray-700'
          }`}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div className="bg-gray-50 min-h-screen mt-[10vh]">
      <div className="container mx-auto px-4 py-6">
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search departments..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <button
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            onClick={() => handleEdit(0)}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add Department</span>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <SortableHeader label="S.No" sortKey="sno" />
                  <SortableHeader label="Department Name" sortKey="departmentName" />
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Processes
                  </th>
                  <SortableHeader label="Status" sortKey="status" />
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center">
                      <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                        <span className="ml-3 text-gray-500">Loading departments...</span>
                      </div>
                    </td>
                  </tr>
                ) : currentData.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                      No departments found
                    </td>
                  </tr>
                ) : (
                  currentData.map((item, index) => (
                    <tr
                      key={item.id}
                      className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? '' : 'bg-gray-25'}`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {startIndex + index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.departmentName}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
                        <div className="truncate" title={item.departmentProcess}>
                          {item.departmentProcess || 'No processes assigned'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={item.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <ActionButtons item={item} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {!loading && currentData.length > 0 && (
            <div className="px-6 py-4 flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 bg-white">
              <div className="flex items-center mb-4 sm:mb-0">
                <span className="text-sm text-gray-700 mr-2">Show</span>
                <select
                  value={entriesPerPage}
                  onChange={handleEntriesChange}
                  className="border border-gray-300 rounded-md text-sm py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
                <span className="text-sm text-gray-700 ml-2">entries</span>
              </div>
              <div className="text-sm text-gray-700 mb-4 sm:mb-0">
                Showing {startIndex + 1} to {Math.min(startIndex + entriesPerPage, filteredDataLength)} of {filteredDataLength} entries
              </div>
              <div className="flex items-center">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-gray-300 rounded-l-md text-sm text-gray-500 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                {renderPaginationButtons()}
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border border-gray-300 rounded-r-md text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <ViewModal />
      <DeleteModal />
    </div>
  );
};

export default DepartmentList;