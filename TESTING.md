# 🧪 Testing Guide

## Manual Testing Scenarios

### Scenario 1: Valid Form Submission

**Steps:**
1. Fill all fields with valid data
2. Click Submit button
3. Observe loading animation
4. Check success message appears
5. Verify form resets
6. Check saved employee count increases

**Expected Result:**
- ✅ Form validates successfully
- ✅ Success message displayed
- ✅ Form data cleared
- ✅ Employee count updated

### Scenario 2: Empty Form Submission

**Steps:**
1. Click Submit without filling any field
2. Observe error messages

**Expected Result:**
- ❌ All fields show "required" errors
- ❌ Form does not submit

### Scenario 3: Phone Number Validation

**Invalid Inputs:**
- "123" (less than 10 digits)
- "12345678901" (more than 10 digits)
- "123abc5678" (contains letters)
- "123-456-7890" (contains special chars)

**Valid Input:**
- "9876543210" (exactly 10 digits)

**Test Instructions:**
1. Enter invalid phone in "Phone Number" field
2. Click Submit
3. Should show "Phone number must be 10 digits" error

### Scenario 4: Email Validation

**Invalid Emails:**
- "invalidemail"
- "email@"
- "@example.com"
- "email space@example.com"

**Valid Emails:**
- "john@example.com"
- "user.name@domain.co.in"

**Test Instructions:**
1. Enter invalid email in "Email Address" field
2. Click Submit
3. Should show "Invalid email format" error

### Scenario 5: Date of Birth Validation

**Invalid DOB (Minor):**
- Set DOB to 2020-01-01 (less than 18 years)
- Click Submit
- Should show "Employee must be at least 18 years old" error

**Valid DOB:**
- Set DOB to 1995-05-20 (at least 18 years old)
- Should pass validation

### Scenario 6: Bank Account Number

**Invalid Accounts:**
- "12345" (less than 9 digits)
- "123456789012345678901" (more than 18 digits)
- "12345-ABC" (contains letters)

**Valid Accounts:**
- "123456789" (9 digits)
- "123456789012345678" (18 digits)

### Scenario 7: IFSC Code

**Invalid Codes:**
- "sbin0001234" (lowercase - should auto-convert)
- "SBIN12341234" (wrong format)
- "SBI" (too short)

**Valid Code:**
- "SBIN0001234" (11 characters, format: XXXX0XXXXXX)
- After entering "sbin0001234", should display as "SBIN0001234"

### Scenario 8: PAN Number

**Invalid PANs:**
- "abcde12345" (lowercase)
- "ABCDE123456" (wrong length)
- "ABCDE123@F" (special characters)

**Valid PAN:**
- "ABCDE1234F" (uppercase, format: XXXXX0000X)
- After entering "abcde1234f", should display as "ABCDE1234F"

### Scenario 9: Aadhar Number

**Invalid Aadhar:**
- "123456789" (less than 12 digits)
- "1234567890123" (more than 12 digits)
- "123456789ABC" (contains letters)

**Valid Aadhar:**
- "123456789012" (exactly 12 digits)

### Scenario 10: Error Message Clearing

**Steps:**
1. Submit form without filling anything
2. See error messages
3. Start typing in any field
4. Error message for that field should clear

**Expected Result:**
- ✅ Errors clear on user input
- ✅ Other field errors remain until fixed

### Scenario 11: Form Reset

**Steps:**
1. Fill some form data
2. Click Reset button
3. Check all fields are cleared

**Expected Result:**
- ✅ All input fields empty
- ✅ Designation reset to "ASM"
- ✅ Department reset to "Sales"
- ✅ Error messages cleared

### Scenario 12: LocalStorage Persistence

**Steps:**
1. Fill and submit form with valid data
2. Close browser or navigate away
3. Return to the page
4. Open Browser DevTools → Application → LocalStorage
5. Look for 'employees' key

**Expected Result:**
- ✅ Data persists across sessions
- ✅ Employee count remains same
- ✅ Previously submitted data visible in DevTools

### Scenario 13: Mobile Responsiveness

**Test on Different Sizes:**
- Mobile (375px width)
- Tablet (768px width)
- Desktop (1024px+ width)

**Expected Results:**
- ✅ Single column on mobile
- ✅ Two columns on tablet
- ✅ Proper button sizing
- ✅ Readable text sizes
- ✅ All inputs accessible
- ✅ Form centered properly

### Scenario 14: Dropdown Functionality

**Designation Dropdown:**
- Should show all 7 options
- Default value: "ASM"
- Can select any option

**Department Dropdown:**
- Should show all 7 options
- Default value: "Sales"
- Can select any option

### Scenario 15: Success Message Auto-Dismiss

**Steps:**
1. Submit valid form
2. See success message
3. Wait 5 seconds
4. Message should auto-hide

**Expected Result:**
- ✅ Green success banner visible
- ✅ Auto-dismisses after 5 seconds

### Scenario 16: Multiple Submissions

**Steps:**
1. Submit form 1 with employee A
2. Submit form 2 with employee B
3. Check saved employee count

**Expected Result:**
- ✅ Count shows 2 employees
- ✅ Both records saved in localStorage

### Scenario 17: Special Character Handling

**Test Fields:**
- Name: "John O'Brien" (should pass)
- Address: "Apt #123, Street & Avenue" (should pass)
- Bank Name: "HDFC Bank Ltd." (should pass)

### Scenario 18: Keyboard Navigation

**Test:**
1. Tab through all form fields
2. Use Shift+Tab to go backward
3. Submit with Enter key
4. Reset with appropriate keyboard action

**Expected:**
- ✅ All fields accessible via keyboard
- ✅ Tab order logical
- ✅ Focus visible on all inputs

### Scenario 19: Long Input Handling

**Test:**
- Name: 100+ characters (should accept or truncate)
- Address: Very long multi-line text (should accept)

### Scenario 20: Boundary Testing

**Phone:** Test with exactly 10 digits vs 9/11 digits
**Aadhar:** Test with exactly 12 digits vs 11/13 digits
**Bank Account:** Test with 9, 18, 8, and 19 digit numbers

## Automated Testing Commands

### Run Tests (if Jest configured)
```bash
npm test
```

### Build for Testing
```bash
npm run build
```

## Browser Compatibility Testing

Test on:
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Chrome Mobile
- ✅ Safari Mobile

## Performance Testing

### Check in DevTools:
1. Lighthouse performance audit
2. Network tab for CSS/JS loading
3. Performance tab for rendering
4. Memory usage

### Expected Performance:
- Page load < 2 seconds
- Form interaction smooth
- No layout shifts
- CSS properly bundled

## Accessibility Testing

### WAVE Browser Extension:
1. Run WAVE on page
2. Check for accessibility errors
3. Fix any color contrast issues

### Keyboard Testing:
- Tab through all interactive elements
- Use all form features with keyboard only

### Screen Reader Testing:
- Test with screen reader software
- Labels properly associated with inputs

## Debugging Tips

### Check Form Data
```javascript
// In browser console:
localStorage.getItem('employees')
JSON.parse(localStorage.getItem('employees'))
```

### Clear All Data
```javascript
// In browser console:
localStorage.clear()
localStorage.removeItem('employees')
```

### Monitor State Changes
- Open React DevTools (Chrome extension)
- Track state changes in real-time
- Check prop values

## Test Data Sets

### Valid Complete Form
```
Name: Raj Kumar Sharma
Phone: 9876543210
Email: raj.sharma@company.com
DOB: 1990-03-15
Address: 456 Tech Park, Bangalore, India
Designation: SM
Department: IT
DOJ: 2023-07-01
Bank: HDFC Bank
Account: 123456789012
IFSC: HDFC0001234
PAN: ABCDE1234F
Aadhar: 987654321098
Emergency Name: Priya Sharma
Relationship: Spouse
Emergency Phone: 9876543211
```

### Minimum Valid Form
```
Name: A
Phone: 1234567890
Email: a@b.co
DOB: 2005-01-01 (must be 18+)
Address: A
Designation: ASM
Department: Sales
DOJ: 2023-01-01
Bank: B
Account: 123456789
IFSC: ABCD0123456
PAN: ABCDE1234F
Aadhar: 111111111111
Emergency Name: C
Relationship: D
Emergency Phone: 1234567891
```

## Issue Reporting Format

When reporting bugs:
```
**Environment:**
- Browser: Chrome v120
- OS: Windows 10
- Screen size: 1920x1080

**Steps to Reproduce:**
1. Fill form with...
2. Click...
3. Expected...
4. Actual...

**Screenshot/Video:**
[Attach if possible]
```

---

**Last Updated**: February 2026  
**Test Coverage**: Comprehensive Manual Testing Guide
