import React from 'react';
import { Link } from 'react-router-dom';
import './HeroBanner.css';

interface HeroBannerProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage?: string;
  backgroundColor?: string;
  textColor?: string;
  isActive?: boolean;
}

const HeroBanner: React.FC<HeroBannerProps> = ({
  title,
  subtitle,
  ctaText,
  ctaLink,
  backgroundImage,
  backgroundColor = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  textColor = '#ffffff',
  isActive = true
}) => {
  if (!isActive) return null;

  const bannerStyle = {
    background: backgroundImage ? `url(${backgroundImage})` : backgroundColor,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: textColor
  };

  return (
    <Link to={ctaLink} className="hero-banner-link">
      <div className="hero-banner" style={bannerStyle}>
        {backgroundImage && <div className="hero-banner-overlay"></div>}
        <div className="hero-banner-content">
          <div className="hero-banner-text">
            <h1 className="hero-banner-title">{title}</h1>
            <p className="hero-banner-subtitle">{subtitle}</p>
          </div>
          <div className="hero-banner-cta-text">
            {ctaText}
            <span className="cta-arrow">→</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HeroBanner; 