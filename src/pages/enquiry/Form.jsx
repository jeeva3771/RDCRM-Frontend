import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const EnquiryForm = () => {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [dragActive, setDragActive] = useState(false);
  const [showDetails, setShowDetails] = useState({
    client: true,
    images: true,
    product: true,
    delivery: true
  });

  // Multi-step form data
  const [formData, setFormData] = useState({
    // Step 1: Client Details
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    enquiryOrigin: "",
    optionsRequired: "",

    // Step 2: Images
    uploadedImages: [],

    // Step 3: Product Details
    productName: "",
    quantity: "",
    size: "",
    budget: "",
    material: "",

    // Step 4: Delivery Details
    deliveryDate: "",
    deliveryMode: "",
    deliveryLocation: "",
    specialInstructions: "",

    // Step 5: Payment
    paymentOption: "100% advance",
  });

  const steps = [
    { id: 1, label: "Client Details", icon: "fa-user" },
    { id: 2, label: "Image Upload", icon: "fa-image" },
    { id: 3, label: "Product Details", icon: "fa-box" },
    { id: 4, label: "Delivery Details", icon: "fa-truck" },
    { id: 5, label: "Payment", icon: "fa-credit-card" },
  ];

  // Handle form data changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Image upload handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files) => {
    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(file => {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      return validTypes.includes(file.type);
    });

    if (formData.uploadedImages.length + validFiles.length > 5) {
      alert('Maximum 5 images allowed');
      return;
    }

    const newImages = validFiles.map(file => ({
      file: file,
      id: Date.now() + Math.random(),
      url: URL.createObjectURL(file),
      name: file.name
    }));

    setFormData(prev => ({
      ...prev,
      uploadedImages: [...prev.uploadedImages, ...newImages]
    }));
  };

  const removeImage = (imageId) => {
    setFormData(prev => ({
      ...prev,
      uploadedImages: prev.uploadedImages.filter(img => img.id !== imageId)
    }));
  };

  const toggleDetails = (section) => {
    setShowDetails(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Step navigation
  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step) => {
    setCurrentStep(step);
  };

  // Handle form submission
  const handleSubmit = () => {
   navigate('/enquiries')
    // In a real application, you would redirect or show a success page
  };

  // Render step indicator
  const renderStepIndicator = (step) => {
    const isActive = currentStep === step.id;
    const isCompleted = currentStep > step.id;

    return (
      <div key={step.id} className="flex flex-col items-center w-1/5 relative">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-colors ${
            isCompleted
              ? "bg-green-500 text-white"
              : isActive
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-500"
          }`}
        >
          {/* {isCompleted ? (
            <i className="fa-solid fa-check"></i>
          ) : ( */}
            <i className={`fa-solid ${step.icon}`}></i>
          {/* )} */}
        </div>
        <span
          className={`text-sm font-medium transition-colors ${
            isActive
              ? "text-blue-600"
              : isCompleted
              ? "text-green-500"
              : "text-gray-500"
          }`}
        >
          {step.label}
        </span>
        {step.id < 5 && (
          <div
            className={`absolute top-6 left-full w-full h-0.5 -z-10 transition-colors ${
              isCompleted ? "bg-green-500" : "bg-gray-300"
            }`}
          ></div>
        )}
      </div>
    );
  };

  // Render summary card with hide/show functionality
  const renderSummaryCard = (title, data, editAction, sectionKey) => (
    <div className="mb-4 p-4 bg-gray-900/5 rounded-lg border">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-3">
          <h3 className="font-medium text-gray-800">{title}</h3>
          <button
            className="hover:text-gray-700 rounded transition-colors"
            title={showDetails[sectionKey] ? 'Hide details' : 'Show details'}
            onClick={() => toggleDetails(sectionKey)}
          >
            <i    className={`fa-solid ${showDetails[sectionKey] ? 'fa-eye' : 'fa-eye'} text-sm`}></i>
          </button>
        </div>
        <button
          onClick={editAction}
          className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1 transition-colors"
        >
          <i className="fa-solid fa-pen-to-square"></i>
          <span>Edit</span>
        </button>
      </div>
      {showDetails[sectionKey] && (
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          {Object.entries(data).map(([key, value]) => (
            <div key={key}>
              <span className="text-gray-500">{key}:</span>
              <span className="ml-1 font-medium">{value || "Not specified"}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Render images summary card
  const renderImagesSummaryCard = (title, editAction, sectionKey) => (
    <div className="mb-4 p-4 bg-gray-900/5 rounded-lg border">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-3">
          <h3 className="font-medium text-gray-800">{title}</h3>
          <button
            onClick={() => toggleDetails(sectionKey)}
            className="hover:text-gray-700 rounded transition-colors"
            title={showDetails[sectionKey] ? 'Hide details' : 'Show details'}
          >
            <i className={`fa-solid ${showDetails[sectionKey] ? 'fa-eye' : 'fa-eye'} text-sm`}></i>
          </button>
        </div>
        <button
          onClick={editAction}
          className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1 transition-colors"
        >
          <i className="fa-solid fa-pen-to-square"></i>
          <span>Edit</span>
        </button>
      </div>
      {showDetails[sectionKey] && (
        <div className="flex flex-wrap gap-2">
          {formData.uploadedImages.length > 0 ? (
            formData.uploadedImages.map((image, index) => (
              <div key={image.id} className="w-12 h-12 rounded bg-gray-100 p-1">
                <img
                  src={image.url}
                  alt={`Uploaded image ${index + 1}`}
                  className="w-full h-full object-cover rounded"
                />
              </div>
            ))
          ) : (
            <span className="text-sm text-gray-500">No images uploaded</span>
          )}
        </div>
      )}
    </div>
  );

  return (
    <>
      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto h-screen">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Multi-Step Enquiry Form
            </h1>
            <p className="text-gray-600">
              Complete all steps to submit your enquiry
            </p>
          </div>

          {/* Step Indicator */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex justify-between">
              {steps.map((step) => renderStepIndicator(step))}
            </div>
          </div>

          {/* Step Content Container */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            {/* Step 1: Client Details */}
            {currentStep === 1 && (
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                  Client Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Client Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="clientName"
                      value={formData.clientName}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="Enter client name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="clientEmail"
                      value={formData.clientEmail}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="clientPhone"
                      value={formData.clientPhone}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="Enter contact number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Enquiry Origin <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="enquiryOrigin"
                      value={formData.enquiryOrigin}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="Enter enquiry origin"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Number of Options Required{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="optionsRequired"
                      value={formData.optionsRequired}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="Enter number of options required"
                    />
                  </div>
                </div>
                <div className="mt-8 flex justify-end">
                  <button
                    onClick={nextStep}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-lg transition duration-200 flex items-center"
                  >
                    Next
                    <i className="fa-solid fa-arrow-right ml-2"></i>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Image Upload */}
            {currentStep === 2 && (
              <div>
                {renderSummaryCard(
                  "Client Details",
                  {
                    "Client Name": formData.clientName,
                    Email: formData.clientEmail,
                    "Contact Number": formData.clientPhone,
                    "Enquiry Origin": formData.enquiryOrigin,
                    "Options Required": formData.optionsRequired,
                  },
                  () => goToStep(1),
                  "client"
                )}

                <h2 className="text-xl font-bold text-gray-800 mb-6">
                  Image Upload
                </h2>
                
                <div 
                  className={`border-2 border-dashed rounded-lg p-8 text-center mb-6 transition-colors ${
                    dragActive 
                      ? 'border-blue-400 bg-blue-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="mb-4">
                    <i className="fa-solid fa-cloud-arrow-up text-4xl text-gray-400"></i>
                  </div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">
                    Drag & Drop your images here
                  </h3>
                  <p className="text-gray-500 mb-4">or</p>
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                  >
                    Browse Files
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileInput}
                    className="hidden"
                  />
                  <p className="text-sm text-gray-500 mt-4">
                    Maximum 5 images. Accepted formats: JPG, PNG, GIF
                  </p>
                </div>

                {formData.uploadedImages.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                    {formData.uploadedImages.map((image) => (
                      <div key={image.id} className="relative bg-gray-100 rounded-lg p-1 aspect-square flex items-center justify-center">
                        <img
                          src={image.url}
                          alt={image.name}
                          className="max-h-full max-w-full rounded object-cover"
                        />
                        <button 
                          onClick={() => removeImage(image.id)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                        >
                          <i className="fa-solid fa-times text-xs"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-8 flex justify-between">
                  <button
                    onClick={previousStep}
                    className="border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium py-2.5 px-6 rounded-lg transition duration-200 flex items-center"
                  >
                    <i className="fa-solid fa-arrow-left mr-2"></i>
                    Previous
                  </button>
                  <button
                    onClick={nextStep}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-lg transition duration-200 flex items-center"
                  >
                    Next
                    <i className="fa-solid fa-arrow-right ml-2"></i>
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Product Details */}
            {currentStep === 3 && (
              <div>
                {renderSummaryCard(
                  "Client Details",
                  {
                    "Client Name": formData.clientName,
                    Email: formData.clientEmail,
                    "Contact Number": formData.clientPhone,
                    "Enquiry Origin": formData.enquiryOrigin,
                    "Options Required": formData.optionsRequired,
                  },
                  () => goToStep(1),
                  "client"
                )}

                {renderImagesSummaryCard("Image Upload", () => goToStep(2), "images")}

                <h2 className="text-xl font-bold text-gray-800 mb-6">
                  Product Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Name / Theme{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="productName"
                      value={formData.productName}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="Enter product name or theme"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleFormChange}
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="Enter quantity"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Size <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="size"
                      value={formData.size}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="Enter size"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Budget <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="budget"
                        value={formData.budget}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        placeholder="Enter budget"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Material <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="material"
                      value={formData.material}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="Enter preferred material"
                    />
                  </div>
                </div>

                <div className="mt-8 flex justify-between">
                  <button
                    onClick={previousStep}
                    className="border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium py-2.5 px-6 rounded-lg transition duration-200 flex items-center"
                  >
                    <i className="fa-solid fa-arrow-left mr-2"></i>
                    Previous
                  </button>
                  <button
                    onClick={nextStep}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-lg transition duration-200 flex items-center"
                  >
                    Next
                    <i className="fa-solid fa-arrow-right ml-2"></i>
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Delivery Details */}
            {currentStep === 4 && (
              <div>
                {renderSummaryCard(
                  "Client Details",
                  {
                    "Client Name": formData.clientName,
                    Email: formData.clientEmail,
                    "Contact Number": formData.clientPhone,
                    "Enquiry Origin": formData.enquiryOrigin,
                    "Options Required": formData.optionsRequired,
                  },
                  () => goToStep(1),
                  "client"
                )}

                {renderImagesSummaryCard("Image Upload", () => goToStep(2), "images")}

                {renderSummaryCard(
                  "Product Details",
                  {
                    "Product Name": formData.productName,
                    Quantity: formData.quantity,
                    Size: formData.size,
                    Budget: formData.budget ? `${formData.budget}` : "",
                    Material: formData.material,
                  },
                  () => goToStep(3),
                  "product"
                )}

                <h2 className="text-xl font-bold text-gray-800 mb-6">
                  Delivery Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Delivery Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="deliveryDate"
                      value={formData.deliveryDate}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Delivery Mode <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="deliveryMode"
                      value={formData.deliveryMode}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    >
                      <option value="">Select delivery mode</option>
                      <option value="hand">Hand Delivery</option>
                      <option value="courier">Courier</option>
                      <option value="self">Self Pickup</option>
                      <option value="express">Express Delivery</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Delivery Location <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="deliveryLocation"
                      value={formData.deliveryLocation}
                      onChange={handleFormChange}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="Enter delivery address"
                    ></textarea>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Briefing
                    </label>
                    <textarea
                      name="specialInstructions"
                      value={formData.specialInstructions}
                      onChange={handleFormChange}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="Enter briefing"
                    ></textarea>
                  </div>
                </div>

                <div className="mt-8 flex justify-between">
                  <button
                    onClick={previousStep}
                    className="border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium py-2.5 px-6 rounded-lg transition duration-200 flex items-center"
                  >
                    <i className="fa-solid fa-arrow-left mr-2"></i>
                    Previous
                  </button>
                  <button
                    onClick={nextStep}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-lg transition duration-200 flex items-center"
                  >
                    Next
                    <i className="fa-solid fa-arrow-right ml-2"></i>
                  </button>
                </div>
              </div>
            )}

            {/* Step 5: Payment */}
            {currentStep === 5 && (
              <div>
                {/* Summary of previous steps */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {renderSummaryCard(
                    "Client Details",
                    {
                      "Client Name": formData.clientName,
                    Email: formData.clientEmail,
                    "Contact Number": formData.clientPhone,
                    "Enquiry Origin": formData.enquiryOrigin,
                    "Options Required": formData.optionsRequired,
                    },
                    () => goToStep(1),
                    "client"
                  )}

                  {renderSummaryCard(
                    "Product Details",
                    {
                     "Product Name": formData.productName,
                    Quantity: formData.quantity,
                    Size: formData.size,
                    Budget: formData.budget ? `${formData.budget}` : "",
                    Material: formData.material,
                    },
                    () => goToStep(3),
                    "product"
                  )}

                  {renderImagesSummaryCard("Image Upload", () => goToStep(2), "images")}

                  {renderSummaryCard(
                    "Delivery Details",
                    {
                      "Delivery Date": formData.deliveryDate,
                      "Delivery Mode": formData.deliveryMode,
                      Location: formData.deliveryLocation,
                    },
                    () => goToStep(4),
                    "delivery"
                  )}
                </div>

                <h2 className="text-xl font-bold text-gray-800 mb-6">
                  Payment Options
                </h2>
                <div className="space-y-4 mb-8">
                  <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-600 hover:bg-blue-900/5 transition-colors">
                    <label className="flex items-start cursor-pointer">
                      <input
                        type="radio"
                        name="paymentOption"
                        value="100% advance"
                        checked={formData.paymentOption === "100% advance"}
                        onChange={handleFormChange}
                        className="mt-1 mr-3 accent-blue-600"
                      />
                      <div>
                        <span className="font-medium text-gray-800 block mb-1">
                          100% Advance
                        </span>
                        <span className="text-sm text-gray-600">
                          Full payment upfront to secure your order
                        </span>
                      </div>
                    </label>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-600 hover:bg-blue-900/5 transition-colors">
                    <label className="flex items-start cursor-pointer">
                      <input
                        type="radio"
                        name="paymentOption"
                        value="50% advance"
                        checked={formData.paymentOption === "50% advance"}
                        onChange={handleFormChange}
                        className="mt-1 mr-3 accent-blue-600"
                      />
                      <div>
                        <span className="font-medium text-gray-800 block mb-1">
                          50% Advance & Balance Before Dispatch
                        </span>
                        <span className="text-sm text-gray-600">
                          Pay 50% now and the remaining amount before dispatch
                        </span>
                      </div>
                    </label>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-600 hover:bg-blue-900/5 transition-colors">
                    <label className="flex items-start cursor-pointer">
                      <input
                        type="radio"
                        name="paymentOption"
                        value="corporate credit"
                        checked={formData.paymentOption === "corporate credit"}
                        onChange={handleFormChange}
                        className="mt-1 mr-3 accent-blue-600"
                      />
                      <div>
                        <span className="font-medium text-gray-800 block mb-1">
                          Corporate Credit
                        </span>
                        <span className="text-sm text-gray-600">
                          Available for verified corporate clients with approved credit terms
                        </span>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="mt-8 flex justify-between">
                  <button
                    onClick={previousStep}
                    className="border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium py-2.5 px-6 rounded-lg transition duration-200 flex items-center"
                  >
                    <i className="fa-solid fa-arrow-left mr-2"></i>
                    Previous
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 px-6 rounded-lg transition duration-200 flex items-center"
                  >
                    <i className="fa-solid fa-check mr-2"></i>
                    Submit Enquiry
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default EnquiryForm;