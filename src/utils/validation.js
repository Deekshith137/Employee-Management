// Validation utilities for employee form

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhoneNumber = (phone) => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
};

export const validateAadharNumber = (aadhar) => {
  const aadharRegex = /^[0-9]{12}$/;
  return aadharRegex.test(aadhar.replace(/\D/g, ''));
};

export const validateBankAccountNumber = (accountNumber) => {
  const accountRegex = /^[0-9]{9,18}$/;
  return accountRegex.test(accountNumber.replace(/\D/g, ''));
};

export const validateIFSCCode = (ifsc) => {
  const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
  return ifscRegex.test(ifsc.toUpperCase());
};

export const validatePANNumber = (pan) => {
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return panRegex.test(pan.toUpperCase());
};

export const validateDateOfBirth = (dob) => {
  if (!dob) return false;
  const birthDate = new Date(dob);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    return age - 1 >= 18;
  }
  return age >= 18;
};

export const validateForm = (formData) => {
  const errors = {};

  // Employee Name
  if (!formData.employeeName.trim()) {
    errors.employeeName = 'Employee name is required';
  }

  // Employee Address
  if (!formData.employeeAddress.trim()) {
    errors.employeeAddress = 'Employee address is required';
  }

  // Phone Number
  if (!formData.employeePhone.trim()) {
    errors.employeePhone = 'Phone number is required';
  } else if (!validatePhoneNumber(formData.employeePhone)) {
    errors.employeePhone = 'Phone number must be 10 digits';
  }

  // Email
  if (!formData.employeeEmail.trim()) {
    errors.employeeEmail = 'Email is required';
  } else if (!validateEmail(formData.employeeEmail)) {
    errors.employeeEmail = 'Invalid email format';
  }

  // Date of Birth
  if (!formData.dateOfBirth) {
    errors.dateOfBirth = 'Date of birth is required';
  } else if (!validateDateOfBirth(formData.dateOfBirth)) {
    errors.dateOfBirth = 'Employee must be at least 18 years old';
  }

  // Designation
  if (!formData.designation) {
    errors.designation = 'Designation is required';
  }

  // Department
  if (!formData.department) {
    errors.department = 'Department is required';
  }

  // Date of Joining
  if (!formData.dateOfJoining) {
    errors.dateOfJoining = 'Date of joining is required';
  }

  // Bank Name
  if (!formData.bankName.trim()) {
    errors.bankName = 'Bank name is required';
  }

  // Bank Account Number
  if (!formData.bankAccountNumber.trim()) {
    errors.bankAccountNumber = 'Bank account number is required';
  } else if (!validateBankAccountNumber(formData.bankAccountNumber)) {
    errors.bankAccountNumber = 'Invalid bank account number (9-18 digits)';
  }

  // IFSC Code
  if (!formData.ifscCode.trim()) {
    errors.ifscCode = 'IFSC code is required';
  } else if (!validateIFSCCode(formData.ifscCode)) {
    errors.ifscCode = 'Invalid IFSC code format';
  }

  // PAN Number
  if (!formData.panNumber.trim()) {
    errors.panNumber = 'PAN number is required';
  } else if (!validatePANNumber(formData.panNumber)) {
    errors.panNumber = 'Invalid PAN number format';
  }

  // Aadhar Number
  if (!formData.aadharNumber.trim()) {
    errors.aadharNumber = 'Aadhar number is required';
  } else if (!validateAadharNumber(formData.aadharNumber)) {
    errors.aadharNumber = 'Aadhar number must be 12 digits';
  }

  // Emergency Contact Name
  if (!formData.emergencyContactName.trim()) {
    errors.emergencyContactName = 'Emergency contact name is required';
  }

  // Emergency Contact Relationship
  if (!formData.emergencyContactRelationship.trim()) {
    errors.emergencyContactRelationship = 'Relationship is required';
  }

  // Emergency Contact Phone
  if (!formData.emergencyContactPhone.trim()) {
    errors.emergencyContactPhone = 'Emergency contact phone is required';
  } else if (!validatePhoneNumber(formData.emergencyContactPhone)) {
    errors.emergencyContactPhone = 'Phone number must be 10 digits';
  }

  return errors;
};
