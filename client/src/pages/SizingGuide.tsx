import React from 'react';
import '../assets/styles/index.css';

const SizingGuide: React.FC = () => (
  <section className="luxury-section sizing-guide-section" style={{ background: 'var(--ivory-white)' }}>
    <div className="container" style={{ maxWidth: 900, margin: '0 auto', padding: '48px 20px', background: 'var(--pure-white)', borderRadius: 'var(--radius-large)', boxShadow: 'var(--shadow-light)' }}>
      <h1 className="text-luxury" style={{ fontSize: '2.7rem', marginBottom: '1.5rem', color: 'var(--graphite-black)' }}>Jewelry Sizing Guide</h1>
      <p style={{ fontSize: '1.15rem', color: 'var(--graphite-black)', marginBottom: '2.5rem' }}>
        Find your perfect fit — every time. Whether you're selecting a ring to treasure forever, a necklace to layer with your look, or a tennis bracelet to mark a milestone, our sizing guide helps you shop with confidence.
      </p>

      <section style={{ marginBottom: 56 }}>
        <h2 className="text-luxury" style={{ color: 'var(--luxury-gold)', fontSize: '2rem', marginBottom: 8 }}>💍 Ring Size Guide</h2>
        <p style={{ color: 'var(--graphite-black)' }}>We follow the U.S. standard ring sizing system (sizes 3–13.5, including half sizes). Most women's rings fall between size 5 and 7.</p>
        <h3 style={{ color: 'var(--digital-lavender)', marginTop: 24 }}>📏 How to Measure at Home</h3>
        <ul style={{ marginBottom: 16 }}>
          <li><strong>Option 1:</strong> Use a string or paper strip to measure your finger. Measure the length, divide by 3.14, and match to a sizing chart.</li>
          <li><strong>Option 2:</strong> Use a well-fitting ring and place it over a printable chart or sizing tool.</li>
        </ul>
        <div style={{ background: 'var(--champagne-beige)', padding: 12, borderLeft: '4px solid var(--luxury-gold)', marginTop: 10, borderRadius: 6, color: 'var(--graphite-black)' }}>
          Tip: Measure at the end of the day when your fingers are at their largest.
        </div>
        <h3 style={{ color: 'var(--digital-lavender)', marginTop: 24 }}>🧠 Fit Tips</h3>
        <ul>
          <li>Ring should slide over the knuckle with some resistance.</li>
          <li>Wider bands fit tighter — consider sizing up slightly.</li>
          <li>Free resizing and custom sizing available on eligible styles.</li>
        </ul>
      </section>

      <section style={{ marginBottom: 56 }}>
        <h2 className="text-luxury" style={{ color: 'var(--luxury-gold)', fontSize: '2rem', marginBottom: 8 }}>📿 Necklace Size Guide</h2>
        <p style={{ color: 'var(--graphite-black)' }}>From chokers to opera-length styles, our necklaces are designed to complement your neckline and wardrobe.</p>
        <div style={{ overflowX: 'auto', marginTop: 20 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '1rem', background: 'var(--ivory-white)' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid var(--champagne-beige)', padding: 12, background: 'var(--champagne-beige)', color: 'var(--graphite-black)' }}>Style Name</th>
                <th style={{ border: '1px solid var(--champagne-beige)', padding: 12, background: 'var(--champagne-beige)', color: 'var(--graphite-black)' }}>Length (inches)</th>
                <th style={{ border: '1px solid var(--champagne-beige)', padding: 12, background: 'var(--champagne-beige)', color: 'var(--graphite-black)' }}>Where It Falls</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={{ border: '1px solid var(--champagne-beige)', padding: 12 }}>Collar</td><td style={{ border: '1px solid var(--champagne-beige)', padding: 12 }}>12–14"</td><td style={{ border: '1px solid var(--champagne-beige)', padding: 12 }}>Base of neck</td></tr>
              <tr><td style={{ border: '1px solid var(--champagne-beige)', padding: 12 }}>Choker</td><td style={{ border: '1px solid var(--champagne-beige)', padding: 12 }}>14–16"</td><td style={{ border: '1px solid var(--champagne-beige)', padding: 12 }}>High on neck</td></tr>
              <tr><td style={{ border: '1px solid var(--champagne-beige)', padding: 12 }}>Princess</td><td style={{ border: '1px solid var(--champagne-beige)', padding: 12 }}>17–19"</td><td style={{ border: '1px solid var(--champagne-beige)', padding: 12 }}>At collarbone</td></tr>
              <tr><td style={{ border: '1px solid var(--champagne-beige)', padding: 12 }}>Matinee</td><td style={{ border: '1px solid var(--champagne-beige)', padding: 12 }}>20–24"</td><td style={{ border: '1px solid var(--champagne-beige)', padding: 12 }}>Mid-chest</td></tr>
              <tr><td style={{ border: '1px solid var(--champagne-beige)', padding: 12 }}>Opera</td><td style={{ border: '1px solid var(--champagne-beige)', padding: 12 }}>28–34"</td><td style={{ border: '1px solid var(--champagne-beige)', padding: 12 }}>Bust or below</td></tr>
              <tr><td style={{ border: '1px solid var(--champagne-beige)', padding: 12 }}>Rope</td><td style={{ border: '1px solid var(--champagne-beige)', padding: 12 }}>36"+</td><td style={{ border: '1px solid var(--champagne-beige)', padding: 12 }}>Below bust</td></tr>
            </tbody>
          </table>
        </div>
        <h3 style={{ color: 'var(--digital-lavender)', marginTop: 24 }}>🪡 How to Measure at Home</h3>
        <p>Wrap a soft tape around your neck at the desired drop point. Add 1–2" for comfort. Use a necklace you already own to visualize lengths.</p>
        <div style={{ background: 'var(--champagne-beige)', padding: 12, borderLeft: '4px solid var(--luxury-gold)', marginTop: 10, borderRadius: 6, color: 'var(--graphite-black)' }}>
          Need a custom length? We offer extenders and made-to-order sizing.
        </div>
      </section>

      <section style={{ marginBottom: 56 }}>
        <h2 className="text-luxury" style={{ color: 'var(--luxury-gold)', fontSize: '2rem', marginBottom: 8 }}>💎 Tennis Bracelet Size Guide</h2>
        <p style={{ color: 'var(--graphite-black)' }}>Bracelet lengths range from 6" to 8", with 7" being the most common. Comfortably fitted — never too tight or too loose — is key.</p>
        <h3 style={{ color: 'var(--digital-lavender)', marginTop: 24 }}>📏 Measure Your Wrist</h3>
        <ul style={{ marginBottom: 16 }}>
          <li>Use a measuring tape or string around your wrist, just below the wrist bone.</li>
          <li>Add ½–1 inch for comfort.</li>
        </ul>
        <h3 style={{ color: 'var(--digital-lavender)', marginTop: 24 }}>⚙️ Custom Sizing</h3>
        <p>Our bracelets can be resized with additional links or adjustable clasps. Reach out for tailored adjustments.</p>
      </section>

      <section>
        <h2 className="text-luxury" style={{ color: 'var(--luxury-gold)', fontSize: '2rem', marginBottom: 8 }}>🧵 Need Help?</h2>
        <p style={{ color: 'var(--graphite-black)' }}>We're here to guide you every step of the way. Contact our concierge team via live chat or email for personalized assistance.</p>
        <ul style={{ marginBottom: 16 }}>
          <li><a href="#" style={{ color: 'var(--digital-lavender)' }}>Download Printable Ring Sizer</a></li>
          <li><a href="#" style={{ color: 'var(--digital-lavender)' }}>View Necklace Simulator</a></li>
          <li><a href="#" style={{ color: 'var(--digital-lavender)' }}>Wrist Measurement Guide</a></li>
        </ul>
        <a href="/products" className="btn" style={{ display: 'inline-block', background: 'var(--graphite-black)', color: 'var(--ivory-white)', padding: '14px 32px', textDecoration: 'none', marginTop: 30, fontWeight: 'bold', borderRadius: 'var(--radius-pill)', fontSize: '1.1rem', letterSpacing: '0.04em' }}>Shop with Confidence →</a>
      </section>
    </div>
  </section>
);

export default SizingGuide; 