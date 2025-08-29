import React from 'react';
import { FaBell, FaCalendarAlt, FaPills, FaHandHoldingMedical, FaSearch, FaShieldAlt, FaMobileAlt, FaMapMarkedAlt, FaHeart, FaUsers } from 'react-icons/fa';
import styles from './Features.module.css';

const Features = () => {
  const features = [
    {
      icon: <FaCalendarAlt className={styles.featureIcon} />,
      title: "Expiry Tracking",
      description: "Our system automatically tracks medicine expiry dates and sends you reminders before they expire."
    },
    {
      icon: <FaBell className={styles.featureIcon} />,
      title: "Smart Notifications",
      description: "Get timely alerts for expiry dates, donation matches, and medicine availability."
    },
    {
      icon: <FaHandHoldingMedical className={styles.featureIcon} />,
      title: "Easy Donation",
      description: "Donate unused medicines with just a few clicks. We verify all donations for safety."
    },
    {
      icon: <FaPills className={styles.featureIcon} />,
      title: "Medicine Requests",
      description: "Request needed medicines from our verified inventory. Get notified when matches are found."
    },
    {
      icon: <FaSearch className={styles.featureIcon} />,
      title: "Advanced Search",
      description: "Find specific medicines using our powerful search with filters for type, dosage, and location."
    },
    {
      icon: <FaShieldAlt className={styles.featureIcon} />,
      title: "Quality Assurance",
      description: "All medicines undergo strict verification for authenticity and proper storage conditions."
    },
    {
      icon: <FaMobileAlt className={styles.featureIcon} />,
      title: "Mobile Access",
      description: "Full platform access through our mobile app with barcode scanning for quick donations."
    },
    {
      icon: <FaMapMarkedAlt className={styles.featureIcon} />,
      title: "Real-time Tracking",
      description: "Track medicine donations and requests on an interactive map in real-time."
    },
    {
      icon: <FaHeart className={styles.featureIcon} />,
      title: "Community Impact",
      description: "See how your donations directly help people in your local community."
    }
  ];

  const donationProcess = [
    {
      step: "1",
      title: "Check Your Medicines",
      description: "Look through your medicine cabinet for unused, unexpired medications in their original packaging."
    },
    {
      step: "2",
      title: "Register on Platform",
      description: "Create an account and list the medicines you wish to donate with their details."
    },
    {
      step: "3",
      title: "Get Matched",
      description: "Our system automatically matches your donation with verified requests in your area."
    },
    {
      step: "4",
      title: "Schedule Pickup",
      description: "Choose a convenient time for our verified partners to collect your donation."
    },
    {
      step: "5",
      title: "Track Impact",
      description: "Receive updates about where your donation went and who it helped."
    }
  ];

  return (
    <div className={styles.featuresPage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>Powerful Features</h1>
          <p className={styles.heroSubtitle}>
            NextMed combines smart technology with social responsibility to revolutionize medicine donation
          </p>
        </div>
      </section>

      {/* Main Features */}
      <section className={styles.featuresSection}>
        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.featureIconContainer}>
                {feature.icon}
              </div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Donation Process Section */}
      <section className={styles.processSection}>
        <h2 className={styles.sectionTitle}>Simple Donation Process</h2>
        <p className={styles.sectionSubtitle}>Donating medicines has never been easier. Here's how it works:</p>
        
        <div className={styles.processSteps}>
          {donationProcess.map((step, index) => (
            <div key={index} className={styles.processStep}>
              <div className={styles.stepNumber}>{step.step}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDescription}>{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Donate Section */}
      <section className={styles.whyDonateSection}>
        <h2 className={styles.sectionTitle}>Why Donate Your Unused Medicines?</h2>
        
        <div className={styles.benefitsGrid}>
          <div className={styles.benefitCard}>
            <h3 className={styles.benefitTitle}>Reduce Waste</h3>
            <p>Millions of dollars worth of usable medicines are discarded each year. Your donation helps reduce this waste.</p>
          </div>
          
          <div className={styles.benefitCard}>
            <h3 className={styles.benefitTitle}>Help Those in Need</h3>
            <p>Many people can't afford essential medications. Your donation could literally save a life.</p>
          </div>
          
          <div className={styles.benefitCard}>
            <h3 className={styles.benefitTitle}>Environmental Impact</h3>
            <p>Proper medicine disposal prevents harmful chemicals from entering our water supply and landfills.</p>
          </div>
          
          <div className={styles.benefitCard}>
            <h3 className={styles.benefitTitle}>Tax Benefits</h3>
            <p>In many regions, medicine donations qualify for tax deductions. Keep your receipt!</p>
          </div>
          
          <div className={styles.benefitCard}>
            <h3 className={styles.benefitTitle}>Community Health</h3>
            <p>By donating, you contribute to better health outcomes for your entire community.</p>
          </div>
          
          <div className={styles.benefitCard}>
            <h3 className={styles.benefitTitle}>Peace of Mind</h3>
            <p>Know that your unused medicines are going to help someone rather than sitting unused or being improperly disposed.</p>
          </div>
        </div>
      </section>

      {/* Accepted Medicines Section */}
      <section className={styles.acceptedSection}>
        <h2 className={styles.sectionTitle}>Medicines We Accept</h2>
        <div className={styles.medicineTypes}>
          <div className={styles.medicineType}>
            <h3>Prescription Medications</h3>
            <ul>
              <li>Antibiotics (unopened)</li>
              <li>Chronic disease medications (diabetes, hypertension, etc.)</li>
              <li>Mental health medications</li>
            </ul>
          </div>
          
          <div className={styles.medicineType}>
            <h3>Over-the-Counter</h3>
            <ul>
              <li>Pain relievers (in original packaging)</li>
              <li>Cold and flu medications</li>
              <li>Allergy medications</li>
            </ul>
          </div>
          
          <div className={styles.medicineType}>
            <h3>Medical Supplies</h3>
            <ul>
              <li>Unopened diabetic test strips</li>
              <li>Sealed wound care supplies</li>
              <li>Unused medical equipment</li>
            </ul>
          </div>
        </div>
        
        <div className={styles.noteBox}>
          <h4>Important Note:</h4>
          <p>
            We cannot accept controlled substances, expired medications, or opened packages. 
            All donations must be in their original packaging with at least 6 months remaining before expiry.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Features;