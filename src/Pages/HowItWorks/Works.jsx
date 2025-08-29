// components/Works.jsx
import { useState } from 'react';
import styles from './Works.module.css';

// Import all images consistently
import snapPhotoImg from "../../assets/snap-photo.png";
import textExtractionImg from "../../assets/text-extraction.png";
import expiryTrackingImg from "../../assets/expiry-tracking.png";
import donateOptionImg from "../../assets/donate-option.png";
import schedulePickupImg from "../../assets/schedule-pickup.png";
import checkmarkImg from "../../assets/checkmark.png";
import recycleImg from "../../assets/recycle.png";
import communityImg from "../../assets/community.png";

const Works = () => {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      id: 1,
      title: "Snap a Photo",
      description: "Take a clear picture of your medicine label showing name and expiry date",
      image: snapPhotoImg,
      graphic: "camera"
    },
    {
      id: 2,
      title: "Text Extraction",
      description: "Our OCR technology extracts details from your medicine photo",
      image: textExtractionImg,
      graphic: "ocr"
    },
    {
      id: 3,
      title: "Expiry Tracking",
      description: "We track expiry dates and notify you 2 months in advance",
      image: expiryTrackingImg,
      graphic: "tracking"
    },
    {
      id: 4,
      title: "Donate Option",
      description: "Easily donate soon-to-expire medicines to verified NGOs",
      image: donateOptionImg,
      graphic: "donate"
    },
    {
      id: 5,
      title: "Schedule Pickup",
      description: "Request collection and we'll deliver to organizations in need",
      image: schedulePickupImg,
      graphic: "delivery"
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1>How <span className={styles.highlight}>NexMed</span> Works</h1>
        <p>Your simple solution to manage medicine expiry dates and donate unused medications</p>
      </div>
      
      <div className={styles.roadmap}>
        <div className={styles.roadmapLine}></div>
        
        {steps.map((step, index) => (
          <div 
            key={step.id} 
            className={`${styles.roadmapStep} ${activeStep === step.id ? styles.active : ''}`}
            onClick={() => setActiveStep(step.id)}
          >
            <div className={styles.stepMarker}>
              <div className={styles.stepNumber}>{step.id}</div>
            </div>
            
            <div className={styles.stepContent}>
              <div className={styles.stepImage}>
                <img src={step.image} alt={step.title} />
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className={styles.benefits}>
        <h2>Why Use <span className={styles.highlight}>NexMed</span>?</h2>
        <div className={styles.benefitsGrid}>
          <div className={styles.benefitCard}>
            <div className={styles.benefitIcon}>
              <img src={checkmarkImg} alt="Checkmark" />
            </div>
            <h3>Never Miss Expiry Dates</h3>
            <p>Get smart alerts before your medicines expire</p>
          </div>
          <div className={styles.benefitCard}>
            <div className={styles.benefitIcon}>
              <img src={recycleImg} alt="Recycle" />
            </div>
            <h3>Reduce Medical Waste</h3>
            <p>Donate instead of discarding unused medicines</p>
          </div>
          <div className={styles.benefitCard}>
            <div className={styles.benefitIcon}>
              <img src={communityImg} alt="Community" />
            </div>
            <h3>Help Your Community</h3>
            <p>Your donations provide essential medication to those in need</p>
          </div>
        </div>
      </div>
      
      <div className={styles.cta}>
        <h2>Ready to get started?</h2>
        <p>Join thousands who are managing their medicines smarter with NexMed</p>
        <button className={styles.ctaButton}>Download the App</button>
      </div>
    </div>
  );
};

export default Works;