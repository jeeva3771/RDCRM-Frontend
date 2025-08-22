import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EnquiriesList = () => {
  const navigate = useNavigate();
  const [enquiries, setEnquiries] = useState([]);
  const [filteredEnquiries, setFilteredEnquiries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [currentUploadJobNo, setCurrentUploadJobNo] = useState(null);

  // Sample data with workflow states
  const sampleEnquiries = [
    {
      id: 3,
      jobNo: "14893",
      productName: "NAME PLATE",
      client: "Legal Associates",
      quantity: "10 units",
      deliveryDate: "22-07-2023",
      status: "design",
      workflow: "complete",
      designer: "Sarah Wilson",
      progress: "4/4 Complete",
      images: [
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/3586517a57-bb57ce5d44b8623af560.png",
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/c5cf70a549-53f7ceb180f96ee9279a.png",
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/1d00b7b072-df113b3d375f653384c9.png",
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/4c93600ae4-7f60b646ffc61aba60d7.png",
      ],
      hasImage: true,
      isAccepted: false,
      currentImageIndex: 0,
      uploadProgress: 4,
      maxImages: 4,
    },
    {
      id: 5,
      jobNo: "14895",
      productName: "METAL SIGNAGE",
      client: "City Hospital",
      quantity: "5 units",
      deliveryDate: "TBD",
      status: "billing",
      workflow: "client-approved",
      designer: null,
      progress: "Awaiting Admin Approval",
      images: [],
      hasImage: true,
      currentImageIndex: 0,
      uploadProgress: 0,
      maxImages: 7,
    },

    {
      id: 2,
      jobNo: "14892",
      productName: "CUSTOM TROPHY",
      client: "Global Tech",
      quantity: "25 units",
      deliveryDate: "30-07-2023",
      status: "design",
      workflow: "designing",
      designer: "John Doe",
      progress: "",
      images: [
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/3586517a57-bb57ce5d44b8623af560.png",
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/c5cf70a549-53f7ceb180f96ee9279a.png",
      ],
      hasImage: true,
      currentImageIndex: 0,
      uploadProgress: 2,
      maxImages: 4,
    },

    {
      id: 4,
      jobNo: "14894",
      productName: "CRYSTAL AWARD",
      client: "Tech Summit",
      quantity: "15 units",
      deliveryDate: "05-08-2023",
      status: "printing",
      workflow: "printing",
      designer: null,
      progress: null,
      reason: "Design changes needed",
      images: [
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/4c93600ae4-7f60b646ffc61aba60d7.png",
      ],
      hasImage: true,
      currentImageIndex: 0,
      uploadProgress: 1,
      maxImages: 4,
    },
    {
      id: 1,
      jobNo: "14896",
      productName: "WOOD PLAQUE",
      client: "Heritage School",
      quantity: "100 units",
      deliveryDate: "10-08-2023",
      status: "billing",
      workflow: "sample-created",
      designer: null,
      progress: "✅ Sample Created Successfully",
      images: [
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/c59212195c-8eacbd69a790771b19b8.png",
      ],
      hasImage: true,
      currentImageIndex: 0,
      uploadProgress: 1,
      maxImages: 4,
    },
    {
      id: 6,
      jobNo: "14891",
      productName: "ACRYLIC PLAQUE",
      client: "Ram Enterprises",
      quantity: "50 units",
      deliveryDate: "15-07-2023",
      status: "enquiry",
      workflow: "complete",
      designer: null,
      progress: null,
      hasImage: true,
      images: [
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/1d00b7b072-df113b3d375f653384c9.png",
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/4c93600ae4-7f60b646ffc61aba60d7.png",
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/3586517a57-bb57ce5d44b8623af560.png",
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/c5cf70a549-53f7ceb180f96ee9279a.png",
      ],
      uploadProgress: 4,
      maxImages: 4,
    },
  ];

  useEffect(() => {
    setEnquiries(sampleEnquiries);
    setFilteredEnquiries(sampleEnquiries);
  }, []);

  useEffect(() => {
    let filtered = enquiries;

    if (searchTerm) {
      filtered = filtered.filter(
        (enquiry) =>
          enquiry.productName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          enquiry.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
          enquiry.jobNo.includes(searchTerm)
      );
    }

    if (statusFilter) {
      filtered = filtered.filter((enquiry) => enquiry.status === statusFilter);
    }

    setFilteredEnquiries(filtered);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, enquiries]);

  const getStatusBadge = (status, workflow) => {
    const statusClasses = {
      printing: "bg-blue-500",
      rejected: "bg-red-500",
      approved: "bg-emerald-500",
      production: "bg-status-production",
      packaging: "bg-status-packaging",
      billing: "bg-status-billing",
      sampling: "bg-status-sampling",
      enquiry: "bg-status-enquiry",
      design: "bg-status-design",
    };
    return statusClasses[status] || "bg-gray-500";
  };

  const getStatusText = (status, workflow) => {
    const statusTexts = {
      enquiry: "ENQUIRY",
      design: "DESIGN",
      production: "PRODUCTION",
      printing: "PRINTING",
      billing: "BILLING",
      sampling: "SAMPLING",
      rejected: "REJECTED",
      approved: "CLIENT APPROVED",
    };
    return statusTexts[status] || status.toUpperCase();
  };

  // Image navigation
  const navigateImage = (enquiryId, direction) => {
    setEnquiries((prev) =>
      prev.map((enquiry) => {
        if (enquiry.id === enquiryId && enquiry.images.length > 1) {
          const currentIndex = enquiry.currentImageIndex || 0;
          let newIndex;

          if (direction === "next") {
            newIndex = (currentIndex + 1) % enquiry.images.length;
          } else {
            newIndex =
              currentIndex === 0 ? enquiry.images.length - 1 : currentIndex - 1;
          }

          return { ...enquiry, currentImageIndex: newIndex };
        }
        return enquiry;
      })
    );
  };

  const openViewModal = (jobNo) => {
    const enquiry = enquiries.find((e) => e.jobNo === jobNo);
    setModalContent(
      <ViewModal
        enquiry={enquiry}
        onApprove={() => approveDesign(jobNo)}
        onCreateSample={() => createSample(jobNo)}
        onClose={() => setModalOpen(false)}
      />
    );
    setModalOpen(true);
  };

  const handleAccept = (jobNo) => {
    setEnquiries((prev) =>
      prev.map((enquiry) =>
        enquiry.jobNo === jobNo ? { ...enquiry, isAccepted: true } : enquiry
      )
    );
  };

  const handleSubmit = () => {
    alert(`Submitted successfully!`);
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredEnquiries.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentEnquiries = filteredEnquiries.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const EnquiryCard = ({ enquiry }) => {
    const currentImage =
      enquiry.images && enquiry.images.length > 0
        ? enquiry.images[enquiry.currentImageIndex || 0]
        : null;

    const isComplete = enquiry.uploadProgress >= enquiry.maxImages;
    const needsMoreImages = enquiry.uploadProgress < enquiry.maxImages;

    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex flex-col md:flex-row min-h-[200px] h-full">
          <div className="p-4 flex-1">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-bold text-gray-800 uppercase">
                {enquiry.productName}
              </h3>
              <span
                className={`${getStatusBadge(
                  enquiry.status,
                  enquiry.workflow
                )} text-xs px-2 py-1 rounded font-semibold text-black`}
              >
                {getStatusText(enquiry.status, enquiry.workflow)}
              </span>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <span className="text-gray-500 w-24">Job No.:</span>
                <span className="font-medium">{enquiry.jobNo}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-500 w-24">Client:</span>
                <span className="font-medium">{enquiry.client}</span>
              </div>

              {enquiry.quantity && (
                <div className="flex items-center">
                  <span className="text-gray-500 w-24">Quantity:</span>
                  <span className="font-medium">{enquiry.quantity}</span>
                </div>
              )}

              {enquiry.deliveryDate && (
                <div className="flex items-center">
                  <span className="text-gray-500 w-24">Delivery Date:</span>
                  <span className="font-medium">{enquiry.deliveryDate}</span>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center mt-4">
              <div className="flex space-x-2 items-center">
                <button
                  className="text-gray-500 hover:text-blue-600 transition-colors"
                  onClick={() => openViewModal(enquiry.jobNo)}
                >
                  <i className="fa-solid fa-eye"></i>
                </button>

                {/* Submit button for completed uploads */}
                {/* Submit button when upload is completed */}
                {isComplete && ![6].includes(enquiry.id) && (
                  <button
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold text-sm px-2.5 py-1 rounded cursor-pointer"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                )}

                {/* Accept/Upload/Progress Logic */}
                {!isComplete && (
                  <>
                    {/* Step 1: Accept Button only before accept clicked */}
                    {!enquiry.isAccepted && (
                      <button
                        className="bg-[#ffa500] hover:bg-[#e69500] text-white text-sm px-2.5 py-1 rounded cursor-pointer flex items-center"
                        onClick={() => handleAccept(enquiry.jobNo)}
                      >
                        Accept
                      </button>
                    )}

                    {/* Step 2: Upload Icon + Progress after accept clicked */}
                    <>
                      {enquiry.isAccepted && (
                        <button
                          className="text-gray-500 hover:text-green-600 transition-colors"
                          onClick={() => {
                            setCurrentUploadJobNo(enquiry.jobNo);
                            setUploadModalOpen(true);
                          }}
                        >
                          <i className="fa-solid fa-cloud-arrow-up"></i>
                        </button>
                      )}

                      <span className="text-sm text-blue-600 ml-2 mt-[2px] font-medium">
                        {enquiry.uploadProgress}/{enquiry.maxImages}
                      </span>
                      {enquiry.isAccepted && (
                        <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-1 rounded">
                          <i className="fa-solid fa-clock mr-1"></i>
                          Processing
                        </span>
                      )}
                    </>
                    {/* )} */}
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/3 bg-gray-100 flex items-center justify-center relative">
            {enquiry.hasImage && currentImage ? (
              <>
                <img
                  className={`w-full h-full object-cover ${
                    enquiry.status === "rejected" ? "opacity-50" : ""
                  }`}
                  src={currentImage}
                  alt={enquiry.productName}
                />

                {enquiry.workflow === "complete" &&
                  enquiry.images.length > 1 && (
                    <>
                      <div
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/70 rounded-full p-1 cursor-pointer hover:bg-white/90 transition-colors"
                        onClick={() => navigateImage(enquiry.id, "prev")}
                      >
                        <i className="fa-solid fa-chevron-left text-gray-700"></i>
                      </div>
                      <div
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/70 rounded-full p-1 cursor-pointer hover:bg-white/90 transition-colors"
                        onClick={() => navigateImage(enquiry.id, "next")}
                      >
                        <i className="fa-solid fa-chevron-right text-gray-700"></i>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-white/90 rounded px-2 py-1 text-xs font-medium text-black">
                        {(enquiry.currentImageIndex || 0) + 1}/
                        {enquiry.images.length}
                      </div>
                    </>
                  )}

                {enquiry.workflow === "designing" &&
                  enquiry.images.length > 1 && (
                    <>
                      <div
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/70 rounded-full p-1 cursor-pointer hover:bg-white/90 transition-colors"
                        onClick={() => navigateImage(enquiry.id, "prev")}
                      >
                        <i className="fa-solid fa-chevron-left text-gray-700"></i>
                      </div>
                      <div
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/70 rounded-full p-1 cursor-pointer hover:bg-white/90 transition-colors"
                        onClick={() => navigateImage(enquiry.id, "next")}
                      >
                        <i className="fa-solid fa-chevron-right text-gray-700"></i>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-white/90 rounded px-2 py-1 text-xs font-medium text-black">
                        {(enquiry.currentImageIndex || 0) + 1}/
                        {enquiry.images.length}
                      </div>
                    </>
                  )}
              </>
            ) : (
              <div className="text-gray-400 text-center p-4">
                <i className="fa-solid fa-image text-2xl mb-2"></i>
                <p className="text-xs">No Product Image Available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Upload Modal Component
  const UploadModal = ({ jobNo, onClose, onUpload }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isDragOver, setIsDragOver] = useState(false);

    const handleFileSelect = (event) => {
      const file = event.target.files[0];
      if (
        file &&
        (file.type === "image/jpeg" ||
          file.type === "image/png" ||
          file.type === "image/gif")
      ) {
        setSelectedImage(file);
        const reader = new FileReader();
        reader.onload = (e) => setImagePreview(e.target.result);
        reader.readAsDataURL(file);
      } else {
        alert("Please select a valid image file (JPG, PNG, GIF)");
      }
    };

    const handleDrop = (event) => {
      event.preventDefault();
      setIsDragOver(false);
      const file = event.dataTransfer.files[0];
      if (
        file &&
        (file.type === "image/jpeg" ||
          file.type === "image/png" ||
          file.type === "image/gif")
      ) {
        setSelectedImage(file);
        const reader = new FileReader();
        reader.onload = (e) => setImagePreview(e.target.result);
        reader.readAsDataURL(file);
      }
    };

    const handleDragOver = (event) => {
      event.preventDefault();
      setIsDragOver(true);
    };

    const handleDragLeave = () => {
      setIsDragOver(false);
    };

    const handleUpload = () => {
      if (!selectedImage) {
        alert("Please select an image first");
        return;
      }

      // Simulate upload and add image to enquiry
      const imageUrl = imagePreview; // In real app, this would be uploaded to server
      onUpload(jobNo, imageUrl);
      onClose();
    };

    const currentEnquiry = enquiries.find((e) => e.jobNo === jobNo);
    const progress = currentEnquiry ? currentEnquiry.uploadProgress || 0 : 0;
    const maxImages = currentEnquiry ? currentEnquiry.maxImages || 4 : 4;

    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-lg p-6 w-96 max-w-[90vw]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Image Upload</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ×
            </button>
          </div>

          <div className="mb-4">
            <div className="bg-gray-100 rounded-lg p-3">
              <p className="text-sm text-gray-600 text-center">
                Upload Progress: {progress}/{maxImages}
              </p>
            </div>
          </div>

          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center ${
              isDragOver ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            {imagePreview ? (
              <div className="space-y-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-32 h-32 object-cover mx-auto rounded-lg"
                />
                <p className="text-sm text-gray-600">
                  Image selected successfully
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <i className="fa-solid fa-download text-4xl text-gray-400"></i>
                <div>
                  <button
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                    onClick={() =>
                      document.getElementById("file-input").click()
                    }
                  >
                    BROWSE & UPLOAD
                  </button>
                  <input
                    id="file-input"
                    type="file"
                    accept="image/jpeg,image/png,image/gif"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>
                <p className="text-sm text-gray-500">
                  Click to browse files or drag and drop
                </p>
                <p className="text-xs text-gray-400">
                  Maximum 1 image allowed • Supported formats: JPG, PNG, GIF
                </p>
              </div>
            )}
          </div>

          <div className="flex space-x-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-400 text-white py-2 rounded-lg hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              disabled={!selectedImage}
              className={`flex-1 py-2 rounded-lg ${
                selectedImage
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-green-300 cursor-not-allowed text-white"
              }`}
            >
              Confirm Upload
            </button>
          </div>
        </div>
      </div>
    );
  };

  const handleImageUpload = (jobNo, imageUrl) => {
    setEnquiries((prev) =>
      prev.map((enquiry) => {
        if (enquiry.jobNo === jobNo) {
          const newImages = [...(enquiry.images || []), imageUrl];
          const newProgress = newImages.length;
          return {
            ...enquiry,
            images: newImages,
            uploadProgress: newProgress,
            hasImage: true,
            isAccepted: newProgress < enquiry.maxImages, // Reset if complete
          };
        }
        return enquiry;
      })
    );
  };

  return (
    <>
      {/* Search & Action Bar */}
      <div className="bg-white p-4 shadow-sm mb-6 mt-20">
        <div className="flex justify-between items-center">
          <div className="relative w-96">
            <input
              type="text"
              placeholder="Search by product, client or job number..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="fa-solid fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
          <div className="flex items-center space-x-4">
            {/* <div className="flex items-center space-x-2"> */}
              <span className="text-sm text-gray-600">Status:</span>
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Status</option>
                <option value="enquiry">Enquiry</option>
                <option value="design">Design</option>
                <option value="production">Production</option>
                <option value="printing">Printing</option>
                <option value="billing">Billing</option>
                <option value="sampling">Sampling</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            {/* </div> */}
            {/* <button
              className="primary-bgclr hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
              onClick={() => navigate("/enquiries/add")}
            >
              <i className="fa-solid fa-plus mr-2"></i>
              Add Enquiry
            </button> */}
          </div>
        </div>
      </div>

      {/* Enquiry Cards Grid */}
      <div className="px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {currentEnquiries.map((enquiry) => (
          <EnquiryCard key={enquiry.id} enquiry={enquiry} />
        ))}
      </div>

      {/* Pagination */}
      <div className="bg-white p-4 shadow-sm mb-6 mx-4 rounded-lg">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-1">
            <button
              className="px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            {[...Array(Math.min(totalPages, 5))].map((_, index) => {
              const pageNum = index + 1;
              return (
                <button
                  key={pageNum}
                  className={`px-3 py-1 rounded transition-colors ${
                    currentPage === pageNum
                      ? "bg-blue-500 text-white"
                      : "border border-gray-300 text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              className="px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Show:</span>
            <select
              className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
            >
              <option value="12">12</option>
              <option value="24">24</option>
              <option value="36">36</option>
              <option value="48">48</option>
            </select>
            <span className="text-sm text-gray-600">per page</span>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {uploadModalOpen && (
        <UploadModal
          jobNo={currentUploadJobNo}
          onClose={() => setUploadModalOpen(false)}
          onUpload={handleImageUpload}
        />
      )}

      {/* View Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setModalOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>{modalContent}</div>
        </div>
      )}
    </>
  );
};

// Modal Components (ViewModal, etc. - keeping the same as original)
const ViewModal = ({ enquiry, onApprove, onCreateSample, onClose }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [approvedImages, setApprovedImages] = useState([]);

  const generateAssignmentHistory = () => {
    if (!enquiry.images || enquiry.images.length === 0) return [];

    return enquiry.images.map((image, index) => ({
      sno: String.fromCharCode(97 + index),
      image: image,
      startTime: "2025-02-09 09:10 AM",
      endTime: "2025-02-10 10:10 AM",
      clientStatus: "Approve",
      isApproved: approvedImages.includes(index),
    }));
  };

  const handleImageApproval = (index) => {
    setApprovedImages((prev) => [...prev, index]);
  };

  const allImagesApproved =
    enquiry.images && approvedImages.length === enquiry.images.length;

  // Sample extended data based on your images
  const extendedEnquiry = {
    ...enquiry,
    assignmentHistory: generateAssignmentHistory(),
    clientInfo: {
      name: enquiry.client || "SPORTS FEDERATION",
      email: "awards@sports.com",
      contact: "91234 56789",
      enquiryOrigin: "Email Inquiry",
    },
    financialDetails: {
      budget: "₹1,20,000",
      paymentTerms: "Corporate Credit",
    },
    deliveryInfo: {
      date: "19-01-2026",
      location: "Worli Sports Complex - MUMBAI",
      mode: "PICKUP",
    },
    productSpecs: {
      preferredMaterial: "Gold Plated Metal",
      briefing:
        "Olympic-style gold medals for inter-school sports competition. Different sports icons required.",
    },
    remarks: "Special product",
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg w-full max-w-5xl max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold uppercase">
            {enquiry.productName}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-180px)]">
          <div className="p-6">
            {/* Top Section with Image and Product Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Product Image */}
              <div className="md:col-span-1">
                <div className="border rounded-lg p-4 bg-gray-50">
                  {enquiry.images && enquiry.images.length > 0 ? (
                    <div>
                      <img
                        src={
                          enquiry.images[activeImageIndex] || enquiry.images[0]
                        }
                        alt={enquiry.productName}
                        className="w-full h-48 object-contain"
                      />
                      {enquiry.images.length > 1 && (
                        <div className="flex justify-center mt-2 gap-2">
                          {enquiry.images.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setActiveImageIndex(index)}
                              className={`w-2 h-2 rounded-full ${
                                index === activeImageIndex
                                  ? "bg-blue-500"
                                  : "bg-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      )}
                      <p className="text-center text-sm text-gray-600 mt-2">
                        Uploaded: {enquiry.images.length}/
                        {enquiry.maxImages || 4}
                      </p>
                    </div>
                  ) : (
                    <div className="text-center text-gray-400 py-12">
                      <i className="fa-solid fa-image text-4xl mb-2"></i>
                      <p>No Product Image Available</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Product Information */}
              <div className="md:col-span-2">
                <h3 className="text-lg font-semibold text-blue-600 mb-4">
                  Product Information
                </h3>
                <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                  <div className="flex">
                    <span className="text-gray-600 whitespace-nowrap">
                      Job Number:
                    </span>
                    <span className="font-medium ml-2">{enquiry.jobNo}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 whitespace-nowrap">
                      Quantity:
                    </span>
                    <span className="font-medium ml-2">{enquiry.quantity}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 whitespace-nowrap">
                      Size:
                    </span>
                    <span className="font-medium ml-2">3 Inches</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 whitespace-nowrap">
                      Status:
                    </span>
                    <span
                      className={`inline-block px-3 py-1 rounded text-sm font-medium ml-2 text-black ${
                        enquiry.status === "sampling"
                          ? "bg-status-sampling"
                          : enquiry.status === "rejected"
                          ? "bg-red-500"
                          : enquiry.status === "billing"
                          ? "bg-status-billing"
                          : enquiry.status === "production"
                          ? "bg-status-production"
                          : "bg-status-design"
                      }`}
                    >
                      {enquiry.status.toUpperCase()}
                    </span>
                  </div>
                  {enquiry.designer && (
                    <>
                      <div className="flex">
                        <span className="text-gray-600 whitespace-nowrap">
                          Assigned To:
                        </span>
                        <span className="font-medium ml-2">
                          {enquiry.designer}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-600 whitespace-nowrap">
                          Progress:
                        </span>
                        <span className="font-medium ml-2">
                          {enquiry.progress || "In Progress"}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Assignment Details Table */}
            {extendedEnquiry.assignmentHistory &&
              extendedEnquiry.assignmentHistory.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-blue-600 mb-4">
                    Assignment Details
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border p-2 text-left">S.No</th>
                          <th className="border p-2 text-left">Image</th>
                          <th className="border p-2 text-left">Start Time</th>
                          <th className="border p-2 text-left">End Time</th>
                          {enquiry.id !== 3 && enquiry.id === 1 && (
                            <>
                              <th className="border p-2 text-left">
                                Client Status
                              </th>
                            </>
                          )}

                          {enquiry.id === 6 && (
                            <>
                              <th className="border p-2 text-left">
                                Client Status
                              </th>
                            </>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {extendedEnquiry.assignmentHistory.map(
                          (assignment, index) => (
                            <tr key={index}>
                              <td className="border p-2">{assignment.sno}</td>
                              <td className="border p-2">
                                {assignment.image ? (
                                  <img
                                    src={assignment.image}
                                    alt="Assignment"
                                    className="w-12 h-12 object-contain"
                                  />
                                ) : (
                                  <i className="fa-solid fa-image text-gray-400"></i>
                                )}
                              </td>
                              <td className="border p-2">
                                {assignment.startTime}
                              </td>
                              <td className="border p-2">
                                {assignment.endTime}
                              </td>
                              {enquiry.id !== 3 && enquiry.id === 1 && (
                                <td className="border p-2">
                                  <span className="bg-green-500 text-white px-3 py-1 rounded text-sm">
                                    Approve
                                  </span>
                                </td>
                              )}
                              {enquiry.id === 6 && (
                                <td className="border p-2">
                                  <span className="bg-red-500 text-white px-3 py-1 rounded text-sm">
                                    Reject
                                  </span>
                                </td>
                              )}
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

            {/* Two Column Layout for Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Client Information */}
              <div>
                <h3 className="text-lg font-semibold text-blue-600 mb-4">
                  Client Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="text-gray-600 w-32 whitespace-nowrap">
                      Client:
                    </span>
                    <span className="font-medium">
                      {extendedEnquiry.clientInfo.name}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-600 w-32 whitespace-nowrap">
                      Email:
                    </span>
                    <a
                      href={`mailto:${extendedEnquiry.clientInfo.email}`}
                      className="text-blue-600 hover:underline flex items-center"
                    >
                      <i className="fa-solid fa-envelope mr-2"></i>
                      {extendedEnquiry.clientInfo.email}
                    </a>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-600 w-32 whitespace-nowrap">
                      Contact:
                    </span>
                    <a
                      href={`tel:${extendedEnquiry.clientInfo.contact}`}
                      className="text-blue-600 hover:underline flex items-center"
                    >
                      <i className="fa-solid fa-phone mr-2"></i>
                      {extendedEnquiry.clientInfo.contact}
                    </a>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-600 w-32 whitespace-nowrap">
                      Enquiry Origin:
                    </span>
                    <span className="font-medium">
                      {extendedEnquiry.clientInfo.enquiryOrigin}
                    </span>
                  </div>
                </div>
              </div>

              {/* Financial Details */}
              <div>
                <h3 className="text-lg font-semibold text-blue-600 mb-4">
                  Financial Details
                </h3>
                <div className="space-y-3">
                  <div className="flex">
                    <span className="text-gray-600 w-32">Budget:</span>
                    <span className="font-medium">
                      {extendedEnquiry.financialDetails.budget}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-32">Payment Terms:</span>
                    <span className="font-medium">
                      {extendedEnquiry.financialDetails.paymentTerms}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery and Product Specifications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Delivery Information */}
              <div>
                <h3 className="text-lg font-semibold text-blue-600 mb-4">
                  Delivery Information
                </h3>
                <div className="space-y-3">
                  <div className="flex">
                    <span className="text-gray-600 w-32">Delivery Date:</span>
                    <span className="font-medium">
                      {extendedEnquiry.deliveryInfo.date}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-32">
                      Delivery Location:
                    </span>
                    <span className="font-medium">
                      {extendedEnquiry.deliveryInfo.location}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-32">Delivery Mode:</span>
                    <span className="font-medium">
                      {extendedEnquiry.deliveryInfo.mode}
                    </span>
                  </div>
                </div>
              </div>

              {/* Product Specifications */}
              <div>
                <h3 className="text-lg font-semibold text-blue-600 mb-4">
                  Product Specifications
                </h3>
                <div className="space-y-3">
                  <div className="flex">
                    <span className="text-gray-600 w-32">
                      Preferred Material:
                    </span>
                    <span className="font-medium">
                      {extendedEnquiry.productSpecs.preferredMaterial}
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Briefing:</p>
                    <p className="font-medium">
                      {extendedEnquiry.productSpecs.briefing}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Remarks */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-blue-600 mb-4">
                Remarks
              </h3>
              <p className="font-medium">{extendedEnquiry.remarks}</p>
            </div>
          </div>
        </div>

        {/* Footer with Actions */}
        <div className="border-t p-6 bg-gray-50">
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="bg-gray-300 text-black px-6 py-2 rounded-lg hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnquiriesList;
