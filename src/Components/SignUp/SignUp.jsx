import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './SignUp.module.css';

function SignUp() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('donor');
  const [currentStep, setCurrentStep] = useState(1);
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);
  
  const [formData, setFormData] = useState({
    // Basic Info
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    otp: '',
    
    // Address
    address: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    
    // Professional Info
    medicalLicense: '',
    specialization: '',
    licenseProof: null,
    licenseExpiry: '',
    
    // Organization Info
    organizationName: '',
    registrationNumber: '',
    contactPerson: '',
    website: '',
    taxExemptStatus: false,
    orgProof: null,
    
    // Terms
    terms: false
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    let interval;
    if (timer > 0 && otpSent) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer, otpSent]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'file') {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validatePhoneWithLicense = () => {
    if (userType === 'donor') {
      if (formData.medicalLicense && !formData.medicalLicense.includes(formData.phone)) {
        return 'Phone number must match the registered number in your medical license';
      }
    } else {
      if (formData.registrationNumber && !formData.registrationNumber.includes(formData.phone)) {
        return 'Phone number must match the registered number of your organization';
      }
    }
    return '';
  };

  const validateStep = (step) => {
    const newErrors = {};
    const phoneLicenseError = validatePhoneWithLicense();
    
    if (phoneLicenseError) {
      newErrors.phone = phoneLicenseError;
    }
    
    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Name is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone is required';
      } else if (!/^\d{10,15}$/.test(formData.phone)) {
        newErrors.phone = 'Phone is invalid (10-15 digits)';
      }
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      if (!formData.terms) {
        newErrors.terms = 'You must accept the terms';
      }
    }
    
    if (step === 2 && userType === 'donor') {
      if (!formData.address.trim()) newErrors.address = 'Address is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.state.trim()) newErrors.state = 'State is required';
      if (!formData.medicalLicense.trim()) newErrors.medicalLicense = 'Medical license is required';
      if (!formData.specialization.trim()) newErrors.specialization = 'Specialization is required';
      if (!formData.licenseProof) newErrors.licenseProof = 'License proof is required';
      if (!formData.licenseExpiry) newErrors.licenseExpiry = 'License expiry date is required';
    }
    
    if (step === 2 && userType === 'ngo') {
      if (!formData.organizationName.trim()) newErrors.organizationName = 'Organization name is required';
      if (!formData.registrationNumber.trim()) newErrors.registrationNumber = 'Registration number is required';
      if (!formData.address.trim()) newErrors.address = 'Address is required';
      if (!formData.orgProof) newErrors.orgProof = 'Organization proof is required';
    }
    
    if (step === 3 && !formData.otp) {
      newErrors.otp = 'OTP is required';
    } else if (step === 3 && !/^\d{6}$/.test(formData.otp)) {
      newErrors.otp = 'OTP must be 6 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOtp = async () => {
    if (!validateStep(1)) return;
    
    const phoneLicenseError = validatePhoneWithLicense();
    if (phoneLicenseError) {
      setErrors(prev => ({ ...prev, phone: phoneLicenseError }));
      return;
    }
    
    // Simulate OTP sending
    console.log('OTP sent to', formData.email, formData.phone);
    setOtpSent(true);
    setTimer(120);
    setCurrentStep(3);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) return;
    
    const phoneLicenseError = validatePhoneWithLicense();
    if (phoneLicenseError) {
      setErrors(prev => ({ ...prev, phone: phoneLicenseError }));
      return;
    }
    
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
      return;
    }
    
    // Verify phone matches license/registration
    if (userType === 'donor' && !formData.medicalLicense.includes(formData.phone)) {
      setErrors({ submit: 'Phone number must match your medical license records' });
      return;
    }
    
    if (userType === 'ngo' && !formData.registrationNumber.includes(formData.phone)) {
      setErrors({ submit: 'Phone number must match your organization registration records' });
      return;
    }
    
    // Final submission
    const submissionData = new FormData();
    for (const key in formData) {
      if (formData[key] !== null) {
        submissionData.append(key, formData[key]);
      }
    }
    
    try {
      // Simulate API call
      console.log('Submitting:', Object.fromEntries(submissionData));
      navigate('/verification-pending', { state: { email: formData.email } });
    } catch (error) {
      console.error('Signup failed:', error);
      setErrors({ submit: 'Signup failed. Please try again.' });
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <div className={styles.formGroup}>
              <label htmlFor="name">{userType === 'donor' ? 'Full Name*' : 'Contact Person Name*'}</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <span className={styles.error}>{errors.name}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Email*</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span className={styles.error}>{errors.email}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="phone">Phone Number*</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Must match your license/registration number"
              />
              {errors.phone && <span className={styles.error}>{errors.phone}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">Password*</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                minLength="8"
              />
              {errors.password && <span className={styles.error}>{errors.password}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword">Confirm Password*</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && <span className={styles.error}>{errors.confirmPassword}</span>}
            </div>

            <div className={`${styles.formGroup} ${styles.checkboxGroup}`}>
              <input
                type="checkbox"
                id="terms"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
              />
              <label htmlFor="terms">
                I agree to the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>*
              </label>
              {errors.terms && <span className={styles.error}>{errors.terms}</span>}
            </div>

            <button 
              type="button" 
              className={styles.nextBtn}
              onClick={handleSendOtp}
            >
              Verify Email/Phone
            </button>
          </>
        );
      
      case 2:
        return userType === 'donor' ? (
          <>
            <h3 className={styles.sectionTitle}>Professional Information</h3>
            
            <div className={styles.formGroup}>
              <label htmlFor="address">Address*</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
              {errors.address && <span className={styles.error}>{errors.address}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="city">City*</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
              {errors.city && <span className={styles.error}>{errors.city}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="state">State/Province*</label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
              {errors.state && <span className={styles.error}>{errors.state}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="medicalLicense">Medical License Number*</label>
              <input
                type="text"
                id="medicalLicense"
                name="medicalLicense"
                value={formData.medicalLicense}
                onChange={handleChange}
                placeholder="Must include your registered phone number"
              />
              {errors.medicalLicense && <span className={styles.error}>{errors.medicalLicense}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="specialization">Specialization/Profession*</label>
              <input
                type="text"
                id="specialization"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
              />
              {errors.specialization && <span className={styles.error}>{errors.specialization}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="licenseProof">Upload License Proof* (PDF/Image)</label>
              <input
                type="file"
                id="licenseProof"
                name="licenseProof"
                onChange={handleChange}
                accept=".pdf,.jpg,.jpeg,.png"
              />
              {errors.licenseProof && <span className={styles.error}>{errors.licenseProof}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="licenseExpiry">License Expiry Date*</label>
              <input
                type="date"
                id="licenseExpiry"
                name="licenseExpiry"
                value={formData.licenseExpiry}
                onChange={handleChange}
              />
              {errors.licenseExpiry && <span className={styles.error}>{errors.licenseExpiry}</span>}
            </div>

            <div className={styles.buttonGroup}>
              <button 
                type="button" 
                className={styles.backBtn}
                onClick={() => setCurrentStep(1)}
              >
                Back
              </button>
              <button 
                type="button" 
                className={styles.nextBtn}
                onClick={() => validateStep(2) && setCurrentStep(3)}
              >
                Continue to Verification
              </button>
            </div>
          </>
        ) : (
          <>
            <h3 className={styles.sectionTitle}>Organization Information</h3>
            
            <div className={styles.formGroup}>
              <label htmlFor="organizationName">Organization Name*</label>
              <input
                type="text"
                id="organizationName"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleChange}
              />
              {errors.organizationName && <span className={styles.error}>{errors.organizationName}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="registrationNumber">Registration Number*</label>
              <input
                type="text"
                id="registrationNumber"
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleChange}
                placeholder="Must include your registered phone number"
              />
              {errors.registrationNumber && <span className={styles.error}>{errors.registrationNumber}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="contactPerson">Contact Person*</label>
              <input
                type="text"
                id="contactPerson"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="website">Website URL</label>
              <input
                type="url"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="address">Organization Address*</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
              {errors.address && <span className={styles.error}>{errors.address}</span>}
            </div>

            <div className={`${styles.formGroup} ${styles.checkboxGroup}`}>
              <input
                type="checkbox"
                id="taxExemptStatus"
                name="taxExemptStatus"
                checked={formData.taxExemptStatus}
                onChange={handleChange}
              />
              <label htmlFor="taxExemptStatus">Tax-exempt organization (501(c)(3) or equivalent)</label>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="orgProof">Upload Organization Proof* (Registration Certificate)</label>
              <input
                type="file"
                id="orgProof"
                name="orgProof"
                onChange={handleChange}
                accept=".pdf,.jpg,.jpeg,.png"
              />
              {errors.orgProof && <span className={styles.error}>{errors.orgProof}</span>}
            </div>

            <div className={styles.buttonGroup}>
              <button 
                type="button" 
                className={styles.backBtn}
                onClick={() => setCurrentStep(1)}
              >
                Back
              </button>
              <button 
                type="button" 
                className={styles.nextBtn}
                onClick={() => validateStep(2) && setCurrentStep(3)}
              >
                Continue to Verification
              </button>
            </div>
          </>
        );
      
      case 3:
        return (
          <>
            <div className={styles.otpContainer}>
              <h3>Verify Your Email/Phone</h3>
              <p>We've sent a 6-digit code to {formData.email} and {formData.phone}</p>
              
              <div className={styles.formGroup}>
                <label htmlFor="otp">Enter OTP*</label>
                <input
                  type="text"
                  id="otp"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  maxLength="6"
                  pattern="\d{6}"
                  placeholder="123456"
                />
                {errors.otp && <span className={styles.error}>{errors.otp}</span>}
              </div>
              
              <div className={styles.otpActions}>
                {timer > 0 ? (
                  <span className={styles.otpTimer}>Resend OTP in {timer} seconds</span>
                ) : (
                  <button 
                    type="button" 
                    className={styles.resendBtn}
                    onClick={handleSendOtp}
                  >
                    Resend OTP
                  </button>
                )}
              </div>
            </div>

            <div className={styles.buttonGroup}>
              <button 
                type="button" 
                className={styles.backBtn}
                onClick={() => setCurrentStep(2)}
              >
                Back
              </button>
              <button 
                type="submit" 
                className={styles.submitBtn}
              >
                Complete Registration
              </button>
            </div>
          </>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.signupHeader}>
        <h2>Create Your NextMed Account</h2>
        <p>Join us in making healthcare accessible to all</p>
        
        <div className={styles.progressSteps}>
          <div className={`${styles.step} ${currentStep >= 1 ? styles.active : ''}`}>
            <span>1</span>
            <p>Basic Info</p>
          </div>
          <div className={`${styles.step} ${currentStep >= 2 ? styles.active : ''}`}>
            <span>2</span>
            <p>{userType === 'donor' ? 'Professional Info' : 'Organization Info'}</p>
          </div>
          <div className={`${styles.step} ${currentStep >= 3 ? styles.active : ''}`}>
            <span>3</span>
            <p>Verification</p>
          </div>
        </div>
      </div>

      <div className={styles.userTypeSelector}>
        <button
          className={`${styles.typeBtn} ${userType === 'donor' ? styles.active : ''}`}
          onClick={() => setUserType('donor')}
          disabled={currentStep > 1}
        >
          I'm a Medicine Donor
        </button>
        <button
          className={`${styles.typeBtn} ${userType === 'ngo' ? styles.active : ''}`}
          onClick={() => setUserType('ngo')}
          disabled={currentStep > 1}
        >
          I'm an NGO/Organization
        </button>
      </div>

      <form onSubmit={handleSubmit} className={styles.signupForm}>
        {renderStep()}
      </form>

      <div className={styles.loginLink}>
        Already have an account? <Link to="/login">Log in</Link>
      </div>
      
      {errors.submit && <div className={styles.submitError}>{errors.submit}</div>}
    </div>
  );
}

export default SignUp;