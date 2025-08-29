// components/DonateMedicine.jsx
import { useState, useRef, useEffect } from 'react';
import styles from './DonateMedicine.module.css';


const DonateMedicine = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [extractedText, setExtractedText] = useState('');
  const [medicineData, setMedicineData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [ocrError, setOcrError] = useState('');
  const [donatedMedicines, setDonatedMedicines] = useState([]);
  const [showManualForm, setShowManualForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    manufacturer: '',
    expiry: '',
    quantity: '',
    dosage: '',
    category: ''
  });
  const fileInputRef = useRef(null);

  // Sample medicine images for display
  const medicineImages = {
    'pcm': 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGFyYWNldGFtb2x8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    'amoxicillin': 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YW1veGljaWxsaW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    'default': 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVkaWNpbmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
  };

  // Load donated medicines from localStorage on component mount
  useEffect(() => {
    const savedMedicines = JSON.parse(localStorage.getItem('donatedMedicines') || '[]');
    setDonatedMedicines(savedMedicines);
  }, []);

  // Save to localStorage whenever donatedMedicines changes
  useEffect(() => {
    localStorage.setItem('donatedMedicines', JSON.stringify(donatedMedicines));
  }, [donatedMedicines]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setExtractedText('');
      setMedicineData(null);
      setOcrError('');
      setShowManualForm(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const extractTextFromImage = async () => {
    if (!selectedImage) return;
    
    setIsLoading(true);
    setOcrError('');
    
    try {
      // Dynamically import Tesseract to avoid SSR issues
      const Tesseract = (await import('tesseract.js')).default;
      
      const result = await Tesseract.recognize(
        selectedImage,
        'eng',
        { logger: m => console.log(m) }
      );
      
      const text = result.data.text;
      setExtractedText(text);
      parseMedicineData(text);
    } catch (error) {
      console.error('OCR Error:', error);
      setOcrError('Failed to process the image. Please try again with a clearer image.');
    } finally {
      setIsLoading(false);
    }
  };

  const parseMedicineData = (text) => {
    // Convert text to lowercase for easier matching
    const lowerText = text.toLowerCase();
    
    // Regular expressions to find medicine information
    const nameMatch = text.match(/([A-Z][a-zA-Z\s]+)(?=\s*(tablet|capsule|injection|syrup|cream|ointment|mg|ml|mcg))/i);
    const mfgMatch = lowerText.match(/(mfg|manufactur(e|ing))[:\s]*([\d\/-]+)/i);
    const expMatch = lowerText.match(/(exp|expiry|exp date|expiration)[:\s]*([\d\/-]+)/i);
    const quantityMatch = text.match(/(\d+)\s*(tablets|capsules|pieces|tabs|caps|strips)/i);
    const dosageMatch = text.match(/(\d+)\s*(mg|ml|mcg|g)/i);
    
    const medicineInfo = {
      name: nameMatch ? nameMatch[0].trim() : '',
      manufacturer: mfgMatch && mfgMatch[3] ? mfgMatch[3].trim() : '',
      expiry: expMatch && expMatch[2] ? expMatch[2].trim() : '',
      quantity: quantityMatch ? `${quantityMatch[1]} ${quantityMatch[2]}` : '',
      dosage: dosageMatch ? `${dosageMatch[1]}${dosageMatch[2]}` : '',
      category: determineCategory(nameMatch ? nameMatch[0].trim().toLowerCase() : '')
    };
    
    setMedicineData(medicineInfo);
    setFormData(medicineInfo);
  };

  const determineCategory = (name) => {
    if (name.includes('paracetamol') || name.includes('pcm')) return 'pcm';
    if (name.includes('amoxicillin') || name.includes('antibiotic')) return 'antibiotic';
    if (name.includes('vitamin') || name.includes('supplement')) return 'supplement';
    return 'other';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleManualEntryToggle = () => {
    setShowManualForm(!showManualForm);
    if (!showManualForm) {
      setFormData({
        name: '',
        manufacturer: '',
        expiry: '',
        quantity: '',
        dosage: '',
        category: ''
      });
    }
  };

  const handleSaveMedicine = () => {
    const newMedicine = {
      id: Date.now(),
      ...formData,
      imageUrl: previewUrl || medicineImages[formData.category] || medicineImages.default,
      donatedDate: new Date().toISOString().split('T')[0]
    };
    
    const updatedMedicines = [...donatedMedicines, newMedicine];
    setDonatedMedicines(updatedMedicines);
    
    // Reset form
    setSelectedImage(null);
    setPreviewUrl('');
    setExtractedText('');
    setMedicineData(null);
    setShowManualForm(false);
    setFormData({
      name: '',
      manufacturer: '',
      expiry: '',
      quantity: '',
      dosage: '',
      category: ''
    });
    
    alert('Medicine saved successfully!');
  };

  const handleDonateSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    alert('Thank you for your donation! We will arrange pickup soon.');
    // Reset form
    setSelectedImage(null);
    setPreviewUrl('');
    setExtractedText('');
    setMedicineData(null);
  };

  const isExpiringSoon = (expiryDate) => {
    if (!expiryDate) return false;
    
    // Try to parse the date in different formats
    let date;
    if (expiryDate.includes('/')) {
      const parts = expiryDate.split('/');
      date = new Date(parts[2], parts[1] - 1, parts[0]);
    } else if (expiryDate.includes('-')) {
      date = new Date(expiryDate);
    } else {
      // If format is unknown, assume it's in MM/YYYY format
      const parts = expiryDate.match(/(\d{2})(\d{4})/) || expiryDate.match(/(\d{2})\/(\d{4})/);
      if (parts) {
        date = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, 1);
      } else {
        return false;
      }
    }
    
    if (isNaN(date.getTime())) return false;
    
    const twoMonthsFromNow = new Date();
    twoMonthsFromNow.setMonth(twoMonthsFromNow.getMonth() + 2);
    
    return date <= twoMonthsFromNow;
  };

  const moveToDonation = (medicine) => {
    // Remove from donated medicines
    const updatedMedicines = donatedMedicines.filter(m => m.id !== medicine.id);
    setDonatedMedicines(updatedMedicines);
    
    // Add to need medicine list (in a real app, this would be an API call)
    const needMedicines = JSON.parse(localStorage.getItem('needMedicines') || '[]');
    needMedicines.push({...medicine, neededSince: new Date().toISOString().split('T')[0]});
    localStorage.setItem('needMedicines', JSON.stringify(needMedicines));
    
    alert('Medicine moved to donation page!');
  };

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1>Donate <span className={styles.highlight}>Medicine</span></h1>
        <p>Help others by donating your unused medicines before they expire</p>
      </div>

      <div className={styles.content}>
        <div className={styles.leftPanel}>
          <div className={styles.uploadSection}>
            <h2>Upload Medicine Image</h2>
            <div className={styles.uploadArea} onClick={triggerFileInput}>
              {previewUrl ? (
                <img src={previewUrl} alt="Medicine preview" className={styles.previewImage} />
              ) : (
                <div className={styles.uploadPlaceholder}>
                  <div className={styles.uploadIcon}>📷</div>
                  <p>Click to upload a clear image of your medicine packaging</p>
                  <p className={styles.uploadTip}>Make sure the expiry date and medicine name are visible</p>
                </div>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className={styles.fileInput}
              />
            </div>
            
            {previewUrl && (
              <button 
                onClick={extractTextFromImage}
                disabled={isLoading}
                className={styles.extractButton}
              >
                {isLoading ? 'Processing...' : 'Extract Medicine Information'}
              </button>
            )}
            
            <div className={styles.manualToggle}>
              <button onClick={handleManualEntryToggle} className={styles.manualButton}>
                {showManualForm ? 'Hide Manual Entry' : 'Enter Details Manually'}
              </button>
            </div>
          </div>

          {ocrError && (
            <div className={styles.errorMessage}>
              {ocrError}
            </div>
          )}

          {(extractedText || showManualForm) && (
            <div className={styles.detailsForm}>
              <h2>Medicine Details</h2>
              
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Medicine Name *</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="manufacturer">Manufacturer</label>
                  <input 
                    type="text" 
                    id="manufacturer" 
                    name="manufacturer"
                    value={formData.manufacturer}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="expiry">Expiry Date *</label>
                  <input 
                    type="text" 
                    id="expiry" 
                    name="expiry"
                    value={formData.expiry}
                    onChange={handleInputChange}
                    placeholder="DD/MM/YYYY"
                    required 
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="quantity">Quantity *</label>
                  <input 
                    type="text" 
                    id="quantity" 
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    placeholder="e.g., 10 tablets"
                    required 
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="dosage">Dosage</label>
                  <input 
                    type="text" 
                    id="dosage" 
                    name="dosage"
                    value={formData.dosage}
                    onChange={handleInputChange}
                    placeholder="e.g., 500mg"
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="category">Category</label>
                  <select 
                    id="category" 
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Category</option>
                    <option value="pcm">Pain Relief (PCM)</option>
                    <option value="antibiotic">Antibiotic</option>
                    <option value="supplement">Vitamin/Supplement</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              
              <button 
                onClick={handleSaveMedicine} 
                disabled={!formData.name || !formData.expiry || !formData.quantity}
                className={styles.saveButton}
              >
                Save Medicine
              </button>
            </div>
          )}
        </div>
        
        <div className={styles.rightPanel}>
          <h2>Your Uploaded Medicines</h2>
          
          {donatedMedicines.length === 0 ? (
            <div className={styles.emptyState}>
            <div className={`${styles.emptyIcon} ${styles.pillBackground}`}></div> 
              <p>No medicines yet</p>
              <p>Upload a medicine to get started</p>
            </div>
          ) : (
            <div className={styles.medicineGrid}>
              {donatedMedicines.map(medicine => (
                <div 
                  key={medicine.id} 
                  className={`${styles.medicineCard} ${isExpiringSoon(medicine.expiry) ? styles.expiringSoon : ''}`}
                >
                  {isExpiringSoon(medicine.expiry) && (
                    <div className={styles.expiryWarning}>Expiring Soon!</div>
                  )}
                  
                  <div className={styles.medicineImage}>
                    <img src={medicine.imageUrl} alt={medicine.name} />
                  </div>
                  
                  <div className={styles.medicineDetails}>
                    <h3>{medicine.name}</h3>
                    <p><strong>Expiry:</strong> {medicine.expiry}</p>
                    <p><strong>Quantity:</strong> {medicine.quantity}</p>
                    {medicine.dosage && <p><strong>Dosage:</strong> {medicine.dosage}</p>}
                    <p><strong>Donated on:</strong> {medicine.donatedDate}</p>
                    
                    {isExpiringSoon(medicine.expiry) && (
                      <button 
                        onClick={() => moveToDonation(medicine)}
                        className={styles.donateButton}
                      >
                        Move to Donation Page
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      
    </div>
  );
};

export default DonateMedicine;