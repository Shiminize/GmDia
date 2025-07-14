import React from 'react';

const startLiveChat = () => {
  if (window && (window as any).openLiveChat) {
    (window as any).openLiveChat();
  } else {
    alert('Live Chat is starting! (Implement chat widget here.)');
  }
};

const StyleAdvice: React.FC = () => (
  <div className="style-advice-root">
    <h1 className="style-advice-h1">✨ Find Your Perfect Jewelry Piece with Personalized Style Advice 💎</h1>
    <p className="style-advice-lead">Not sure which ring, necklace, or bracelet fits your vibe? Let us guide you to a stunning piece that's <strong>just right</strong> for you.</p>

    <section className="style-advice-section">
      <h2 className="style-advice-h2">Why Style Advice?</h2>
      <p className="style-advice-body"><strong>The right jewelry can transform any outfit.</strong> Whether you're looking for a timeless engagement ring, a statement necklace, or a custom tennis bracelet, our team is here to help you find the perfect match.</p>
      <h3 className="style-advice-h3">What You’ll Get with Style Advice:</h3>
      <ul className="style-advice-list">
        <li>Personalized recommendations based on your unique preferences and style.</li>
        <li>Discover jewelry options that match your personality, mood, or event.</li>
        <li>Exclusive, tailored guidance to ensure your piece fits perfectly with your lifestyle.</li>
      </ul>
    </section>

    <section className="style-advice-section">
      <h2 className="style-advice-h2">The Style Advice Process</h2>
      <p className="style-advice-body"><strong>Simple, Fast, and Fun!</strong></p>
      <ol className="style-advice-list style-advice-list-ol">
        <li><strong>Start with a Click</strong> – Click on "Style Advice" to get started. Our friendly team is ready to guide you.</li>
        <li><strong>Answer a Few Questions</strong> – Answer simple questions about your style preferences, budget, and occasion. It only takes 2 minutes!</li>
        <li><strong>Get Tailored Suggestions</strong> – Receive product recommendations based on your responses. Whether it’s an engagement ring that symbolizes forever or a necklace for your daily wear — we'll show you pieces that fit your needs.</li>
        <li><strong>Ask Away</strong> – Not sure about the details? Feel free to ask us for additional info, size guides, or customization options.</li>
      </ol>
      <button className="style-advice-btn" onClick={startLiveChat}>Start My Style Advice</button>
    </section>

    <section className="style-advice-section">
      <h2 className="style-advice-h2">The Most Popular Styles for Gen Z & Millennials</h2>
      <ul className="style-advice-list">
        <li><strong>Engagement Rings</strong> – Our lab-grown diamond rings are not only ethical but also stunningly affordable. Choose from minimalist solitaires to trendy halo designs — we've got the ring to make every proposal unforgettable.</li>
        <li><strong>Necklaces</strong> – Elevate your everyday look with a chic princess necklace or stand out with a bold statement piece. Customize with a personal engraving or pick something that resonates with your personality.</li>
        <li><strong>Tennis Bracelets</strong> – Whether it’s for a casual day or a special event, a tennis bracelet adds that extra sparkle. Browse our high-quality options that reflect both elegance and modern style.</li>
      </ul>
    </section>

    <section className="style-advice-section">
      <h2 className="style-advice-h2">Why Lab Diamonds Are the Future of Luxury</h2>
      <p className="style-advice-body"><strong>Modern, Ethical, Stunning</strong></p>
      <p className="style-advice-body">When you choose lab-grown diamonds, you get the sparkle you love without the environmental or ethical concerns. Lab diamonds are <strong>100% real diamonds</strong>, created in a controlled environment with the same brilliance and beauty as their mined counterparts.</p>
      <ul className="style-advice-list">
        <li><strong>Eco-friendly</strong></li>
        <li><strong>Cost-effective</strong></li>
        <li><strong>Uniquely yours</strong></li>
      </ul>
    </section>

    <section className="style-advice-section">
      <h2 className="style-advice-h2">Ready to Find Your Perfect Piece?</h2>
      <p className="style-advice-body">Click below to start your journey with our expert Style Advisors!</p>
      <button className="style-advice-btn" onClick={startLiveChat}>Start My Style Advice</button>
    </section>

    <section className="style-advice-section style-advice-testimonials">
      <h2 className="style-advice-h3">Testimonials from Gen Z Shoppers</h2>
      <blockquote className="style-advice-quote">"I had no idea what I was looking for, but the Style Advice helped me find the perfect engagement ring for my fiancé. So happy with the experience!"</blockquote>
      <p className="style-advice-quote-author">– Ella, 24</p>
      <blockquote className="style-advice-quote">"I wanted something unique, and the team suggested a stunning tennis bracelet that I’m obsessed with. The style advice was spot-on!"</blockquote>
      <p className="style-advice-quote-author">– Kai, 27</p>
    </section>

    <footer className="style-advice-footer">
      <p className="style-advice-body"><strong>Live Chat Support:</strong> <span>Not sure where to start? Chat with us! We’re here to help.</span></p>
      <button className="style-advice-btn" onClick={startLiveChat}>Click to Start Chat</button>
    </footer>

    <style>{`
      .style-advice-root {
        max-width: 960px;
        margin: 0 auto;
        padding: 40px 20px;
        background: #fff;
        color: #333;
        font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
      }
      .style-advice-h1 {
        font-size: 2.8em;
        font-weight: bold;
        line-height: 1.2;
        margin-bottom: 0.5em;
        color: #333;
      }
      .style-advice-h2 {
        font-size: 1.6em;
        font-weight: bold;
        line-height: 1.6;
        margin-bottom: 0.5em;
        color: #333;
        margin-top: 0;
      }
      .style-advice-h3 {
        font-size: 1.15em;
        font-weight: bold;
        margin-bottom: 0.5em;
        color: #333;
      }
      .style-advice-lead {
        font-size: 1.15em;
        line-height: 1.8;
        margin-bottom: 2em;
        color: #333;
      }
      .style-advice-body {
        font-size: 17px;
        line-height: 1.8;
        color: #333;
        font-weight: 400;
        margin-bottom: 1.2em;
        padding-left: 20px;
        padding-right: 20px;
      }
      .style-advice-section {
        margin-bottom: 60px;
      }
      .style-advice-list {
        font-size: 17px;
        line-height: 1.8;
        color: #333;
        font-weight: 400;
        margin-bottom: 1.2em;
        padding-left: 40px;
        padding-right: 20px;
      }
      .style-advice-list li {
        margin-bottom: 10px;
      }
      .style-advice-list-ol {
        list-style-type: decimal;
      }
      .style-advice-btn {
        display: inline-block;
        background: #1a1a1a;
        color: #fff;
        font-weight: bold;
        padding: 15px 40px;
        border: none;
        border-radius: 5px;
        font-size: 1.1em;
        margin-top: 20px;
        cursor: pointer;
        transition: background 0.2s, box-shadow 0.2s;
        box-shadow: 0 2px 8px rgba(0,0,0,0.04);
      }
      .style-advice-btn:hover, .style-advice-btn:focus {
        background: #333;
        box-shadow: 0 4px 16px rgba(0,0,0,0.08);
      }
      .style-advice-testimonials {
        background: #f7f7f7;
        border-radius: 8px;
        padding: 30px 20px;
      }
      .style-advice-quote {
        font-style: italic;
        font-size: 1.15em;
        line-height: 1.8;
        margin-bottom: 10px;
        color: #333;
      }
      .style-advice-quote-author {
        text-align: right;
        font-weight: bold;
        margin-bottom: 20px;
        color: #333;
      }
      .style-advice-footer {
        margin-top: 60px;
        text-align: center;
      }
      @media (max-width: 600px) {
        .style-advice-root {
          padding: 24px 6px;
        }
        .style-advice-h1 {
          font-size: 2.2em;
        }
        .style-advice-h2 {
          font-size: 1.3em;
        }
        .style-advice-btn {
          width: 100%;
          padding: 15px 0;
          font-size: 1em;
        }
        .style-advice-body, .style-advice-list {
          padding-left: 0;
          padding-right: 0;
        }
        .style-advice-testimonials {
          padding: 18px 6px;
        }
      }
    `}</style>
  </div>
);

export default StyleAdvice; 