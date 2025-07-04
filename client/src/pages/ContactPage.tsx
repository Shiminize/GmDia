import React from 'react';

const ContactPage: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ivory to-champagne py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-light text-graphite text-center mb-8 font-primary tracking-tight">
          Contact Us
        </h1>
        
        <p className="text-lg text-graphite/90 leading-relaxed text-center mb-12 max-w-2xl mx-auto font-secondary">
          We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>

        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-sm border border-champagne/30">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-graphite mb-2 uppercase tracking-wide font-secondary">
                Name
              </label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                required 
                className="w-full px-4 py-3 border-2 border-champagne rounded-lg bg-white text-graphite font-secondary text-base transition-all duration-300 focus:outline-none focus:border-lavender focus:ring-2 focus:ring-lavender/20"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-graphite mb-2 uppercase tracking-wide font-secondary">
                Email
              </label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                required 
                className="w-full px-4 py-3 border-2 border-champagne rounded-lg bg-white text-graphite font-secondary text-base transition-all duration-300 focus:outline-none focus:border-lavender focus:ring-2 focus:ring-lavender/20"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-graphite mb-2 uppercase tracking-wide font-secondary">
                Subject
              </label>
              <input 
                type="text" 
                id="subject" 
                name="subject" 
                required 
                className="w-full px-4 py-3 border-2 border-champagne rounded-lg bg-white text-graphite font-secondary text-base transition-all duration-300 focus:outline-none focus:border-lavender focus:ring-2 focus:ring-lavender/20"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-graphite mb-2 uppercase tracking-wide font-secondary">
                Message
              </label>
              <textarea 
                id="message" 
                name="message" 
                rows={6} 
                required
                className="w-full px-4 py-3 border-2 border-champagne rounded-lg bg-white text-graphite font-secondary text-base transition-all duration-300 focus:outline-none focus:border-lavender focus:ring-2 focus:ring-lavender/20 resize-vertical"
              ></textarea>
            </div>

            <div className="text-center pt-4">
              <button 
                type="submit" 
                className="px-8 py-3 bg-secondary text-secondary-foreground rounded-full font-secondary font-semibold text-base uppercase tracking-wide transition-all duration-300 hover:bg-secondary/90 hover:transform hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-lavender/50"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
