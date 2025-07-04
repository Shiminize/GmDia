import React, { useState } from 'react';
import './ShineYourMoment.css';

const ShineYourMoment: React.FC = () => {
  // This is the restored JSX from the previous ShineYourMomentEvent implementation
  // Replace the ...existing code... with the actual event page JSX
  // If you want to further customize, you can edit below
  return (
    <div className="shine-your-moment-event px-6 md:px-16 py-section bg-ivory">
      <section className="event-hero">
        <h1 className="font-primary text-graphite text-3xl md:text-4xl font-bold text-left mb-editorial-sm">✨ Shine Your Moment Contest</h1>
        <p className="font-secondary text-graphite/80 text-left mb-editorial-sm">Share your spark moment &amp; win a custom diamond ring worth $3,000+!<br/>Entries close February 14th.</p>
        <a href="#event-entry" className="event-cta">Enter Now</a>
      </section>
      <section className="event-how-it-works">
        <h2 className="font-primary text-graphite text-3xl md:text-4xl font-bold text-left mb-editorial-sm">How to Participate</h2>
        <ol>
                        <li><strong>Follow</strong> <a href="https://instagram.com/facetandco.official" target="_blank" rel="noopener noreferrer">@facetandco.official</a> on Instagram or TikTok</li>
          <li><strong>Post</strong> a photo or video sharing your special moment with the hashtag <span className="hashtag">#ShineYourMoment</span></li>
          <li><strong>Submit</strong> your entry using the form below</li>
        </ol>
      </section>
      <section className="event-guidelines">
        <h2 className="font-primary text-graphite text-3xl md:text-4xl font-bold text-left mb-editorial-sm">Content Guidelines</h2>
        <ul>
          <li>Showcase a meaningful, joyful, or inspiring moment in your life</li>
          <li>Include the hashtag <span className="hashtag">#ShineYourMoment</span> in your post caption</li>
                      <li>Tag <strong>@facetandco.official</strong> in your post</li>
          <li>Profile must be public for entry verification</li>
        </ul>
        <div className="ugc-template">
          <strong>Sample Caption:</strong>
          <div className="ugc-box">
            "This moment means the world to me! Thank you @facetandco.official for helping me shine. #ShineYourMoment"
          </div>
        </div>
      </section>
      <section className="event-prizes">
        <h2 className="font-primary text-graphite text-3xl md:text-4xl font-bold text-left mb-editorial-sm">Prizes</h2>
        <ul className="prize-list">
          <li><span className="prize-title">Grand Prize:</span> 1 Custom Lab Diamond Ring (worth $3,000+)</li>
          <li><span className="prize-title">Runner Ups:</span> 5x $200 Site Credits</li>
          <li><span className="prize-title">Participation Bonus:</span> 10% Off Next Purchase</li>
        </ul>
      </section>
      <section className="event-timeline">
        <h2 className="font-primary text-graphite text-3xl md:text-4xl font-bold text-left mb-editorial-sm">Timeline</h2>
        <ul>
          <li><strong>Entries Open:</strong> January 15, 2025</li>
          <li><strong>Deadline:</strong> February 14, 2025</li>
          <li><strong>Winners Announced:</strong> February 20, 2025</li>
        </ul>
      </section>
      <section className="event-entry" id="event-entry">
        <h2 className="font-primary text-graphite text-3xl md:text-4xl font-bold text-left mb-editorial-sm">Submit Your Entry</h2>
        <form className="entry-form flex-row gap-x-4 mt-editorial-md">
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" required />
          </div>
          <div className="form-group">
            <label>Instagram or TikTok Handle</label>
            <input type="text" name="handle" required />
          </div>
          <div className="form-group">
            <label>Platform</label>
            <select name="platform" required>
              <option value="">Select</option>
              <option value="instagram">Instagram</option>
              <option value="tiktok">TikTok</option>
            </select>
          </div>
          <div className="form-group">
            <label>Link to Your Post</label>
            <input type="url" name="postLink" required />
          </div>
          <div className="form-group checkbox">
            <label>
              <input type="checkbox" name="newsletter" />
                              Subscribe to Facet & Co. newsletter for updates &amp; offers
            </label>
          </div>
          <div className="form-group checkbox">
            <label>
              <input type="checkbox" name="terms" required />
              I agree to the <a href="#event-terms" className="terms-link">terms &amp; conditions</a>
            </label>
          </div>
          <button type="submit" className="submit-btn">Submit Entry</button>
        </form>
      </section>
      <section className="event-terms" id="event-terms">
        <h2 className="font-primary text-graphite text-3xl md:text-4xl font-bold text-left mb-editorial-sm">Terms &amp; Conditions</h2>
        <ul>
          <li>Open to legal residents aged 18+ only. No purchase necessary.</li>
          <li>One entry per person. Multiple entries will be disqualified.</li>
          <li>Winners will be contacted via email and must respond within 5 days to claim prize.</li>
                      <li>By entering, you grant Facet & Co. permission to share your content for promotional purposes.</li>
          <li>See full rules on our website.</li>
        </ul>
      </section>
    </div>
  );
};

export default ShineYourMoment; 