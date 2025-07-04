import React from 'react';

const LabDiamondEducationPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-ivory to-champagne py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-sm border border-champagne/30">
          <h1 className="text-4xl md:text-5xl font-light text-graphite text-left mb-12 font-primary tracking-tight">
            Lab Diamond Education
          </h1>
          
          <div className="space-y-8">
            <p className="text-lg text-graphite/90 leading-relaxed text-left font-secondary">
              Lab-grown diamonds are real diamonds, identical to mined diamonds in every way – physically, chemically, and optically. The only difference is their origin.
            </p>
            
            <div className="bg-champagne/10 rounded-xl p-6">
              <h2 className="text-2xl md:text-3xl font-normal text-graphite mb-6 font-primary text-left">
                How Lab Diamonds Are Made
              </h2>
              <p className="text-lg text-graphite/90 leading-relaxed mb-6 font-secondary text-left">
                Lab-grown diamonds are created using advanced technological processes that replicate the conditions under which natural diamonds develop in the Earth's crust. The two primary methods are:
              </p>
              <ul className="space-y-4 max-w-3xl mx-auto">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-lavender rounded-full mt-3 mr-4 flex-shrink-0"></span>
                  <div>
                    <strong className="text-graphite font-secondary">High Pressure-High Temperature (HPHT):</strong>
                    <span className="text-graphite/90 font-secondary"> This method mimics the natural diamond growth process by subjecting carbon material to extreme heat and pressure.</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-lavender rounded-full mt-3 mr-4 flex-shrink-0"></span>
                  <div>
                    <strong className="text-graphite font-secondary">Chemical Vapor Deposition (CVD):</strong>
                    <span className="text-graphite/90 font-secondary"> This process involves placing a diamond seed in a sealed chamber and introducing carbon-rich gases. Under high temperatures, the gases ionize into plasma, and carbon atoms attach to the diamond seed, layer by layer.</span>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-sage/10 rounded-xl p-6">
              <h2 className="text-2xl md:text-3xl font-normal text-graphite mb-6 font-primary text-left">
                Benefits of Lab Diamonds
              </h2>
              <ul className="space-y-4 max-w-3xl mx-auto">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-lavender rounded-full mt-3 mr-4 flex-shrink-0"></span>
                  <div>
                    <strong className="text-graphite font-secondary">Ethical Sourcing:</strong>
                    <span className="text-graphite/90 font-secondary"> Guaranteed conflict-free, as their origin is known and controlled.</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-lavender rounded-full mt-3 mr-4 flex-shrink-0"></span>
                  <div>
                    <strong className="text-graphite font-secondary">Environmental Impact:</strong>
                    <span className="text-graphite/90 font-secondary"> Significantly less environmental disruption compared to traditional mining.</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-lavender rounded-full mt-3 mr-4 flex-shrink-0"></span>
                  <div>
                    <strong className="text-graphite font-secondary">Value:</strong>
                    <span className="text-graphite/90 font-secondary"> Often more affordable than mined diamonds of comparable quality and size.</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-lavender rounded-full mt-3 mr-4 flex-shrink-0"></span>
                  <div>
                    <strong className="text-graphite font-secondary">Identical Properties:</strong>
                    <span className="text-graphite/90 font-secondary"> Possess the same brilliance, fire, and sparkle as mined diamonds.</span>
                  </div>
                </li>
              </ul>
            </div>
            
            <p className="text-lg text-graphite/90 leading-relaxed text-left font-secondary bg-blush/10 rounded-xl p-6">
              At Facet & Co., we are proud to offer beautiful, ethically-sourced lab-grown diamonds that align with modern values.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabDiamondEducationPage;
