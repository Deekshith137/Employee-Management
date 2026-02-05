# Employee Management Form Website

A modern, responsive Employee Management Form application built with React.js and Tailwind CSS. This application allows users to enter, validate, and submit employee details through a clean and intuitive user interface.

## 🌟 Features

### ✅ Comprehensive Form Validation
- **Personal Information**: Name, phone, email, DOB, address validation
- **Professional Details**: Designation, department, joining date
- **Bank Information**: Bank account, IFSC code, PAN number, Aadhar validation
- **Emergency Contact**: Name, relationship, phone number validation
- Client-side validation with real-time error feedback
- Age verification (minimum 18 years)

### 📱 Responsive Design
- Mobile-first approach with Tailwind CSS
- Optimized for desktop, tablet, and mobile devices
- Card-based form layout
- Clean and modern UI/UX

### 🔒 Data Validation Rules

| Field | Validation Rules |
|-------|------------------|
| Employee Name | Required, non-empty string |
| Phone Number | Exactly 10 digits |
| Email | Valid email format |
| Date of Birth | Age must be 18+ years |
| Bank Account | 9-18 digits |
| IFSC Code | 11 characters (Format: AAAA0AAAAAA) |
| PAN Number | 10 characters (Format: AAAAAA0000A) |
| Aadhar Number | Exactly 12 digits |

### 💾 Data Persistence
- LocalStorage integration for saving employee records
- View total number of saved employees
- Data persists across browser sessions

### 🎨 UI/UX Enhancements
- Loading animation on form submission
- Success message display
- Error messages for invalid inputs
- Field-level error highlighting
- Smooth transitions and animations
- Success feedback with icons

## 📂 Project Structure

```
Employee_Management/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── EmployeeForm.jsx       # Main form component
│   ├── utils/
│   │   └── validation.js          # Form validation utilities
│   ├── App.js                      # Root component
│   ├── index.js                    # React DOM render
│   └── index.css                   # Tailwind + custom styles
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── .gitignore
└── README.md
```

## 🛠️ Tech Stack

- **React.js 18+** - UI library with functional components
- **React Hooks** - useState, useEffect for state management
- **Tailwind CSS** - Utility-first CSS framework
- **JavaScript ES6+** - Modern JavaScript features
- **LocalStorage API** - Client-side data persistence

## 📋 Form Fields

### Personal Information
- 👤 Employee Name
- 📞 Phone Number (10 digits)
- 📧 Email Address
- 🎂 Date of Birth (with age validation)
- 🏠 Address (textarea)

### Professional Information
- 💼 Designation (Dropdown)
  - ASM (Assistant Section Manager)
  - SM (Section Manager)
  - CSM (Customer Service Manager)
  - TL (Team Lead)
  - SE (Senior Executive)
  - E (Executive)
  - JE (Junior Executive)
- 🏢 Department (Dropdown)
  - Sales, Marketing, IT, HR, Finance, Operations, Support
- 📅 Date of Joining

### Bank Information
- 🏦 Bank Name
- 🔢 Bank Account Number (9-18 digits)
- 📝 IFSC Code (uppercase validation)
- 💳 PAN Number (uppercase validation)
- 🆔 Aadhar Number (12 digits)

### Emergency Contact
- 👥 Contact Name
- 🔗 Relationship
- 📱 Contact Phone Number (10 digits)

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Navigate to project directory**
```bash
cd Employee_Management
```

2. **Install dependencies**
```bash
npm install
```

### Running the Application

**Development mode:**
```bash
npm start
```
Opens [http://localhost:3000](http://localhost:3000) in your browser.

**Production build:**
```bash
npm run build
```

## 🎯 How to Use

1. **Fill Personal Information**
   - Enter your name, phone, email, DOB, and address
   - Phone must be exactly 10 digits
   - Email must be in valid format

2. **Enter Professional Details**
   - Select designation and department from dropdowns
   - Choose date of joining

3. **Provide Bank Information**
   - Enter bank name and account number
   - IFSC code will be automatically converted to uppercase
   - PAN number will be automatically converted to uppercase
   - Aadhar must be exactly 12 digits

4. **Add Emergency Contact**
   - Enter contact name and relationship
   - Phone number must be exactly 10 digits

5. **Submit Form**
   - Click "Submit" button
   - Form validates all fields before submission
   - Loading animation appears during submission
   - Success message shows after submission
   - Form resets automatically

6. **View Saved Records**
   - Total number of saved employees shown at bottom
   - Data persists in browser's localStorage

## ✨ Validation Features

- **Real-time Error Feedback**: Errors appear as you type
- **Phone Number Format**: Accepts numeric input only, enforces 10-digit length
- **Email Validation**: RFC-compliant email validation
- **Age Verification**: Ensures employee is at least 18 years old
- **Bank Details**: Validates account number range and IFSC format
- **PAN Format**: AAAAA0000A pattern validation
- **Aadhar Length**: Strict 12-digit validation
- **Required Fields**: All fields are mandatory

## 🎨 Styling

The application uses Tailwind CSS for styling with custom extensions:

- **Color Scheme**: Blue-based gradient design
- **Responsive Grid**: 1 column on mobile, 2 columns on desktop
- **Card Layout**: Clean card-based form sections
- **Animations**: Fade-in effects and loading spinners
- **Dark Mode Ready**: Can be extended with dark mode utilities

## 💾 LocalStorage Schema

Saved employee records are stored in localStorage under the key `employees`:

```javascript
[
  {
    employeeName: "John Doe",
    employeePhone: "9876543210",
    employeeEmail: "john@example.com",
    dateOfBirth: "1990-05-15",
    employeeAddress: "123 Street, City",
    designation: "ASM",
    department: "Sales",
    dateOfJoining: "2023-01-15",
    bankName: "State Bank of India",
    bankAccountNumber: "123456789",
    ifscCode: "SBIN0001234",
    panNumber: "ABCDE1234F",
    aadharNumber: "123456789012",
    emergencyContactName: "Jane Doe",
    emergencyContactRelationship: "Spouse",
    emergencyContactPhone: "9876543211"
  }
]
```

## 🔄 Form Actions

- **Submit**: Validates all fields and saves data to localStorage
- **Reset**: Clears all form fields and error messages
- **Auto-Reset on Success**: Form automatically resets after successful submission

## 📱 Responsive Breakpoints

- **Mobile**: Single column layout, full-width inputs
- **Tablet (md)**: Two-column grid for form fields
- **Desktop**: Multi-column responsive layout
- **Large Desktop**: Centered layout with max width constraints

## 🐛 Error Handling

- Validation occurs on form submission
- Invalid fields are highlighted with red borders
- Error messages appear below each invalid field
- Errors clear when user starts typing
- Form submission is prevented if validation fails

## 🔐 Data Security Notes

- All validation is client-side
- No data transmission to external servers (demo only)
- LocalStorage is browser-specific and not encrypted
- For production: Implement server-side validation and HTTPS

## 📦 Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎓 Learning Points

This project demonstrates:
- React functional components and hooks
- Form handling and validation
- State management with useState
- LocalStorage API usage
- Tailwind CSS responsive design
- CSS animations and transitions
- Component lifecycle with useEffect

## 📄 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Feel free to fork, modify, and enhance this project!

---

**Created**: February 2026  
**Version**: 1.0.0  
**Status**: Production Ready