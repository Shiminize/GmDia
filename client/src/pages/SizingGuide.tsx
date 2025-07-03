import React from 'react';
import { Link } from 'react-router-dom';

const SizingGuide: React.FC = () => (
  <div className="min-h-screen bg-champagne py-20">
    <div className="container mx-auto px-4 max-w-4xl">
      <div className="bg-ivory rounded-xl shadow-lg p-8 lg:p-12">
        <h1 className="text-4xl lg:text-5xl font-bold text-graphite mb-6 font-primary">
          Jewelry Sizing Guide
        </h1>
        <p className="text-lg text-graphite/80 mb-10 leading-relaxed">
          Find your perfect fit — every time. Whether you're selecting a ring to treasure forever, 
          a necklace to layer with your look, or a tennis bracelet to mark a milestone, our sizing 
          guide helps you shop with confidence.
        </p>

        {/* Ring Size Guide */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blush mb-4 font-primary flex items-center">
            💍 Ring Size Guide
          </h2>
          <p className="text-graphite mb-6">
            We follow the U.S. standard ring sizing system (sizes 3–13.5, including half sizes). 
            Most women's rings fall between size 5 and 7.
          </p>
          
          <h3 className="text-xl font-semibold text-lavender mt-8 mb-4">📏 How to Measure at Home</h3>
          <ul className="space-y-3 mb-6 text-graphite">
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-blush rounded-full mt-2 mr-4 flex-shrink-0"></span>
              <span><strong>Option 1:</strong> Use a string or paper strip to measure your finger. Measure the length, divide by 3.14, and match to a sizing chart.</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-blush rounded-full mt-2 mr-4 flex-shrink-0"></span>
              <span><strong>Option 2:</strong> Use a well-fitting ring and place it over a printable chart or sizing tool.</span>
            </li>
          </ul>
          
          <div className="bg-champagne border-l-4 border-blush p-4 rounded-r-lg mb-6">
            <p className="text-graphite font-medium">
              💡 <strong>Tip:</strong> Measure at the end of the day when your fingers are at their largest.
            </p>
          </div>
          
          <h3 className="text-xl font-semibold text-lavender mt-8 mb-4">🧠 Fit Tips</h3>
          <ul className="space-y-3 text-graphite">
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-blush rounded-full mt-2 mr-4 flex-shrink-0"></span>
              <span>Ring should slide over the knuckle with some resistance.</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-blush rounded-full mt-2 mr-4 flex-shrink-0"></span>
              <span>Wider bands fit tighter — consider sizing up slightly.</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-blush rounded-full mt-2 mr-4 flex-shrink-0"></span>
              <span>Free resizing and custom sizing available on eligible styles.</span>
            </li>
          </ul>
        </section>

        {/* Necklace Size Guide */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blush mb-4 font-primary flex items-center">
            📿 Necklace Size Guide
          </h2>
          <p className="text-graphite mb-8">
            From chokers to opera-length styles, our necklaces are designed to complement your 
            neckline and wardrobe.
          </p>
          
          <div className="overflow-x-auto mb-8">
            <table className="w-full border-collapse bg-ivory shadow-sm rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-champagne">
                  <th className="border border-champagne/50 p-4 text-left text-graphite font-semibold">Style Name</th>
                  <th className="border border-champagne/50 p-4 text-left text-graphite font-semibold">Length (inches)</th>
                  <th className="border border-champagne/50 p-4 text-left text-graphite font-semibold">Where It Falls</th>
                </tr>
              </thead>
              <tbody className="text-graphite">
                <tr className="hover:bg-champagne/30 transition-colors">
                  <td className="border border-champagne/30 p-4">Collar</td>
                  <td className="border border-champagne/30 p-4">12–14"</td>
                  <td className="border border-champagne/30 p-4">Base of neck</td>
                </tr>
                <tr className="hover:bg-champagne/30 transition-colors">
                  <td className="border border-champagne/30 p-4">Choker</td>
                  <td className="border border-champagne/30 p-4">14–16"</td>
                  <td className="border border-champagne/30 p-4">High on neck</td>
                </tr>
                <tr className="hover:bg-champagne/30 transition-colors">
                  <td className="border border-champagne/30 p-4">Princess</td>
                  <td className="border border-champagne/30 p-4">17–19"</td>
                  <td className="border border-champagne/30 p-4">At collarbone</td>
                </tr>
                <tr className="hover:bg-champagne/30 transition-colors">
                  <td className="border border-champagne/30 p-4">Matinee</td>
                  <td className="border border-champagne/30 p-4">20–24"</td>
                  <td className="border border-champagne/30 p-4">Mid-chest</td>
                </tr>
                <tr className="hover:bg-champagne/30 transition-colors">
                  <td className="border border-champagne/30 p-4">Opera</td>
                  <td className="border border-champagne/30 p-4">28–34"</td>
                  <td className="border border-champagne/30 p-4">Bust or below</td>
                </tr>
                <tr className="hover:bg-champagne/30 transition-colors">
                  <td className="border border-champagne/30 p-4">Rope</td>
                  <td className="border border-champagne/30 p-4">36"+</td>
                  <td className="border border-champagne/30 p-4">Below bust</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <h3 className="text-xl font-semibold text-lavender mt-8 mb-4">🪡 How to Measure at Home</h3>
          <p className="text-graphite mb-6">
            Wrap a soft tape around your neck at the desired drop point. Add 1–2" for comfort. 
            Use a necklace you already own to visualize lengths.
          </p>
          
          <div className="bg-champagne border-l-4 border-blush p-4 rounded-r-lg">
            <p className="text-graphite font-medium">
              💡 <strong>Need a custom length?</strong> We offer extenders and made-to-order sizing.
            </p>
          </div>
        </section>

        {/* Tennis Bracelet Size Guide */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blush mb-4 font-primary flex items-center">
            💎 Tennis Bracelet Size Guide
          </h2>
          <p className="text-graphite mb-6">
            Bracelet lengths range from 6" to 8", with 7" being the most common. Comfortably 
            fitted — never too tight or too loose — is key.
          </p>
          
          <h3 className="text-xl font-semibold text-lavender mt-8 mb-4">📏 Measure Your Wrist</h3>
          <ul className="space-y-3 mb-6 text-graphite">
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-blush rounded-full mt-2 mr-4 flex-shrink-0"></span>
              <span>Use a measuring tape or string around your wrist, just below the wrist bone.</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-blush rounded-full mt-2 mr-4 flex-shrink-0"></span>
              <span>Add ½–1 inch for comfort.</span>
            </li>
          </ul>
          
          <h3 className="text-xl font-semibold text-lavender mt-8 mb-4">⚙️ Custom Sizing</h3>
          <p className="text-graphite">
            Our bracelets can be resized with additional links or adjustable clasps. Reach out for 
            tailored adjustments.
          </p>
        </section>

        {/* Help Section */}
        <section>
          <h2 className="text-3xl font-bold text-blush mb-4 font-primary flex items-center">
            🧵 Need Help?
          </h2>
          <p className="text-graphite mb-6">
            We're here to guide you every step of the way. Contact our concierge team via live chat 
            or email for personalized assistance.
          </p>
          
          <ul className="space-y-3 mb-8 text-graphite">
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-lavender rounded-full mt-2 mr-4 flex-shrink-0"></span>
              <Link to="#" className="text-lavender hover:text-blush transition-colors font-medium">
                Download Printable Ring Sizer
              </Link>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-lavender rounded-full mt-2 mr-4 flex-shrink-0"></span>
              <Link to="#" className="text-lavender hover:text-blush transition-colors font-medium">
                View Necklace Simulator
              </Link>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-lavender rounded-full mt-2 mr-4 flex-shrink-0"></span>
              <Link to="#" className="text-lavender hover:text-blush transition-colors font-medium">
                Wrist Measurement Guide
              </Link>
            </li>
          </ul>
          
          <Link 
            to="/products" 
            className="inline-flex items-center justify-center bg-graphite text-ivory px-8 py-4 rounded-full font-semibold uppercase tracking-wider text-sm
              hover:bg-blush hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 shadow-md"
          >
            Shop with Confidence →
          </Link>
        </section>
      </div>
    </div>
  </div>
);

export default SizingGuide; 