import React, { useState, useEffect } from 'react';
import { validateForm } from '../utils/validation';

const EmployeeForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const [formData, setFormData] = useState({
    employeeName: '',
    employeeAddress: '',
    employeePhone: '',
    employeeEmail: '',
    dateOfBirth: '',
    designation: 'ASM',
    department: 'Sales',
    dateOfJoining: '',
    bankName: '',
    bankAccountNumber: '',
    ifscCode: '',
    panNumber: '',
    aadharNumber: '',
    emergencyContactName: '',
    emergencyContactRelationship: '',
    emergencyContactPhone: '',
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [savedEmployees, setSavedEmployees] = useState([]);

  // Load saved employees from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('employees');
    if (saved) {
      setSavedEmployees(JSON.parse(saved));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // Validate current step fields
  const validateStep = (step) => {
    const stepFields = {
      1: ['employeeName', 'employeeAddress', 'employeePhone', 'employeeEmail', 'dateOfBirth'],
      2: ['designation', 'department', 'dateOfJoining'],
      3: ['bankName', 'bankAccountNumber', 'ifscCode', 'panNumber', 'aadharNumber'],
      4: ['emergencyContactName', 'emergencyContactRelationship', 'emergencyContactPhone'],
    };

    const fieldsToValidate = stepFields[step];
    const formErrors = validateForm(formData);
    const stepErrors = {};

    fieldsToValidate.forEach((field) => {
      if (formErrors[field]) {
        stepErrors[field] = formErrors[field];
      }
    });

    return stepErrors;
  };

  const handleNext = () => {
    const stepErrors = validateStep(currentStep);
    if (Object.keys(stepErrors).length === 0) {
      setErrors({});
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    } else {
      setErrors(stepErrors);
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate complete form
    const formErrors = validateForm(formData);
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      // Save to localStorage
      const updatedEmployees = [...savedEmployees, formData];
      localStorage.setItem('employees', JSON.stringify(updatedEmployees));
      setSavedEmployees(updatedEmployees);

      setIsLoading(false);
      setSubmitSuccess(true);

      // Reset form
      setFormData({
        employeeName: '',
        employeeAddress: '',
        employeePhone: '',
        employeeEmail: '',
        dateOfBirth: '',
        designation: 'ASM',
        department: 'Sales',
        dateOfJoining: '',
        bankName: '',
        bankAccountNumber: '',
        ifscCode: '',
        panNumber: '',
        aadharNumber: '',
        emergencyContactName: '',
        emergencyContactRelationship: '',
        emergencyContactPhone: '',
      });
      setCurrentStep(1);

      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };

  const handleReset = () => {
    setFormData({
      employeeName: '',
      employeeAddress: '',
      employeePhone: '',
      employeeEmail: '',
      dateOfBirth: '',
      designation: 'ASM',
      department: 'Sales',
      dateOfJoining: '',
      bankName: '',
      bankAccountNumber: '',
      ifscCode: '',
      panNumber: '',
      aadharNumber: '',
      emergencyContactName: '',
      emergencyContactRelationship: '',
      emergencyContactPhone: '',
    });
    setErrors({});
    setSubmitSuccess(false);
    setCurrentStep(1);
  };

  const getStepTitle = () => {
    const titles = {
      1: 'Personal Information',
      2: 'Professional Information',
      3: 'Bank Information',
      4: 'Emergency Contact',
    };
    return titles[currentStep];
  };

  const getStepDescription = () => {
    const descriptions = {
      1: 'Please provide your personal details',
      2: 'Tell us about your professional background',
      3: 'Add your bank account details',
      4: 'Provide emergency contact information',
    };
    return descriptions[currentStep];
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-2">
            Employee Registration
          </h1>
          <p className="text-gray-600 text-lg">
            Complete your profile step by step
          </p>
        </div>

        {/* Success Message */}
        {submitSuccess && (
          <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded animate-fade-in">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-semibold text-green-800">
                  Employee registered successfully! Your data has been saved.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Step Indicator */}
        <div className="mb-10">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((step) => (
              <React.Fragment key={step}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                      step === currentStep
                        ? 'bg-black text-white shadow-lg scale-110'
                        : step < currentStep
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {step < currentStep ? (
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      step
                    )}
                  </div>
                  <p className="text-xs font-semibold text-gray-700 mt-2 text-center">
                    {['Personal', 'Professional', 'Bank', 'Emergency'][step - 1]}
                  </p>
                </div>
                {step < 4 && (
                  <div
                    className={`flex-1 h-1 mx-2 transition-all duration-300 ${
                      step < currentStep ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-black to-gray-800 px-8 py-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              {getStepTitle()}
            </h2>
            <p className="text-gray-300">
              Step {currentStep} of {totalSteps} • {getStepDescription()}
            </p>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-8">
            {/* STEP 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fade-in">
                {/* Employee Name */}
                <div>
                  <label className="form-label">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="employeeName"
                    value={formData.employeeName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={`form-input ${errors.employeeName ? 'border-red-500' : ''}`}
                  />
                  {errors.employeeName && (
                    <p className="error-message">{errors.employeeName}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="form-label">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="employeePhone"
                    value={formData.employeePhone}
                    onChange={handleChange}
                    placeholder="Enter 10-digit phone number"
                    maxLength="10"
                    className={`form-input ${errors.employeePhone ? 'border-red-500' : ''}`}
                  />
                  {errors.employeePhone && (
                    <p className="error-message">{errors.employeePhone}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="form-label">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="employeeEmail"
                    value={formData.employeeEmail}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className={`form-input ${errors.employeeEmail ? 'border-red-500' : ''}`}
                  />
                  {errors.employeeEmail && (
                    <p className="error-message">{errors.employeeEmail}</p>
                  )}
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="form-label">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className={`form-input ${errors.dateOfBirth ? 'border-red-500' : ''}`}
                  />
                  {errors.dateOfBirth && (
                    <p className="error-message">{errors.dateOfBirth}</p>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label className="form-label">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="employeeAddress"
                    value={formData.employeeAddress}
                    onChange={handleChange}
                    placeholder="Enter your complete address"
                    rows="3"
                    className={`form-textarea ${errors.employeeAddress ? 'border-red-500' : ''}`}
                  />
                  {errors.employeeAddress && (
                    <p className="error-message">{errors.employeeAddress}</p>
                  )}
                </div>
              </div>
            )}

            {/* STEP 2: Professional Information */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fade-in">
                {/* Designation */}
                <div>
                  <label className="form-label">
                    Designation <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    className={`form-select ${errors.designation ? 'border-red-500' : ''}`}
                  >
                    <option value="ASM">ASM (Assistant Section Manager)</option>
                    <option value="SM">SM (Section Manager)</option>
                    <option value="CSM">CSM (Customer Service Manager)</option>
                    <option value="TL">TL (Team Lead)</option>
                    <option value="SE">SE (Senior Executive)</option>
                    <option value="E">E (Executive)</option>
                    <option value="JE">JE (Junior Executive)</option>
                  </select>
                  {errors.designation && (
                    <p className="error-message">{errors.designation}</p>
                  )}
                </div>

                {/* Department */}
                <div>
                  <label className="form-label">
                    Department <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className={`form-select ${errors.department ? 'border-red-500' : ''}`}
                  >
                    <option value="Sales">Sales</option>
                    <option value="Marketing">Marketing</option>
                    <option value="IT">IT</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                    <option value="Operations">Operations</option>
                    <option value="Support">Support</option>
                  </select>
                  {errors.department && (
                    <p className="error-message">{errors.department}</p>
                  )}
                </div>

                {/* Date of Joining */}
                <div>
                  <label className="form-label">
                    Date of Joining <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="dateOfJoining"
                    value={formData.dateOfJoining}
                    onChange={handleChange}
                    className={`form-input ${errors.dateOfJoining ? 'border-red-500' : ''}`}
                  />
                  {errors.dateOfJoining && (
                    <p className="error-message">{errors.dateOfJoining}</p>
                  )}
                </div>
              </div>
            )}

            {/* STEP 3: Bank Information */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fade-in">
                {/* Bank Name */}
                <div>
                  <label className="form-label">
                    Bank Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleChange}
                    placeholder="Enter your bank name"
                    className={`form-input ${errors.bankName ? 'border-red-500' : ''}`}
                  />
                  {errors.bankName && (
                    <p className="error-message">{errors.bankName}</p>
                  )}
                </div>

                {/* Bank Account Number */}
                <div>
                  <label className="form-label">
                    Bank Account Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="bankAccountNumber"
                    value={formData.bankAccountNumber}
                    onChange={handleChange}
                    placeholder="Enter account number (9-18 digits)"
                    className={`form-input ${errors.bankAccountNumber ? 'border-red-500' : ''}`}
                  />
                  {errors.bankAccountNumber && (
                    <p className="error-message">{errors.bankAccountNumber}</p>
                  )}
                </div>

                {/* IFSC Code */}
                <div>
                  <label className="form-label">
                    IFSC Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="ifscCode"
                    value={formData.ifscCode}
                    onChange={(e) =>
                      setFormData({ ...formData, ifscCode: e.target.value.toUpperCase() })
                    }
                    placeholder="e.g., SBIN0001234"
                    className={`form-input ${errors.ifscCode ? 'border-red-500' : ''}`}
                  />
                  {errors.ifscCode && (
                    <p className="error-message">{errors.ifscCode}</p>
                  )}
                </div>

                {/* PAN Number */}
                <div>
                  <label className="form-label">
                    PAN Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="panNumber"
                    value={formData.panNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, panNumber: e.target.value.toUpperCase() })
                    }
                    placeholder="e.g., ABCDE1234F"
                    className={`form-input ${errors.panNumber ? 'border-red-500' : ''}`}
                  />
                  {errors.panNumber && (
                    <p className="error-message">{errors.panNumber}</p>
                  )}
                </div>

                {/* Aadhar Number */}
                <div>
                  <label className="form-label">
                    Aadhar Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="aadharNumber"
                    value={formData.aadharNumber}
                    onChange={handleChange}
                    placeholder="Enter 12-digit Aadhar number"
                    maxLength="12"
                    className={`form-input ${errors.aadharNumber ? 'border-red-500' : ''}`}
                  />
                  {errors.aadharNumber && (
                    <p className="error-message">{errors.aadharNumber}</p>
                  )}
                </div>
              </div>
            )}

            {/* STEP 4: Emergency Contact */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-fade-in">
                {/* Emergency Contact Name */}
                <div>
                  <label className="form-label">
                    Contact Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="emergencyContactName"
                    value={formData.emergencyContactName}
                    onChange={handleChange}
                    placeholder="Enter emergency contact name"
                    className={`form-input ${errors.emergencyContactName ? 'border-red-500' : ''}`}
                  />
                  {errors.emergencyContactName && (
                    <p className="error-message">{errors.emergencyContactName}</p>
                  )}
                </div>

                {/* Relationship */}
                <div>
                  <label className="form-label">
                    Relationship <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="emergencyContactRelationship"
                    value={formData.emergencyContactRelationship}
                    onChange={handleChange}
                    placeholder="e.g., Spouse, Parent, Sibling"
                    className={`form-input ${errors.emergencyContactRelationship ? 'border-red-500' : ''}`}
                  />
                  {errors.emergencyContactRelationship && (
                    <p className="error-message">{errors.emergencyContactRelationship}</p>
                  )}
                </div>

                {/* Emergency Contact Phone */}
                <div>
                  <label className="form-label">
                    Contact Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="emergencyContactPhone"
                    value={formData.emergencyContactPhone}
                    onChange={handleChange}
                    placeholder="Enter 10-digit phone number"
                    maxLength="10"
                    className={`form-input ${errors.emergencyContactPhone ? 'border-red-500' : ''}`}
                  />
                  {errors.emergencyContactPhone && (
                    <p className="error-message">{errors.emergencyContactPhone}</p>
                  )}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-10 pt-8 border-t border-gray-200">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                  currentStep === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-black hover:bg-gray-300 active:scale-95'
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Previous
              </button>

              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 py-3 px-6 rounded-lg font-semibold bg-black text-white hover:bg-gray-800 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
                >
                  Next
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 py-3 px-6 rounded-lg font-semibold bg-green-600 text-white hover:bg-green-700 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isLoading ? (
                    <>
                      <div className="spinner-small"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Submit
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Reset Button */}
            <button
              type="button"
              onClick={handleReset}
              className="w-full mt-3 py-2 px-4 rounded-lg font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all duration-300"
            >
              Reset All
            </button>

            {/* Record Count */}
            {savedEmployees.length > 0 && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg text-center border border-gray-200">
                <p className="text-sm text-gray-700">
                  📊 <span className="font-semibold text-black">{savedEmployees.length}</span> employee record(s) saved
                </p>
              </div>
            )}
          </form>
        </div>

        {/* Footer */}
        <div className="mt-10 text-center text-gray-500 text-sm">
          <p>Employee Management System © 2026 | All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;
