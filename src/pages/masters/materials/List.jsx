import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const MaterialsList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [viewModalData, setViewModalData] = useState(null);
  const [deleteModalData, setDeleteModalData] = useState(null);

  // Materials data
  const materialsData = [
    {
      id: 1,
      materialName: 'Steel Rod',
      type: 'Recipe Material',
      price: '₹250.00',
      cost: '₹200.00',
      stock: '150',
      unit: 'Kg',
      status: 'Active',
      code: 'STL001',
      createdAt: '2024-01-15 09:30 AM',
      createdBy: 'John Doe',
      updatedAt: '2024-12-20 04:25 PM',
      updatedBy: 'Dinesh',
    },
    {
      id: 2,
      materialName: 'Cement Bag',
      type: 'Recipe Material',
      price: '₹450.00',
      cost: '₹400.00',
      stock: '75',
      unit: 'Bag',
      status: 'Inactive',
      code: 'CMT002',
      createdAt: '2024-02-10 09:30 AM',
      createdBy: 'Jane Smith',
      updatedAt: '2024-12-18 01:30 AM',
      updatedBy: 'Mike',
    },
    {
      id: 3,
      materialName: 'Aluminum Sheet',
      price: '₹350.00',
      type: 'Consumables',
      cost: '₹300.00',
      stock: '200',
      unit: 'Sheet',
      status: 'Active',
      code: 'ALM003',
      createdAt: '2024-03-05 02:30 PM',
      createdBy: 'Mike Johnson',
      updatedAt: '2024-12-19 09:30 AM',
      updatedBy: 'Siva',
    },
    {
      id: 4,
      materialName: 'Copper Wire',
      price: '₹800.00',
      type: 'Packing Materials',
      cost: '₹750.00',
      stock: '50',
      unit: 'Meter',
      status: 'Inactive',
      code: 'CPR004',
      createdAt: '2024-04-12 01:30 AM',
      createdBy: 'Sarah Wilson',
      updatedAt: '2024-12-17 03:30 AM',
      updatedBy: 'Siva',
    },
    {
      id: 5,
      type: 'Packing Materials',
      materialName: 'Wooden Plank',
      price: '₹180.00',
      cost: '₹150.00',
      stock: '300',
      unit: 'Piece',
      status: 'Active',
      code: 'WOD005',
      createdAt: '2024-05-18 05:10 AM',
      createdBy: 'David Chen',
      updatedAt: '2024-12-21 03:15 PM',
      updatedBy: 'Saran',
    },
    {
      id: 6,
      materialName: 'Glass Panel',
      type: 'Packing Materials',
      price: '₹500.00',
      cost: '₹450.00',
      stock: '80',
      unit: 'Panel',
      code: 'GLS006',
      status: 'Active',
      createdAt: '2024-06-22 03:15 PM',
      createdBy: 'Lisa Anderson',
      updatedAt: '2024-12-20 04:15 PM',
      updatedBy: 'Saran',
    },
    {
      id: 7,
      materialName: 'Plastic Pipe',
      type: 'Consumables',
      price: '₹120.00',
      cost: '₹100.00',
      stock: '500',
      unit: 'Meter',
      code: 'PLS007',
      status: 'Inactive',
      createdAt: '2024-07-08 04:15 PM',
      createdBy: 'Robert Taylor',
      updatedAt: '2024-12-16 06:15 PM',
      updatedBy: 'Saran',
    },
    {
      id: 8,
      materialName: 'Iron Nail',
      price: '₹80.00',
      cost: '₹60.00',
      stock: '1000',
      type: 'Recipe Material',
      unit: 'Kg',
      code: 'IRN008',
      status: 'Active',
      createdAt: '2024-08-14 04:15 PM',
      createdBy: 'Emily Davis',
      updatedAt: '2024-12-22 08:45 AM',
      updatedBy: 'Saran',
    },
    {
      id: 9,
      materialName: 'Sand',
      price: '₹50.00',
      cost: '₹40.00',
      stock: '2000',
      unit: 'Kg',
      code: 'SND009',
      type: 'Recipe Material',
      status: 'Active',
      createdAt: '2024-09-03 04:15 PM',
      createdBy: 'Tom Brown',
      updatedAt: '2024-12-19 04:35 AM',
      updatedBy: 'Saran',
    },
    {
      id: 10,
      materialName: 'Paint Can',
      price: '₹600.00',
      cost: '₹550.00',
      stock: '120',
      type: 'Recipe Material',
      unit: 'Liter',
      code: 'PNT010',
      status: 'Inactive',
      createdAt: '2024-10-11 06:15 PM',
      createdBy: 'Anna White',
      updatedAt: '2024-12-15 07:15 AM',
      updatedBy: 'Saran',
    },
    {
      id: 11,
      materialName: 'Rubber Sheet',
      price: '₹280.00',
      cost: '₹250.00',
      stock: '90',
      type: 'Recipe Material',
      unit: 'Sheet',
      code: 'RBR011',
      status: 'Active',
      createdAt: '2024-11-07 09:15 PM',
      createdBy: 'Chris Green',
      updatedAt: '2024-12-21 04:15 PM',
      updatedBy: 'Saran',
    },
    {
      id: 12,
      materialName: 'Ceramic Tile',
      price: '₹400.00',
      cost: '₹350.00',
      stock: '250',
      type: 'Recipe Material',
      unit: 'Piece',
      code: 'CRM012',
      status: 'Inactive',
      createdAt: '2024-12-01 04:15 PM',
      createdBy: 'Mark Wilson',
      updatedAt: '2024-12-18 10:15 PM',
      updatedBy: 'Saran',
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
    let sortableData = [...materialsData];
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
      item.materialName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.unit.toLowerCase().includes(searchTerm.toLowerCase())
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
        onClick={() => navigate('/materials/1')}
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
        <div className="w-32 flex-shrink-0 text-sm font-medium text-gray-700">
          {label}
        </div>
        <div className="w-4 flex-shrink-0 text-gray-600">
          :
        </div>
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
            <h2 className="text-xl font-semibold text-blue-600">Material Details</h2>
            <button 
              onClick={() => setViewModalData(null)}
              className="text-gray-400 hover:text-gray-600 transition-colors text-2xl font-light w-8 h-8 flex items-center justify-center"
            >
              ×
            </button>
          </div>
          
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            <div className="space-y-0">
              <DetailRow label="Material Name" value={viewModalData.materialName} />
              <DetailRow label="Type" value={viewModalData.type} />
              <DetailRow label="Code" value={viewModalData.code} />
              <DetailRow label="Price" value={viewModalData.price} />
              <DetailRow label="Cost" value={viewModalData.cost} />
              <DetailRow label="Stock" value={`${viewModalData.stock} ${viewModalData.unit}`} />
              <DetailRow label="Unit" value={viewModalData.unit} />
              <DetailRow label="Status" value={viewModalData.status} isStatus={true} />
              <DetailRow label="CreatedAt" value={viewModalData.createdAt} />
              <DetailRow label="CreatedBy" value={viewModalData.createdBy} />
              <DetailRow label="UpdatedAt" value={viewModalData.updatedAt} />
              <DetailRow label="UpdatedBy" value={viewModalData.updatedBy} />
            </div>
          </div>
          
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
                Are you sure you want to delete the material "
                {deleteModalData.materialName}"? This action cannot be undone.
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
        {/* <header className="mb-14">
          <h1 className="text-2xl font-bold text-blue-600">Materials List</h1>
        </header> */}

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search materials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-400">🔍</span>
            </div>
          </div>

          <button
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            onClick={() => navigate('/materials/add')}
          >
            <span className="mr-2">+</span>
            <span>Add</span>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    S.No
                  </th>
                  <SortableHeader label="Material Name" sortKey="materialName" />
                  <SortableHeader label="Type of Material" sortKey="type" />
                  <SortableHeader label="Price" sortKey="price" />
                  <SortableHeader label="Cost" sortKey="cost" />
                  <SortableHeader label="Stock" sortKey="stock" />
                  <SortableHeader label="Unit" sortKey="unit" />
                  <SortableHeader label="Code" sortKey="code" />
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
                    className={`hover:bg-gray-50 ${index % 2 === 1 ? "bg-gray-50" : ""}`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {startIndex + index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.materialName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {item.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {item.cost}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.stock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.unit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.code}
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

      <ViewModal />
      <DeleteModal />
    </div>
  );
};

export default MaterialsList;