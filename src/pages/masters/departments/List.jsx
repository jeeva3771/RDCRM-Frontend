import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DepartmentsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [viewModalData, setViewModalData] = useState(null);
  const [deleteModalData, setDeleteModalData] = useState(null);

  // Sample data for departments
  const departmentsData = [
    {
      id: 1,
      name: "DTP",
      code: "RD001",
      status: "Active",
      process: "DTP, UV Printing, Screen Printing, Laser Cutting",
      createdAt: "2024-01-12 09:30 AM",
      createdBy: "Arun Prakash",
      updatedAt: "2024-12-10 02:15 PM",
      updatedBy: "Lavanya S",
    },
    {
      id: 2,
      name: "CNC",
      code: "RD002",
      status: "Active",
      process: "CNC, MachiningAssembly, Quality, Control, Packaging",
      createdAt: "2024-02-05 10:00 AM",
      createdBy: "Lavanya S",
      updatedAt: "2024-12-09 01:00 PM",
      updatedBy: "Karthik R",
    },
    {
      id: 3,
      name: "UV Printing",
      code: "RD003",
      status: "Inactive",
      process: "Welding, Painting, Polishing, Drilling",
      createdAt: "2024-03-10 11:45 AM",
      createdBy: "Karthik R",
      updatedAt: "2024-12-07 11:30 AM",
      updatedBy: "Dinesh Kumar",
    },
    {
      id: 4,
      name: "Screen Printing",
      code: "RD004",
      status: "Active",
      process: "CNC, MachiningAssembly, Quality, Control, Packaging",
      createdAt: "2024-04-01 08:20 AM",
      createdBy: "Sowmya K",
      updatedAt: "2024-12-06 04:45 PM",
      updatedBy: "Sowmya K",
    },
    {
      id: 5,
      name: "Quality Control & Assurance",
      code: "RD005",
      status: "Active",
      process: "CNC, MachiningAssembly, Quality, Control, Packaging",
      createdAt: "2024-05-18 09:30 AM",
      createdBy: "Rajiv Menon",
      updatedAt: "2024-12-05 03:20 PM",
      updatedBy: "Rajiv Menon",
    },
    {
      id: 6,
      name: "Order Fulfilment & Dispatch",
      code: "RD006",
      status: "Inactive",
      process: "CNC, MachiningAssembly, Quality, Control, Packaging",
      createdAt: "2024-06-22 01:00 PM",
      createdBy: "Bharath S",
      updatedAt: "2024-12-03 12:45 PM",
      updatedBy: "Lavanya S",
    },
    {
      id: 7,
      name: "Client Design Approvals",
      code: "RD007",
      status: "Active",
      process: "CNC, MachiningAssembly, Quality, Control, Packaging",
      createdAt: "2024-07-08 10:45 AM",
      createdBy: "Karthik R",
      updatedAt: "2024-12-01 10:30 AM",
      updatedBy: "Sowmya K",
    },
    {
      id: 8,
      name: "Packaging & Logistics",
      code: "RD008",
      status: "Active",
      process: "CNC, MachiningAssembly, Quality, Control, Packaging",
      createdAt: "2024-08-14 03:15 PM",
      createdBy: "Arun Prakash",
      updatedAt: "2024-12-02 05:15 PM",
      updatedBy: "Dinesh Kumar",
    },
    {
      id: 9,
      name: "Client Support & Order Coordination",
      code: "RD009",
      status: "Active",
      process: "CNC, MachiningAssembly, Quality, Control, Packaging",
      createdAt: "2024-09-12 11:00 AM",
      createdBy: "Megha Jain",
      updatedAt: "2024-12-11 03:10 PM",
      updatedBy: "Megha Jain",
    },
    {
      id: 10,
      name: "Digital Artwork & Proofing",
      code: "RD010",
      process: "CNC, MachiningAssembly, Quality, Control, Packaging",
      status: "Active",
      createdAt: "2024-10-05 02:30 PM",
      createdBy: "Sakthi Vel",
      updatedAt: "2024-12-12 11:40 AM",
      updatedBy: "Anjali Devi",
    },
    {
      id: 11,
      name: "Procurement & Vendor Management",
      code: "RD011",
      status: "Inactive",
      process: "CNC, MachiningAssembly, Quality, Control, Packaging",
      createdAt: "2024-11-01 10:15 AM",
      createdBy: "Mohan R",
      updatedAt: "2024-12-04 09:00 AM",
      updatedBy: "Dinesh Kumar",
    },
    {
      id: 12,
      name: "Event Branding & Custom Orders",
      code: "RD012",
      status: "Active",
      process: "CNC, MachiningAssembly, Quality, Control, Packaging",
      createdAt: "2024-12-01 04:00 PM",
      createdBy: "Divya Ramesh",
      updatedAt: "2024-12-15 01:00 PM",
      updatedBy: "Sathish N",
    },
  ];

  // Sorting function
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Sort data
  const sortedData = React.useMemo(() => {
    let sortableData = [...departmentsData];
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [sortConfig]);

  // Filter data based on search term
  const filteredData = sortedData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.process.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEntriesChange = (e) => {
    setEntriesPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const handleView = (item) => {
    setViewModalData(item);
  };

  const handleDelete = (item) => {
    setDeleteModalData(item);
  };

  const confirmDelete = () => {
    console.log("Deleted item:", deleteModalData.id);
    // Here you would implement the actual delete logic
    setDeleteModalData(null);
  };

  const StatusBadge = ({ status }) => {
    const isActive = status === "Active";
    return (
      <span
        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
        }`}
      >
        {status}
      </span>
    );
  };

  const SortableHeader = ({ label, sortKey }) => {
    const getSortIcon = () => {
      if (sortConfig.key !== sortKey) {
        return "";
      }
      return sortConfig.direction === "asc" ? "↑" : "↓";
    };

    return (
      <th
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 select-none"
        onClick={() => handleSort(sortKey)}
      >
        <div className="flex items-center gap-1">
          {label}
          <span className="text-gray-400">{getSortIcon()}</span>
        </div>
      </th>
    );
  };

  const ActionButtons = ({ item }) => (
    <div className="flex space-x-2">
      <button
        className="p-1.5 bg-blue-100 rounded text-blue-600 hover:bg-blue-200 transition-colors"
        title="View"
        onClick={() => handleView(item)}
      >
        👁️
      </button>
      <button
        className="p-1.5 bg-green-100 rounded text-green-600 hover:bg-green-200 transition-colors"
        title="Edit"
        onClick={() => navigate("/departments/1")}
      >
        ✏️
      </button>
      <button
        className="p-1.5 bg-red-100 rounded text-red-600 hover:bg-red-200 transition-colors"
        title="Delete"
        onClick={() => handleDelete(item)}
      >
        🗑️
      </button>
    </div>
  );

  const ViewModal = () => {
    if (!viewModalData) return null;

    const DetailRow = ({ label, value, isStatus = false }) => (
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
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gray-50">
            <h2 className="text-xl font-semibold text-blue-600">
              Department Details
            </h2>

          </div>


          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            <div className="space-y-0">
              <DetailRow label="Department Name" value={viewModalData.name} />
              <DetailRow label="Code" value={viewModalData.code} />
              <DetailRow
                label="Process Under This Department"
                value={viewModalData.process}
              />
              <DetailRow
                label="Status"
                value={viewModalData.status}
                isStatus={true}
              />
              <DetailRow label="CreatedAt" value={viewModalData.createdAt} />
              <DetailRow label="CreatedBy" value={viewModalData.createdBy} />
              <DetailRow label="UpdatedAt" value={viewModalData.updatedAt} />
              <DetailRow label="UpdatedBy" value={viewModalData.updatedBy} />
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end">
            <button
              onClick={() => setViewModalData(null)}
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
                <span className="text-red-600 text-xl">⚠️</span>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Confirm Delete
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Are you sure you want to delete the department "
                {deleteModalData.name}"? This action cannot be undone.
              </p>
            </div>

            <div className="flex justify-center space-x-3">
              <button
                onClick={() => setDeleteModalData(null)}
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
    const buttons = [];
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
          className={`px-3 py-1 border-t border-b border-gray-300 text-sm hover:bg-gray-100 ${
            currentPage === i
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "text-gray-700"
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
        {/* Header Section */}
      
        {/* Controls Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          {/* Search Bar */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search departments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-400">🔍</span>
            </div>
          </div>

          {/* Add Button */}
          <button
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            onClick={() => navigate("/departments/add")}
          >
            <span className="mr-2">+</span>
            <span>Add</span>
          </button>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    S.No
                  </th>
                  <SortableHeader label="Department Name" sortKey="name" />
                  <SortableHeader label="Code" sortKey="code" />
                  <SortableHeader
                    label="Process Under This Department"
                    sortKey="process"
                  />
                  <SortableHeader label="Status" sortKey="status" />
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentData.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`hover:bg-gray-50 ${
                      index % 2 === 1 ? "bg-gray-50" : ""
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {startIndex + index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.code}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
                      <div className="truncate" title={item.process}>
                        {item.process}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <ActionButtons item={item} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
        
          </div>

          {/* Pagination Section */}
          <div className="px-6 py-4 flex flex-col sm:flex-row items-center justify-between border-t border-gray-200">
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
              Showing {startIndex + 1} to{" "}
              {Math.min(endIndex, filteredData.length)} of {filteredData.length}{" "}
              entries
            </div>

            <div className="flex items-center">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded-l-md text-sm text-gray-500 bg-gray-50 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              {renderPaginationButtons()}
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 rounded-r-md text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ViewModal />
      <DeleteModal />
    </div>
  );
};

export default DepartmentsList;
