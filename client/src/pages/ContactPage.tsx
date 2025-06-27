import React, { useState } from 'react';
import Button from '../components/common/Button';

const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact Form Submitted:', { name, email, message });
    alert('Thank you for your message! We will get back to you soon. (Placeholder)');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="content-page">
      <h1>Contact Us</h1>
      <p>Have a question or need assistance? We're here to help!</p>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Your Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Your Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Your Message:</label>
          <textarea
            id="message"
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message here..."
            required
          ></textarea>
        </div>
        <Button type="submit">Send Message</Button>
      </form>
    </div>
  );
};

export default ContactPage;
