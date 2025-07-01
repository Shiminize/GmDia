import React from 'react';
import './Page.css';

const ContactPage: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
  };

  return (
    <div className="content-page">
      <div className="container">
      <h1>Contact Us</h1>
        
        <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required />
          </div>

        <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
        </div>

        <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input type="text" id="subject" name="subject" required />
        </div>

        <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows={6} required></textarea>
          </div>

          <div className="btn-container">
            <button type="submit" className="btn">Send Message</button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default ContactPage;
