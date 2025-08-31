// src/components/Contact.jsx
import React, { useState } from "react";
import styles from "./Contact.module.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log("Form submitted:", formData);
    alert("Thank you for your message. We'll get back to you soon!");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  return (
    <div className={styles.contactPage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Get in Touch</h1>
          <p className={styles.heroSubtitle}>
            Have questions about medicine donation or need assistance? 
            Our team is here to help you make a difference.
          </p>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.communicationGraphic}></div>
        </div>
      </section>

      {/* Contact Methods Section */}
      <section className={styles.contactMethods}>
        <div className={styles.sectionHeader}>
          <h2>Contact Methods</h2>
          <div className={styles.headerLine}></div>
        </div>
        <div className={styles.methodsGrid}>
          <div className={styles.methodCard}>
            <div className={styles.methodIcon}>
              <i className="fas fa-envelope"></i>
            </div>
            <h3>Email Us</h3>
            <p>Send us a message anytime</p>
            <a href="mailto:info@nexmed.org">info@nexmed.org</a>
          </div>
          
          <div className={styles.methodCard}>
            <div className={styles.methodIcon}>
              <i className="fas fa-phone-alt"></i>
            </div>
            <h3>Call Us</h3>
            <p>Mon-Fri from 9am to 5pm</p>
            <a href="tel:+18005551234">+1 (800) 555-1234</a>
          </div>
          
          <div className={styles.methodCard}>
            <div className={styles.methodIcon}>
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <h3>Visit Us</h3>
            <p>Our headquarters</p>
            <address>123 Healthcare Ave, Medical District, CA 90210</address>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className={styles.contactFormSection}>
        <div className={styles.formContainer}>
          <div className={styles.formIntro}>
            <h2>Send us a Message</h2>
            <p>
              Have questions about donating medicine, need assistance with our platform, 
              or want to partner with us? Fill out the form below and our team will 
              get back to you within 24 hours.
            </p>
          </div>
          
          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="subject">Subject *</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            
            <button type="submit" className={styles.submitButton}>
              Send Message
            </button>
          </form>
        </div>
        
        <div className={styles.formGraphic}>
          <div className={styles.supportIllustration}></div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.faqSection}>
        <div className={styles.sectionHeader}>
          <h2>Frequently Asked Questions</h2>
          <div className={styles.headerLine}></div>
        </div>
        
        <div className={styles.faqGrid}>
          <div className={styles.faqItem}>
            <h3>What types of medicines can I donate?</h3>
            <p>
              We accept most non-expired, unopened prescription and over-the-counter 
              medications. Controlled substances and narcotics cannot be accepted 
              due to regulations.
            </p>
          </div>
          
          <div className={styles.faqItem}>
            <h3>How do I schedule a medicine pickup?</h3>
            <p>
              Once you've registered on our platform and listed your medicines for donation, 
              our system will help you schedule a pickup with one of our verified partners 
              in your area.
            </p>
          </div>
          
          <div className={styles.faqItem}>
            <h3>Are donations tax deductible?</h3>
            <p>
              Yes, NexMed is a registered 501(c)(3) nonprofit organization. All donations 
              are tax deductible to the extent allowed by law. We provide receipts for 
              all donations.
            </p>
          </div>
          
          <div className={styles.faqItem}>
            <h3>How can my organization partner with NexMed?</h3>
            <p>
              We're always looking for healthcare providers, pharmacies, and NGOs to partner with. 
              Please use the contact form and select "Partnership Inquiry" as your subject.
            </p>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className={styles.mapSection}>
        <h2>Find Us Here</h2>
        <div className={styles.mapContainer}>
          <div className={styles.mapPlaceholder}>
            <i className="fas fa-map-marked-alt"></i>
            <p>Interactive Map Would Appear Here</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
