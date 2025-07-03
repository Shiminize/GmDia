import React from 'react';
import { Link } from 'react-router-dom';

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
    <Link 
      to={ctaLink} 
      className="block w-full cursor-pointer transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 select-none touch-manipulation"
    >
      <div 
        style={bannerStyle}
        className="relative w-full min-h-[400px] flex items-center justify-center text-center py-[60px] px-5 mb-10 overflow-hidden rounded-[20px] transition-all duration-300 ease-in-out md:min-h-[350px] md:py-[50px] md:mb-5 md:rounded-[15px] sm:min-h-[320px] sm:py-10 sm:rounded-[12px]"
      >
        {backgroundImage && (
          <div className="absolute inset-0 bg-black/40 z-[1]"></div>
        )}
        <div className="relative z-[2] max-w-[800px] mx-auto flex flex-col items-center gap-[30px] w-full px-4 animate-[fadeInUp_0.8s_ease-out] md:gap-[25px] sm:gap-5 sm:px-2.5">
          <div className="text-center w-full">
            <h1 className="text-[3.5rem] font-bold mb-5 leading-tight tracking-[-0.02em] break-words hyphens-auto text-shadow-lg md:text-[3rem] md:mb-4 md:leading-snug md:break-words sm:text-[2.8rem] sm:mb-3 sm:leading-tight sm:break-words xs:text-[2.4rem]">
              {title}
            </h1>
            <p className="text-xl font-normal opacity-95 leading-relaxed max-w-[600px] mx-auto break-words hyphens-auto text-shadow-sm md:text-lg md:leading-[1.7] md:px-2.5 sm:text-base sm:leading-normal sm:px-1.5 xs:text-[1.1rem]">
              {subtitle}
            </p>
          </div>
          <div className="inline-flex items-center gap-2.5 bg-white/15 text-inherit px-9 py-[18px] rounded-full text-lg font-semibold border-2 border-white/30 backdrop-blur-[10px] transition-all duration-300 ease-in-out text-shadow-sm tracking-wider shadow-lg pointer-events-none group-hover:bg-white/25 group-hover:border-white/50 md:px-8 md:py-4 md:text-base md:rounded-[40px] sm:px-6 sm:py-3.5 sm:text-base sm:rounded-[35px] xs:px-5 xs:py-3 xs:text-sm">
            {ctaText}
            <span className="text-xl transition-transform duration-300 ease-in-out group-hover:translate-x-1.5 md:text-lg sm:text-base">
              →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HeroBanner; 