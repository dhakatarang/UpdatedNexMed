// src/Pages/About/About.jsx
import React from 'react';
import styles from './About.module.css';

const About = () => {
  return (
    <div className={styles.aboutContainer}>
      <section className={styles.aboutHero}>
        <div className="container">
          <h1>About NextMed</h1>
          <p className={styles.lead}>Transforming unused medicines into hope for those in need</p>
        </div>
      </section>

      <section className={styles.aboutMission}>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h2>Our Mission</h2>
              <p>NextMed is dedicated to reducing medication waste and improving healthcare access by creating a secure platform for redistributing unused medicines to those who need them most.</p>
              <p>We believe that no medicine should go to waste when it can help someone in need. Our platform ensures safe, transparent, and efficient redistribution following all regulatory guidelines.</p>
            </div>
            <div className="col-md-6">
              <div className={styles.missionStats}>
                <div className={styles.statItem}>
                  <h3>10,000+</h3>
                  <p>Medicines Tracked</p>
                </div>
                <div className={styles.statItem}>
                  <h3>2,500+</h3>
                  <p>Successful Donations</p>
                </div>
                <div className={styles.statItem}>
                  <h3>95%</h3>
                  <p>Reduction in Waste</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.aboutFeatures}>
        <div className="container">
          <h2 className="text-center">How NextMed Works</h2>
          <div className="row">
            <div className="col-md-4">
              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>
                  <i className="fas fa-pills"></i>
                </div>
                <h3>Track Medicines</h3>
                <p>Easily input and monitor your medications with expiration alerts and usage tracking.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>
                  <i className="fas fa-hand-holding-heart"></i>
                </div>
                <h3>Donate Safely</h3>
                <p>Identify unused medicines and donate them through our verified network following safety protocols.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>
                  <i className="fas fa-hands-helping"></i>
                </div>
                <h3>Receive Help</h3>
                <p>Request medicines you need that others have donated, following proper medical guidelines.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.aboutTechnology}>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h2>Advanced Medicine Tracking</h2>
              <p>Our system helps you manage your medication inventory with precision:</p>
              <ul className={styles.techList}>
                <li>Expiration date monitoring with alerts</li>
                <li>Manufacturing details and batch tracking</li>
                <li>Usage patterns and reminders</li>
                <li>Donation eligibility assessment</li>
                <li>Secure data storage and privacy protection</li>
              </ul>
            </div>
            <div className="col-md-6">
              <div className={styles.techDemo}>
                <div className={styles.medicineCard}>
                  <div className={styles.medicineHeader}>
                    <h4>Amoxicillin 500mg</h4>
                    <span className={styles.statusBadge}>Expires in 45 days</span>
                  </div>
                  <div className={styles.medicineDetails}>
                    <p><strong>Manufacturer:</strong> PharmaCorp Inc.</p>
                    <p><strong>Batch No:</strong> AMX-2024-0876</p>
                    <p><strong>MFG Date:</strong> 01/15/2024</p>
                    <p><strong>EXP Date:</strong> 01/15/2025</p>
                    <p><strong>Quantity:</strong> 20 tablets</p>
                  </div>
                  <div className={styles.medicineActions}>
                    <button className={styles.btnPrimary}>Donate</button>
                    <button className={styles.btnOutline}>Set Reminder</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.aboutSafety}>
        <div className="container">
          <h2 className="text-center">Safety & Compliance</h2>
          <div className="row">
            <div className="col-md-3">
              <div className={styles.safetyItem}>
                <div className={styles.safetyIcon}>
                  <i className="fas fa-check-circle"></i>
                </div>
                <h4>Quality Verification</h4>
                <p>All donated medicines undergo strict quality checks to ensure safety and efficacy.</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className={styles.safetyItem}>
                <div className={styles.safetyIcon}>
                  <i className="fas fa-shield-alt"></i>
                </div>
                <h4>Regulatory Compliance</h4>
                <p>We follow all applicable regulations for medicine redistribution and handling.</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className={styles.safetyItem}>
                <div className={styles.safetyIcon}>
                  <i className="fas fa-user-md"></i>
                </div>
                <h4>Professional Oversight</h4>
                <p>Healthcare professionals review all donations and requests to ensure appropriateness.</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className={styles.safetyItem}>
                <div className={styles.safetyIcon}>
                  <i className="fas fa-lock"></i>
                </div>
                <h4>Data Security</h4>
                <p>Your personal and medical information is protected with industry-standard security measures.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.aboutCta}>
        <div className="container text-center">
          <h2>Join the NextMed Community</h2>
          <p>Be part of the solution to reduce medication waste and help those in need</p>
          <div className={styles.ctaButtons}>
            <button className={styles.btnPrimaryLg}>Start Donating</button>
            <button className={styles.btnOutlineLightLg}>Learn More</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;