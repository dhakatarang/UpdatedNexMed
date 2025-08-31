// src/components/About.jsx
import React from "react";
import styles from "./About.module.css";

const About = () => {
  return (
    <div className={styles.aboutPage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Transforming Healthcare Through Innovation</h1>
          <p className={styles.heroSubtitle}>
            Connecting communities, reducing waste, and saving lives through responsible medicine management
          </p>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.circleAnimation}></div>
          <div className={styles.pillShape}></div>
          <div className={styles.heartbeatLine}></div>
        </div>
      </section>

      {/* Mission Section */}
      <section className={styles.missionSection}>
        <div className={styles.sectionHeader}>
          <h2>Our Mission</h2>
          <div className={styles.headerLine}></div>
        </div>
        <div className={styles.missionContent}>
          <div className={styles.missionText}>
            <p>
              At <strong>NexMed</strong>, we're revolutionizing healthcare accessibility by creating a sustainable 
              ecosystem for medicine redistribution. Our platform addresses the critical issue of 
              medicine wastage while helping communities access life-saving treatments.
            </p>
            <p>
              We believe that no medicine should go to waste when someone in need could benefit from it. 
              Through our innovative tracking and donation system, we're building bridges between donors, 
              healthcare providers, and patients.
            </p>
          </div>
          <div className={styles.missionGraphic}>
            <div className={styles.circularGraphic}>
              <div className={styles.circleItem}>
                <i className="fas fa-pills"></i>
                <span>Track</span>
              </div>
              <div className={styles.circleItem}>
                <i className="fas fa-hand-holding-heart"></i>
                <span>Donate</span>
              </div>
              <div className={styles.circleItem}>
                <i className="fas fa-heartbeat"></i>
                <span>Save Lives</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <div className={styles.sectionHeader}>
          <h2>How We Make a Difference</h2>
          <div className={styles.headerLine}></div>
        </div>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <i className="fas fa-calendar-check"></i>
            </div>
            <h3>Expiry Tracking</h3>
            <p>Smart monitoring system that alerts you before medicines expire, ensuring timely usage or donation.</p>
          </div>
          
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <i className="fas fa-hand-holding-medical"></i>
            </div>
            <h3>Secure Donations</h3>
            <p>Verified donation process that connects you with legitimate NGOs and healthcare providers.</p>
          </div>
          
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <h3>Community Mapping</h3>
            <p>Real-time tracking of medicine needs and availability across different communities.</p>
          </div>
          
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <i className="fas fa-bell"></i>
            </div>
            <h3>Smart Reminders</h3>
            <p>Customizable alerts for medicine schedules, expiry dates, and donation opportunities.</p>
          </div>
          
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <i className="fas fa-chart-line"></i>
            </div>
            <h3>Impact Analytics</h3>
            <p>Track your contribution to reducing medical waste and helping others in need.</p>
          </div>
          
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <i className="fas fa-shield-alt"></i>
            </div>
            <h3>Quality Assurance</h3>
            <p>Rigorous verification process to ensure all donated medicines meet safety standards.</p>
          </div>
        </div>
      </section>

      {/* Impact Stats Section */}
      <section className={styles.statsSection}>
        <div className={styles.statsContainer}>
          <div className={styles.statItem}>
            <h3>50,000+</h3>
            <p>Medicines Donated</p>
          </div>
          <div className={styles.statItem}>
            <h3>200+</h3>
            <p>Partner Organizations</p>
          </div>
          <div className={styles.statItem}>
            <h3>75%</h3>
            <p>Reduction in Waste</p>
          </div>
          <div className={styles.statItem}>
            <h3>10,000+</h3>
            <p>Lives Impacted</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <h2>Join Our Mission Today</h2>
        <p>Together, we can create a world where no medicine goes to waste and everyone has access to healthcare.</p>
        <div className={styles.ctaButtons}>
          <button className={styles.primaryBtn}>Start Donating</button>
          <button className={styles.secondaryBtn}>Learn More</button>
        </div>
      </section>
    </div>
  );
};

export default About;