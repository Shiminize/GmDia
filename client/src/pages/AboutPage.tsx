import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-ivory to-champagne py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-light text-graphite text-left mb-16 font-primary tracking-tight">
          About Us
        </h1>

        <div className="space-y-20">
          {/* Intro Section */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-sm border border-champagne/30">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <p className="text-lg text-graphite/90 leading-relaxed mb-6 font-secondary text-left">
                  Welcome to Facet & Co., where modern alchemy meets personal radiance. We are dedicated to crafting exquisite, custom lab-grown diamond jewelry that tells your unique story.
                </p>
                <p className="text-lg text-graphite/90 leading-relaxed font-secondary text-left">
                  Our vision is to create an intuitive, visually stunning, and highly personal digital experience that empowers you to design and purchase ethically-sourced, high-quality lab diamond jewelry that reflects your unique identity and story.
                </p>
              </div>
              <div className="order-1 md:order-2">
                <img 
                  src="/Band-1.png" 
                  alt="Facet & Co. Craftsmanship" 
                  className="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                />
              </div>
            </div>
          </div>

          {/* Mission Section */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-sm border border-champagne/30">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <img 
                  src="/Ring-1.png" 
                  alt="Our Mission" 
                  className="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                />
              </div>
              <div className="order-1 md:order-2">
                <h2 className="text-3xl md:text-4xl font-normal text-graphite mb-6 text-left font-primary">
                  Our Mission
                </h2>
                <p className="text-lg text-graphite/90 leading-relaxed font-secondary text-left">
                  To provide accessible, sustainable, and personalized luxury jewelry, ensuring every piece is as unique as the individual who wears it.
                </p>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-sm border border-champagne/30">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <h2 className="text-3xl md:text-4xl font-normal text-graphite mb-6 text-left font-primary">
                  Our Values
                </h2>
                <ul className="space-y-3 text-lg text-graphite/90 font-secondary">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-lavender rounded-full mr-3 flex-shrink-0"></span>
                    Authenticity & Transparency
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-lavender rounded-full mr-3 flex-shrink-0"></span>
                    Sustainability & Ethical Sourcing
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-lavender rounded-full mr-3 flex-shrink-0"></span>
                    Quality Craftsmanship
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-lavender rounded-full mr-3 flex-shrink-0"></span>
                    Customer Empowerment
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-lavender rounded-full mr-3 flex-shrink-0"></span>
                    Innovation & Design
                  </li>
                </ul>
              </div>
              <div className="order-1 md:order-2">
                <img 
                  src="/Ring-2.png" 
                  alt="Our Values" 
                  className="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
