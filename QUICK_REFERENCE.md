# 📋 Developer Quick Reference

## Project Initialization

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Clean install (if issues)
rm -rf node_modules && npm install
```

## File Location Guide

| File | Purpose | Path |
|------|---------|------|
| Main Form | Employee form component | `src/components/EmployeeForm.jsx` |
| Validation | All validation functions | `src/utils/validation.js` |
| Styles | CSS & Tailwind | `src/index.css` |
| Root Component | App wrapper | `src/App.js` |
| Entry Point | React render | `src/index.js` |
| Tailwind Config | CSS framework config | `tailwind.config.js` |
| PostCSS Config | CSS processing | `postcss.config.js` |
| HTML Template | Main HTML file | `public/index.html` |
| Dependencies | Project packages | `package.json` |

## Key Form Fields

```javascript
formData = {
  employeeName: "",
  employeeAddress: "",
  employeePhone: "",           // 10 digits
  employeeEmail: "",           // valid email
  dateOfBirth: "",             // 18+ years
  designation: "ASM",          // dropdown
  department: "Sales",         // dropdown
  dateOfJoining: "",
  bankName: "",
  bankAccountNumber: "",       // 9-18 digits
  ifscCode: "",                // XXXX0XXXXXX
  panNumber: "",               // XXXXX0000X
  aadharNumber: "",            // 12 digits
  emergencyContactName: "",
  emergencyContactRelationship: "",
  emergencyContactPhone: "",   // 10 digits
}
```

## Validation Functions

```javascript
// Email validation
validateEmail(email) ✓

// Phone number (10 digits)
validatePhoneNumber(phone) ✓

// Aadhar (12 digits)
validateAadharNumber(aadhar) ✓

// Bank account (9-18 digits)
validateBankAccountNumber(account) ✓

// IFSC code format
validateIFSCCode(ifsc) ✓

// PAN number format
validatePANNumber(pan) ✓

// Age verification (18+)
validateDateOfBirth(dob) ✓

// Complete form validation
validateForm(formData) ✓
```

## Common Code Patterns

### Update Form Data
```javascript
setFormData(prev => ({
  ...prev,
  [name]: value
}))
```

### Handle Input Change
```javascript
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
  if (errors[name]) {
    setErrors(prev => ({ ...prev, [name]: '' }));
  }
}
```

### Form Submission
```javascript
const handleSubmit = (e) => {
  e.preventDefault();
  const formErrors = validateForm(formData);
  
  if (Object.keys(formErrors).length > 0) {
    setErrors(formErrors);
    return;
  }
  // Process submission
}
```

### LocalStorage Operations
```javascript
// Save
localStorage.setItem('employees', JSON.stringify(data));

// Load
const data = JSON.parse(localStorage.getItem('employees'));

// Clear
localStorage.removeItem('employees');
localStorage.clear();
```

## Tailwind CSS Classes Used

```css
/* Containers & Layout */
.max-w-5xl                    /* Max width container */
.grid grid-cols-1 md:grid-cols-2  /* Responsive grid */
.flex flex-col sm:flex-row    /* Responsive flex */

/* Text & Typography */
.text-4xl font-bold           /* Large heading */
.text-sm font-semibold        /* Label text */
.text-red-500                 /* Error color */
.text-green-500               /* Success color */

/* Backgrounds & Colors */
.bg-white                     /* White background */
.bg-gradient-to-br            /* Gradient background */
.from-blue-50 to-indigo-100   /* Gradient colors */

/* Borders & Shadows */
.border border-gray-300       /* Border styling */
.rounded-lg                   /* Border radius */
.shadow-lg                    /* Shadow effect */

/* Spacing */
.p-8                          /* Padding */
.mb-6                         /* Margin bottom */
.gap-6                        /* Gap between items */

/* Interactive */
.hover:bg-blue-600            /* Hover state */
.focus:ring-2 focus:ring-blue-500  /* Focus state */
.active:scale-95              /* Active state */
```

## Input Field Styling

```javascript
// Text input
<input type="text" className="form-input" />

// Textarea
<textarea className="form-textarea" />

// Dropdown
<select className="form-select">

// With error
className={`form-input ${errors.field ? 'border-red-500' : ''}`}
```

## Error Display Pattern

```javascript
{errors.fieldName && (
  <p className="error-message">{errors.fieldName}</p>
)}
```

## Button Styling

```javascript
// Primary button
<button className="btn-primary">Submit</button>

// Secondary button
<button className="btn-secondary">Reset</button>

// With loading
{isLoading && <div className="spinner"></div>}
```

## Common Edits

### Add New Field
1. Add to formData state
2. Add input element in JSX
3. Add handleChange binding
4. Add validation rule
5. Add error display

### Add New Designation
```javascript
<option value="CODE">Full Name</option>
```

### Add New Department
```javascript
<option value="Department">Department</option>
```

### Modify Validation
Edit `src/utils/validation.js` function

### Change Colors
Edit `tailwind.config.js` colors section

## React Hooks Reference

```javascript
// State
const [value, setValue] = useState(initialValue);

// Side effects
useEffect(() => {
  // Code runs on mount or dependency change
}, [dependency]);

// Load data on mount
useEffect(() => {
  const data = localStorage.getItem('key');
  // Process data
}, []);
```

## Debugging Tips

### Check Form Data
```javascript
console.log(formData);
```

### Check Errors
```javascript
console.log(errors);
```

### View LocalStorage
```javascript
console.log(localStorage.getItem('employees'));
JSON.parse(localStorage.getItem('employees'));
```

### Debug State Changes
```javascript
// Add logging in handlers
console.log('Before:', formData);
setFormData(newData);
console.log('After:', newData);
```

## Browser DevTools

### LocalStorage Tab
- Application → LocalStorage → Site URL
- Find 'employees' key
- View all saved records
- Edit/Delete as needed

### Console Errors
- F12 to open DevTools
- Check Console tab
- Look for red error messages
- Check validation errors

### React DevTools
- Install React DevTools Extension
- See component tree
- Track state changes
- Debug props

## Performance Checklist

- ✅ Validation only on submit
- ✅ Form only re-renders on change
- ✅ CSS bundled with Tailwind PurgeCSS
- ✅ No unnecessary renders
- ✅ LocalStorage for instant access
- ✅ Minified in production build

## Testing Quick Commands

### Run Test Form
```bash
npm start
# Open http://localhost:3000
# Fill form with test data
# Submit
# Check localStorage
```

### Clear Data
```javascript
// In browser console
localStorage.clear()
location.reload()
```

### View All Employees
```javascript
// In browser console
JSON.parse(localStorage.getItem('employees'))
  .forEach((emp, i) => console.log(i+1, emp.employeeName))
```

## Deployment One-Liners

### Netlify
```bash
npm run build && npm install -g netlify-cli && netlify deploy
```

### Vercel
```bash
npm run build && npm install -g vercel && vercel
```

### GitHub Pages
```bash
npm install --save-dev gh-pages && npm run deploy
```

## Important Paths

```
Project Root: /workspaces/Employee_Management
Source Code: /workspaces/Employee_Management/src
Components: /workspaces/Employee_Management/src/components
Utils: /workspaces/Employee_Management/src/utils
Public: /workspaces/Employee_Management/public
Config: /workspaces/Employee_Management/*.config.js
Docs: /workspaces/Employee_Management/*.md
```

## Key Milestones

- Form renders: Component mounts
- Data loads: useEffect on mount
- User inputs: handleChange fires
- Form submits: Validation → Save → Reset
- Success: Message shows → Auto-dismiss
- Data persists: localStorage saves

## Error Messages Map

| Error | Cause | Fix |
|-------|-------|-----|
| "name is required" | Empty field | Fill field |
| "Phone must be 10 digits" | Wrong length | Check length |
| "Invalid email format" | Bad email | Use xxx@xxx.xx |
| "Must be 18+ years old" | Too young | Select older DOB |
| "Invalid IFSC code format" | Wrong format | Check IFSC |
| "Invalid PAN format" | Wrong format | Check PAN |
| "Aadhar must be 12 digits" | Wrong length | Check digits |

## Quick Links

- Main Docs: `README.md`
- Setup Guide: `SETUP_GUIDE.md`
- Features: `FEATURES.md`
- Testing: `TESTING.md`
- Deployment: `DEPLOYMENT.md`
- Project Summary: `PROJECT_SUMMARY.md`

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Port 3000 in use | `npm start -- --port 3001` |
| CSS not loading | Restart dev server |
| Form not validating | Check validation.js |
| Data not saving | Check localStorage key |
| Build fails | `npm cache clean --force` |
| Styling wrong | Check tailwind.config.js |

## Environment Setup

```bash
# Development
npm start

# Production
npm run build
npx serve -s build

# Testing
npm test

# Clean slate
rm -rf node_modules && npm install
```

---

**Keep this handy for quick reference!** 📌

Last Updated: February 2026
