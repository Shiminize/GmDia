import React, { useState } from 'react';
import './ShineYourMomentEvent.css';

const ShineYourMomentEvent: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    handle: '',
    platform: 'instagram',
    postLink: '',
    email: '',
    newsletter: false
  });
  const [showTerms, setShowTerms] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Contest Entry:', formData);
    setIsSubmitted(true);
  };

  return (
    <div className="event-page">
      {/* Hero Banner */}
      <section className="event-hero">
        <div className="event-hero-content">
          <h1 className="event-title">Share Your Spark Moment & Win a Diamond Ring</h1>
          <p className="event-subtitle">
            Tell us your story of love, laughter, and unforgettable moments for a chance to win a custom lab diamond ring worth $3,000+
          </p>
          <a href="#entry-form" className="event-cta-primary">
            Submit Your Entry
          </a>
        </div>
        <div className="event-hero-image">
          <img src="/Ring-1.png" alt="Couple sharing a spark moment" />
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="container">
          <h2>How It Works</h2>
          <div className="steps-grid">
            <div className="step">
              <div className="step-icon">📱</div>
              <h3>1. Post Your Story</h3>
              <p>Share a video, image, or story on Instagram or TikTok about your "spark moment" - first glance, funny proposal, romantic fail, or love win!</p>
            </div>
            <div className="step">
              <div className="step-icon">🏷️</div>
              <h3>2. Tag & Hashtag</h3>
                                <p>Use hashtag <strong>#ShineYourMoment</strong> and tag <strong>@FacetAndCoOfficial</strong> in your post</p>
            </div>
            <div className="step">
              <div className="step-icon">📝</div>
              <h3>3. Submit Entry</h3>
              <p>Fill out the form below with your details and link to your post to officially enter the contest</p>
            </div>
          </div>

          <div className="content-guidelines">
            <h3>Content Ideas & Guidelines</h3>
            <div className="guidelines-grid">
              <div className="guideline">
                <h4>💕 Spark Moments</h4>
                <ul>
                  <li>The first time you locked eyes</li>
                  <li>A funny proposal attempt</li>
                  <li>An unexpected romantic gesture</li>
                  <li>Overcoming relationship challenges</li>
                </ul>
              </div>
              <div className="guideline">
                <h4>📹 Content Tips</h4>
                <ul>
                  <li>Keep it authentic and heartfelt</li>
                  <li>Videos: 15-60 seconds work best</li>
                  <li>Good lighting makes a difference</li>
                  <li>Include captions for accessibility</li>
                </ul>
              </div>
            </div>
            
            <div className="ugc-template">
              <h4>💡 Need inspiration? Try this template:</h4>
              <blockquote>
                "What would you say if someone proposed to you in public while holding a coffee cup? ☕💍 
                Well, here's what happened to me... #ShineYourMoment @FacetAndCoOfficial"
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Prizes Section */}
      <section className="prizes">
        <div className="container">
          <h2>🎁 Amazing Prizes Await</h2>
          <div className="prizes-grid">
            <div className="prize grand-prize">
              <div className="prize-image">
                <img src="/Ring-2.png" alt="Custom Lab Diamond Ring" />
              </div>
              <div className="prize-content">
                <h3>🏆 Grand Prize</h3>
                <h4>Custom Lab Diamond Ring</h4>
                <p className="prize-value">Worth $3,000+</p>
                <p>Work with our expert designers to create your dream ring with ethically grown diamonds</p>
              </div>
            </div>
            <div className="prize runner-up">
              <div className="prize-icon">💳</div>
              <h3>🥈 Runner-Up Prizes</h3>
              <h4>5x $200 Site Credits</h4>
              <p>Use towards any jewelry in our collection</p>
            </div>
            <div className="prize participation">
              <div className="prize-icon">🎫</div>
              <h3>🎉 Participation Bonus</h3>
              <h4>10% Off Next Purchase</h4>
              <p>All valid entries receive a discount code</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="timeline">
        <div className="container">
          <h2>📅 Contest Timeline</h2>
          <div className="timeline-items">
            <div className="timeline-item">
              <div className="timeline-date">January 15, 2025</div>
              <div className="timeline-content">
                <h3>Entries Open</h3>
                <p>Start sharing your spark moments!</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-date">February 14, 2025</div>
              <div className="timeline-content">
                <h3>Entry Deadline</h3>
                <p>Last day to submit your entry</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-date">February 20, 2025</div>
              <div className="timeline-content">
                <h3>Winners Announced</h3>
                <p>Live announcement on Instagram and website</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Entry Form */}
      <section className="entry-form-section" id="entry-form">
        <div className="container">
          <h2>📝 Submit Your Entry</h2>
          
          {!isSubmitted ? (
            <form className="entry-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="platform">Platform *</label>
                  <select
                    id="platform"
                    name="platform"
                    value={formData.platform}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="instagram">Instagram</option>
                    <option value="tiktok">TikTok</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="handle">Your Handle *</label>
                  <input
                    type="text"
                    id="handle"
                    name="handle"
                    value={formData.handle}
                    onChange={handleInputChange}
                    placeholder="@yourusername"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="postLink">Link to Your Post *</label>
                <input
                  type="url"
                  id="postLink"
                  name="postLink"
                  value={formData.postLink}
                  onChange={handleInputChange}
                  placeholder="https://..."
                  required
                />
              </div>

              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="newsletter"
                    checked={formData.newsletter}
                    onChange={handleInputChange}
                  />
                  <span className="checkmark"></span>
                  Subscribe to our newsletter for exclusive offers and updates
                </label>
              </div>

              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    required
                  />
                  <span className="checkmark"></span>
                  I agree to the <button type="button" onClick={() => setShowTerms(true)}>Terms & Conditions</button>
                </label>
              </div>

              <button type="submit" className="submit-btn">
                Submit Entry
              </button>
            </form>
          ) : (
            <div className="success-message">
              <div className="success-icon">🎉</div>
              <h3>Entry Submitted Successfully!</h3>
              <p>Thank you for participating in the Shine Your Moment contest! We'll review your entry and contact you if you're selected as a winner.</p>
              <p>Don't forget to check your email for your 10% off participation bonus code!</p>
            </div>
          )}
        </div>
      </section>

      {/* Terms Modal */}
      {showTerms && (
        <div className="modal-overlay" onClick={() => setShowTerms(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Terms & Conditions</h3>
              <button onClick={() => setShowTerms(false)} className="close-btn">×</button>
            </div>
            <div className="modal-body">
              <h4>Contest Rules</h4>
              <ul>
                <li>Contest open to residents of the United States, 18 years or older</li>
                <li>Entries must be original content created by the participant</li>
                <li>Posts must use #ShineYourMoment and tag @FacetAndCoOfficial</li>
                <li>Content must be appropriate and family-friendly</li>
                                  <li>By entering, participants grant Facet & Co. rights to use submitted content for marketing purposes</li>
                <li>Winners will be selected by our panel of judges based on creativity and authenticity</li>
                <li>Prize has no cash value and cannot be transferred</li>
                                  <li>Facet & Co. reserves the right to disqualify entries that violate these terms</li>
              </ul>
              
              <h4>Privacy Policy</h4>
              <p>Your personal information will only be used for contest administration and, if you opt-in, our newsletter. We will never share your information with third parties.</p>
              
              <h4>Winner Selection</h4>
              <p>Winners will be announced on February 20, 2025, via Instagram Live and on our website. Winners will also be contacted directly via email.</p>
            </div>
            <div className="modal-footer">
              <button onClick={() => setShowTerms(false)} className="btn-primary">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShineYourMomentEvent; 